// import 'package:flutter/material.dart';
// import 'package:flutter_riverpod/flutter_riverpod.dart';
// import 'package:go_router/go_router.dart';
// import 'package:intl/intl.dart';
// import '../../providers.dart';
// import '../../core/models/exam.dart';
// import '../../core/models/subject.dart';
// import '../../core/models/part.dart';
// import '../../core/models/chapter.dart';
// import '../../core/models/classroom.dart';
//
// class ExamFormScreen extends ConsumerStatefulWidget {
//   const ExamFormScreen({super.key});
//
//   @override
//   ConsumerState<ExamFormScreen> createState() => _ExamFormScreenState();
// }
//
// class _ExamFormScreenState extends ConsumerState<ExamFormScreen> {
//   final _form = GlobalKey<FormState>();
//
//   String? subjectId;
//   final examNameC = TextEditingController();
//   final totalC = TextEditingController(text: '10');
//   final durationC = TextEditingController(text: '30');
//   final levelC = TextEditingController(text: 'MIX');
//
//   final Map<String, TextEditingController> distributionCtrls = {};
//
//   DateTime? startTime;
//   DateTime? endTime;
//   final Set<String> selectedClassIds = {};
//
//   @override
//   void dispose() {
//     examNameC.dispose();
//     totalC.dispose();
//     durationC.dispose();
//     levelC.dispose();
//     for (final c in distributionCtrls.values) { c.dispose(); }
//     super.dispose();
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     final subjectRepo = ref.watch(subjectRepoProvider);
//     final examRepo = ref.watch(examRepoProvider);
//     final classRepo = ref.watch(classRepoProvider);
//
//     return Scaffold(
//       appBar: AppBar(title: const Text('Tạo đề & lịch thi')),
//       body: FutureBuilder(
//         future: Future.wait([
//           subjectRepo.getSubjects(),
//           classRepo.getClasses(),
//         ]),
//         builder: (_, snap) {
//           if (!snap.hasData) return const Center(child: CircularProgressIndicator());
//           final subjects = snap.data![0] as List<Subject>;
//           final classes = snap.data![1] as List<ClassRoom>;
//
//           final chaptersFuture = subjectId == null ? Future.value(<Chapter>[]) : subjectRepo.getChapters(subjectId!);
//
//           return Padding(
//             padding: const EdgeInsets.all(16),
//             child: Form(
//               key: _form,
//               child: ListView(
//                 children: [
//                   const Text('Thông tin đề thi', style: TextStyle(fontWeight: FontWeight.bold)),
//                   const SizedBox(height: 8),
//                   DropdownButtonFormField<String>(
//                     value: subjectId,
//                     items: subjects.map((s) => DropdownMenuItem(value: s.id, child: Text(s.name))).toList(),
//                     onChanged: (v) => setState(() { subjectId = v; distributionCtrls.clear(); }),
//                     decoration: const InputDecoration(labelText: 'Môn học'),
//                     validator: (v) => v == null ? 'Chọn môn' : null,
//                   ),
//                   const SizedBox(height: 8),
//                   TextFormField(
//                     controller: examNameC,
//                     decoration: const InputDecoration(labelText: 'Tên đề'),
//                     validator: (v) => v!.isEmpty ? 'Nhập tên đề' : null,
//                   ),
//                   const SizedBox(height: 8),
//                   Row(
//                     children: [
//                       Expanded(child: TextFormField(
//                         controller: totalC,
//                         keyboardType: TextInputType.number,
//                         decoration: const InputDecoration(labelText: 'Tổng số câu'),
//                         validator: (v) => (int.tryParse(v ?? '') ?? 0) > 0 ? null : 'Số câu > 0',
//                       )),
//                       const SizedBox(width: 8),
//                       Expanded(child: TextFormField(
//                         controller: durationC,
//                         keyboardType: TextInputType.number,
//                         decoration: const InputDecoration(labelText: 'Thời gian (phút)'),
//                         validator: (v) => (int.tryParse(v ?? '') ?? 0) > 0 ? null : 'Thời gian > 0',
//                       )),
//                       const SizedBox(width: 8),
//                       Expanded(child: TextFormField(
//                         controller: levelC,
//                         decoration: const InputDecoration(labelText: 'Mức độ (vd: MIX/EASY/...)'),
//                       )),
//                     ],
//                   ),
//                   const SizedBox(height: 12),
//                   const Text('Phân bố câu hỏi theo PHẦN', style: TextStyle(fontWeight: FontWeight.bold)),
//                   const SizedBox(height: 6),
//                   FutureBuilder<List<Chapter>>(
//                     future: chaptersFuture,
//                     builder: (_, chSnap) {
//                       final chapters = chSnap.data ?? [];
//                       return Column(
//                         crossAxisAlignment: CrossAxisAlignment.start,
//                         children: [
//                           if (chapters.isEmpty) const Text('Chọn môn để tải chương/phần.'),
//                           ...chapters.map((ch) => _ChapterDistributionBlock(
//                             chapter: ch,
//                             loadParts: () => subjectRepo.getParts(ch.id),
//                             ctrls: distributionCtrls,
//                           )),
//                         ],
//                       );
//                     },
//                   ),
//                   const SizedBox(height: 16),
//                   const Divider(),
//                   const SizedBox(height: 8),
//                   const Text('Lịch thi (tuỳ chọn)', style: TextStyle(fontWeight: FontWeight.bold)),
//                   const SizedBox(height: 8),
//                   Wrap(
//                     spacing: 8,
//                     runSpacing: 8,
//                     children: [
//                       OutlinedButton.icon(
//                         icon: const Icon(Icons.schedule),
//                         label: Text('Bắt đầu: ${_fmtDT(startTime)}'),
//                         onPressed: () async {
//                           final picked = await _pickDateTime(context);
//                           if (picked != null) setState(() => startTime = picked);
//                         },
//                       ),
//                       OutlinedButton.icon(
//                         icon: const Icon(Icons.schedule_send),
//                         label: Text('Kết thúc: ${_fmtDT(endTime)}'),
//                         onPressed: () async {
//                           final picked = await _pickDateTime(context);
//                           if (picked != null) setState(() => endTime = picked);
//                         },
//                       ),
//                     ],
//                   ),
//                   const SizedBox(height: 8),
//                   const Text('Chọn lớp được thi:'),
//                   Wrap(
//                     spacing: 6,
//                     children: classes.map((c) {
//                       final sel = selectedClassIds.contains(c.id);
//                       return FilterChip(
//                         label: Text(c.name),
//                         selected: sel,
//                         onSelected: (v) {
//                           setState(() {
//                             if (v) { selectedClassIds.add(c.id); } else { selectedClassIds.remove(c.id); }
//                           });
//                         },
//                       );
//                     }).toList(),
//                   ),
//                   const SizedBox(height: 16),
//                   FilledButton.icon(
//                     icon: const Icon(Icons.save),
//                     label: const Text('Lưu đề (và tạo lịch nếu có)'),
//                     onPressed: () async {
//                       if (!_form.currentState!.validate()) return;
//
//                       final total = int.parse(totalC.text);
//                       final duration = int.parse(durationC.text);
//                       final dist = <String, int>{};
//                       for (final e in distributionCtrls.entries) {
//                         final n = int.tryParse(e.value.text) ?? 0;
//                         if (n > 0) dist[e.key] = n;
//                       }
//
//                       final created = await examRepo.createExam(Exam(
//                         id: '',
//                         subjectId: subjectId!,
//                         name: examNameC.text.trim(),
//                         totalQuestions: total,
//                         durationMinutes: duration,
//                         chapterPartDistribution: dist,
//                         level: levelC.text.trim().isEmpty ? 'MIX' : levelC.text.trim(),
//                       ));
//
//                       if (startTime != null && endTime != null && selectedClassIds.isNotEmpty) {
//                         await examRepo.createSchedule(ExamSchedule(
//                           id: '',
//                           examId: created.id,
//                           classIds: selectedClassIds.toList(),
//                           startTime: startTime!,
//                           endTime: endTime!,
//                         ));
//                       }
//
//                       if (mounted) {
//                         ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Đã lưu')));
//                         context.pop();
//                       }
//                     },
//                   ),
//                 ],
//               ),
//             ),
//           );
//         },
//       ),
//     );
//   }
//
//   String _fmtDT(DateTime? dt) => dt == null ? '—' : DateFormat('dd/MM/yyyy HH:mm').format(dt);
//
//   Future<DateTime?> _pickDateTime(BuildContext context) async {
//     final now = DateTime.now();
//     final d = await showDatePicker(
//       context: context,
//       initialDate: now,
//       firstDate: now.subtract(const Duration(days: 1)),
//       lastDate: now.add(const Duration(days: 365)),
//     );
//     if (d == null) return null;
//     final t = await showTimePicker(context: context, initialTime: TimeOfDay.fromDateTime(now.add(const Duration(minutes: 5))));
//     if (t == null) return null;
//     return DateTime(d.year, d.month, d.day, t.hour, t.minute);
//   }
// }
//
// class _ChapterDistributionBlock extends StatefulWidget {
//   final Chapter chapter;
//   final Future<List<Part>> Function() loadParts;
//   final Map<String, TextEditingController> ctrls;
//   const _ChapterDistributionBlock({required this.chapter, required this.loadParts, required this.ctrls});
//
//   @override
//   State<_ChapterDistributionBlock> createState() => _ChapterDistributionBlockState();
// }
//
// class _ChapterDistributionBlockState extends State<_ChapterDistributionBlock> {
//   List<Part>? parts;
//
//   @override
//   void initState() {
//     super.initState();
//     _load();
//   }
//
//   Future<void> _load() async {
//     final p = await widget.loadParts();
//     setState(() => parts = p);
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     return Card(
//       margin: const EdgeInsets.symmetric(vertical: 6),
//       child: Padding(
//         padding: const EdgeInsets.all(12),
//         child: parts == null
//             ? const SizedBox(height: 40, child: Center(child: CircularProgressIndicator()))
//             : Column(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             Text('Chương: ${widget.chapter.name}', style: const TextStyle(fontWeight: FontWeight.bold)),
//             const SizedBox(height: 6),
//             if (parts!.isEmpty) const Text('Chưa có phần.'),
//             ...parts!.map((p) {
//               widget.ctrls.putIfAbsent(p.id, () => TextEditingController(text: '0'));
//               return Padding(
//                 padding: const EdgeInsets.symmetric(vertical: 4),
//                 child: Row(
//                   children: [
//                     Expanded(child: Text('• ${p.name}')),
//                     SizedBox(
//                       width: 90,
//                       child: TextField(
//                         controller: widget.ctrls[p.id],
//                         keyboardType: TextInputType.number,
//                         decoration: const InputDecoration(labelText: 'Số câu', isDense: true),
//                       ),
//                     ),
//                   ],
//                 ),
//               );
//             }),
//           ],
//         ),
//       ),
//     );
//   }
// }
