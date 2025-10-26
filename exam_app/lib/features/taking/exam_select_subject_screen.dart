import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../providers.dart';

class ExamSelectSubjectScreen extends ConsumerStatefulWidget {
  const ExamSelectSubjectScreen({super.key});

  @override
  ConsumerState<ExamSelectSubjectScreen> createState() =>
      _ExamSelectSubjectScreenState();
}

class _ExamSelectSubjectScreenState
    extends ConsumerState<ExamSelectSubjectScreen> {
  final _examIdCtrl = TextEditingController();
  bool _starting = false;

  @override
  Widget build(BuildContext context) {
    final api = ref.watch(examApiProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Chọn bài thi')),
      body: FutureBuilder<List<Map<String, dynamic>>>(
        future: api.getExams(),
        builder: (_, snap) {
          if (snap.connectionState != ConnectionState.done) {
            return const Center(child: CircularProgressIndicator());
          }

          final exams = snap.data ?? [];

          /// Nếu không lấy được list -> nhập mã thủ công
          if (exams.isEmpty) {
            return Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Nhập mã kỳ thi được giáo viên cung cấp',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _examIdCtrl,
                    keyboardType: TextInputType.number,
                    decoration: const InputDecoration(
                      labelText: 'Mã kỳ thi (examId)',
                      prefixIcon: Icon(Icons.numbers),
                    ),
                  ),
                  const SizedBox(height: 12),
                  FilledButton.icon(
                    onPressed: _starting
                        ? null
                        : () async {
                      final raw = _examIdCtrl.text.trim();
                      if (raw.isEmpty) return;
                      final examId = int.tryParse(raw);
                      if (examId == null) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                              content: Text('Mã kỳ thi không hợp lệ')),
                        );
                        return;
                      }
                      setState(() => _starting = true);
                      try {
                        final attemptId =
                        await api.startAttempt(examId);
                        if (mounted) context.push('/take/$attemptId');
                      } catch (e) {
                        if (!mounted) return;
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                              content:
                              Text('Không bắt đầu được bài thi: $e')),
                        );
                      } finally {
                        if (mounted) {
                          setState(() => _starting = false);
                        }
                      }
                    },
                    icon: const Icon(Icons.play_arrow),
                    label:
                    Text(_starting ? 'Đang bắt đầu...' : 'Bắt đầu thi'),
                  ),
                ],
              ),
            );
          }

          /// Có danh sách -> render ListView
          return ListView.builder(
            padding: const EdgeInsets.all(12),
            itemCount: exams.length,
            itemBuilder: (_, i) {
              final e = exams[i];
              final id = (e['id'] ?? e['examId'])?.toString() ?? '?';
              final name =
              (e['title'] ?? e['name'] ?? 'Kỳ thi #$id').toString();
              final dur =
              (e['durationMin'] ?? e['durationMinutes'] ?? '?').toString();
              final score = e['score']; // Double? (null nếu chưa thi)

              return Card(
                child: ListTile(
                  title: Text(name),
                  subtitle: Text(
                    'Mã: $id • ${dur}p • ${score == null ? "Chưa thi" : "${score.toString()} điểm"}',
                  ),
                  trailing: score == null
                      ? const Icon(Icons.arrow_forward) // chưa thi -> cho thi
                      : Text(
                    '${score.toString()}',
                    style: const TextStyle(
                        color: Colors.blue,
                        fontSize: 16,
                        fontWeight: FontWeight.bold),
                  ),
                  onTap: score != null
                      ? null // đã thi rồi -> không cho thi nữa
                      : () async {
                    try {
                      final examId = int.tryParse(id);
                      if (examId == null) {
                        throw Exception('examId không hợp lệ');
                      }
                      final attemptId =
                      await api.startAttempt(examId);
                      if (mounted) context.push('/take/$attemptId');
                    } catch (e) {
                      if (!mounted) return;
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                            content: Text(
                                'Không bắt đầu được bài thi: $e')),
                      );
                    }
                  },
                ),
              );
            },
          );
        },
      ),
    );
  }
}
