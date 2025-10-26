import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../providers.dart';

class TakeExamScreen extends ConsumerStatefulWidget {
  final int attemptId;
  const TakeExamScreen({super.key, required this.attemptId});

  @override
  ConsumerState<TakeExamScreen> createState() => _TakeExamScreenState();
}

class _TakeExamScreenState extends ConsumerState<TakeExamScreen> {
  // State
  List<Map<String, dynamic>> _questions = [];
  String _examTitle = 'Bài thi';
  int _durationMin = 0;

  int _index = 0;
  bool _loading = true;
  bool _submitting = false;

  Timer? _timer;
  int _remainingSec = 0; // thời gian còn lại (giây)

  bool get _timeUp => _remainingSec <= 0;

  @override
  void initState() {
    super.initState();
    _loadAttempt();
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  // ===== API =====
  Future<void> _loadAttempt() async {
    final api = ref.read(examApiProvider);
    setState(() => _loading = true);
    try {
      // Backend trả: { examTitle, durationMinutes, remainingSeconds, questions: [...] }
      final data = await api.getAttemptDetail(widget.attemptId);

      _examTitle = (data['examTitle'] ?? data['title'] ?? 'Bài thi').toString();
      _durationMin = (data['durationMinutes'] ?? data['durationMin'] ?? 0) as int? ?? 0;

      _questions = List<Map<String, dynamic>>.from(
        (data['questions'] ?? const []) as List,
      );

      _remainingSec = (data['remainingSeconds'] ?? 0) as int? ?? 0;
      if (_remainingSec <= 0) {
        if (mounted) {
          WidgetsBinding.instance.addPostFrameCallback((_) {
            showDialog(
              context: context,
              barrierDismissible: false,
              builder: (_) => AlertDialog(
                title: const Text('Bài thi đã kết thúc'),
                content: const Text('Đã hết thời gian thi. Bạn không thể làm bài.'),
                actions: [
                  FilledButton(
                    onPressed: () => Navigator.of(context).pop(true),
                    child: const Text('Quay lại'),
                  )
                ],
              ),
            ).then((_) => GoRouter.of(context).pop()); // Quay về màn trước
          });
        }
      } else {
        _startTimerIfNeeded();
      }
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Không tải được đề thi: $e')),
      );
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _save(int questionId, int optionId) async {
    if (_timeUp) return; // hết giờ thì bỏ qua
    final api = ref.read(examApiProvider);
    try {
      await api.saveAnswer(
        attemptId: widget.attemptId,
        questionId: questionId,
        optionId: optionId,
      );
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Lưu đáp án thất bại: $e')),
      );
    }
  }

  Future<void> _submit() async {
    final api = ref.read(examApiProvider);
    setState(() => _submitting = true);
    try {
      await api.submitAttempt(widget.attemptId);
      if (!mounted) return;
      showDialog(
        context: context,
        builder: (_) => AlertDialog(
          title: const Text('Đã nộp bài'),
          content: const Text('Bài thi của bạn đã được nộp và chấm tự động.'),
          actions: [
            FilledButton(
              onPressed: () {
                Navigator.of(context).pop(); // Đóng dialog
                GoRouter.of(context).pop(); // Quay về ExamSelectSubjectScreen
              },
              child: const Text('Đóng'),
            )
          ],
        ),
      );
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Nộp bài thất bại: $e')),
      );
    } finally {
      if (mounted) setState(() => _submitting = false);
    }
  }

  // ===== Timer =====
  void _startTimerIfNeeded() {
    _timer?.cancel();
    if (_remainingSec <= 0) return;
    _timer = Timer.periodic(const Duration(seconds: 1), (t) {
      if (!mounted) return;
      setState(() => _remainingSec--);
      if (_remainingSec <= 0) {
        t.cancel();
        _showTimeUpDialog();
      }
    });
  }

  void _showTimeUpDialog() {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Hết giờ'),
        content: const Text('Đã hết thời gian làm bài. Vui lòng nộp bài.'),
        actions: [
          FilledButton(
            onPressed: () {
              Navigator.pop(context); // Đóng dialog
              _submit(); // Tự động nộp bài khi hết giờ
            },
            child: const Text('Đồng ý'),
          )
        ],
      ),
    );
  }

  // ===== UI =====
  @override
  Widget build(BuildContext context) {
    if (_loading) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    if (_remainingSec <= 0) {
      return Scaffold(
        appBar: AppBar(title: const Text('Bài thi')),
        body: const Center(child: Text('Bài thi đã kết thúc. Không thể tiếp tục.')),
      );
    }

    if (_questions.isEmpty) {
      return Scaffold(
        appBar: AppBar(title: const Text('Bài thi')),
        body: const Center(child: Text('Không có câu hỏi nào trong đề')),
      );
    }

    final q = _questions[_index];
    final total = _questions.length;

    final minutesStr = _durationMin > 0 ? '${_durationMin}p' : '?p';
    final remainText = _timeUp
        ? ' • HẾT GIỜ'
        : ' • Còn: ${(_remainingSec ~/ 60).toString().padLeft(2, '0')}:${(_remainingSec % 60).toString().padLeft(2, '0')}';

    final questionId = (q['id'] ?? q['questionId']) as int? ?? -1;
    final options = List<Map<String, dynamic>>.from(
      (q['options'] ?? q['answers'] ?? const []) as List,
    );
    final selected = q['selectedAnswerId'] ?? q['answerId'];

    return Scaffold(
      appBar: AppBar(
        title: Text('$_examTitle • Câu ${_index + 1}/$total • $minutesStr$remainText'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Text(
            (q['content'] ?? q['text'] ?? '...').toString(),
            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
          ),
          const SizedBox(height: 12),
          ...options.map((o) {
            final oid = (o['id'] ?? o['optionId'] ?? o['answerId']) as int?;
            final text = (o['content'] ?? o['text'] ?? '').toString();
            final isSelected = (selected != null && oid != null && oid == selected);

            return AbsorbPointer(
              absorbing: _timeUp, // hết giờ → khoá chọn
              child: Container(
                margin: const EdgeInsets.symmetric(vertical: 6),
                child: InkWell(
                  onTap: () async {
                    if (oid == null) return;
                    await _save(questionId, oid);
                    setState(() {
                      _questions[_index]['selectedAnswerId'] = oid;
                      _questions[_index]['answerId'] = oid; // đảm bảo UI nhận
                    });
                  },
                  borderRadius: BorderRadius.circular(12),
                  child: Container(
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: isSelected ? Colors.green : Colors.grey.shade300,
                        width: isSelected ? 2 : 1,
                      ),
                      color: isSelected ? Colors.green.shade50 : Colors.white,
                    ),
                    child: Row(
                      children: [
                        Icon(isSelected ? Icons.radio_button_checked : Icons.radio_button_off),
                        const SizedBox(width: 10),
                        Expanded(child: Text(text)),
                      ],
                    ),
                  ),
                ),
              ),
            );
          }),
        ],
      ),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
        child: Row(
          children: [
            Expanded(
              child: OutlinedButton(
                onPressed: _index > 0 ? () => setState(() => _index--) : null,
                child: const Text('Trước'),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: FilledButton(
                onPressed: _submitting
                    ? null
                    : _index < total - 1
                    ? () => setState(() => _index++)
                    : _submit,
                child: Text(_submitting ? 'Đang nộp...' : (_index < total - 1 ? 'Tiếp' : 'Nộp bài')),
              ),
            ),
          ],
        ),
      ),
    );
  }
}