// import 'package:flutter/material.dart';
// import 'package:flutter_riverpod/flutter_riverpod.dart';
// import 'package:go_router/go_router.dart';
// import '../../providers.dart';
// import '../../core/models/subject.dart';
// import '../../core/models/chapter.dart';
// import '../../core/models/part.dart';
// import '../../core/models/question.dart';
//
// class QuestionFormScreen extends ConsumerStatefulWidget {
//   final String? id;
//   const QuestionFormScreen({super.key, this.id});
//
//   @override
//   ConsumerState<QuestionFormScreen> createState() => _QuestionFormScreenState();
// }
//
// class _QuestionFormScreenState extends ConsumerState<QuestionFormScreen> {
//   final _form = GlobalKey<FormState>();
//   final contentC = TextEditingController();
//   final optC = List.generate(4, (_) => TextEditingController());
//   int correctIndex = 0;
//   Difficulty diff = Difficulty.easy;
//
//   String? subjectId;
//   String? chapterId;
//   String? partId;
//
//   @override
//   void dispose() {
//     contentC.dispose();
//     for (final c in optC) c.dispose();
//     super.dispose();
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     final subjectRepo = ref.watch(subjectRepoProvider);
//     final qRepo = ref.watch(questionRepoProvider);
//
//     return Scaffold(
//       appBar: AppBar(title: Text(widget.id == null ? 'Thêm câu hỏi' : 'Sửa câu hỏi')),
//       body: FutureBuilder(
//         future: Future.wait([
//           subjectRepo.getSubjects(),
//           qRepo.getQuestions(),
//         ]),
//         builder: (_, snap) {
//           if (!snap.hasData) return const Center(child: CircularProgressIndicator());
//           final subjects = snap.data![0] as List<Subject>;
//           final allQ = snap.data![1] as List<Question>;
//
//           // Prefill for editing
//           if (widget.id != null) {
//             final editing = allQ.firstWhere((e) => e.id == widget.id);
//             subjectId ??= editing.subjectId;
//             chapterId ??= editing.chapterId;
//             partId ??= editing.partId;
//             if (contentC.text.isEmpty) {
//               contentC.text = editing.content;
//               for (int i = 0; i < editing.options.length && i < 4; i++) {
//                 optC[i].text = editing.options[i].content;
//               }
//               correctIndex = editing.options.indexWhere((o) => o.id == editing.correctOptionId);
//               diff = editing.difficulty;
//             }
//           }
//
//           final chaptersFuture = subjectId == null ? Future.value(<Chapter>[]) : subjectRepo.getChapters(subjectId!);
//           final partsFuture = chapterId == null ? Future.value(<Part>[]) : subjectRepo.getParts(chapterId!);
//
//           return Padding(
//             padding: const EdgeInsets.all(16),
//             child: Form(
//               key: _form,
//               child: ListView(
//                 children: [
//                   DropdownButtonFormField<String>(
//                     value: subjectId,
//                     items: subjects.map((s) => DropdownMenuItem(value: s.id, child: Text(s.name))).toList(),
//                     onChanged: (v) => setState(() { subjectId = v; chapterId = null; partId = null; }),
//                     decoration: const InputDecoration(labelText: 'Môn học'),
//                     validator: (v) => v == null ? 'Chọn môn' : null,
//                   ),
//                   const SizedBox(height: 12),
//                   FutureBuilder<List<Chapter>>(
//                     future: chaptersFuture,
//                     builder: (_, chSnap) {
//                       final list = chSnap.data ?? [];
//                       return DropdownButtonFormField<String>(
//                         value: list.any((c) => c.id == chapterId) ? chapterId : null,
//                         items: list.map((c) => DropdownMenuItem(value: c.id, child: Text(c.name))).toList(),
//                         onChanged: (v) => setState(() { chapterId = v; partId = null; }),
//                         decoration: const InputDecoration(labelText: 'Chương'),
//                         validator: (v) => v == null ? 'Chọn chương' : null,
//                       );
//                     },
//                   ),
//                   const SizedBox(height: 12),
//                   FutureBuilder<List<Part>>(
//                     future: partsFuture,
//                     builder: (_, pSnap) {
//                       final list = pSnap.data ?? [];
//                       return DropdownButtonFormField<String>(
//                         value: list.any((p) => p.id == partId) ? partId : null,
//                         items: list.map((p) => DropdownMenuItem(value: p.id, child: Text(p.name))).toList(),
//                         onChanged: (v) => setState(() { partId = v; }),
//                         decoration: const InputDecoration(labelText: 'Phần'),
//                         validator: (v) => v == null ? 'Chọn phần' : null,
//                       );
//                     },
//                   ),
//                   const SizedBox(height: 12),
//                   TextFormField(
//                     controller: contentC,
//                     maxLines: 3,
//                     decoration: const InputDecoration(labelText: 'Nội dung câu hỏi'),
//                     validator: (v) => v!.isEmpty ? 'Nhập nội dung' : null,
//                   ),
//                   const SizedBox(height: 12),
//                   const Text('Các phương án trả lời (chọn 1 đúng):', style: TextStyle(fontWeight: FontWeight.bold)),
//                   const SizedBox(height: 8),
//                   ...List.generate(4, (i) => Row(
//                     children: [
//                       Radio<int>(
//                         value: i,
//                         groupValue: correctIndex,
//                         onChanged: (v) => setState(() => correctIndex = v!),
//                       ),
//                       Expanded(
//                         child: TextFormField(
//                           controller: optC[i],
//                           decoration: InputDecoration(labelText: 'Phương án ${String.fromCharCode(65+i)}'),
//                           validator: (v) => v!.isEmpty ? 'Nhập phương án' : null,
//                         ),
//                       ),
//                     ],
//                   )),
//                   const SizedBox(height: 12),
//                   DropdownButtonFormField<Difficulty>(
//                     value: diff,
//                     items: Difficulty.values.map((d) =>
//                         DropdownMenuItem(value: d, child: Text(d.name.toUpperCase()))).toList(),
//                     onChanged: (v) => setState(() => diff = v!),
//                     decoration: const InputDecoration(labelText: 'Độ khó'),
//                   ),
//                   const SizedBox(height: 16),
//                   FilledButton(
//                     onPressed: () async {
//                       if (!_form.currentState!.validate()) return;
//                       final opts = List.generate(4, (i) => AnswerOption(id: 'o${i+1}', content: optC[i].text.trim()));
//                       final q = Question(
//                         id: widget.id ?? '',
//                         subjectId: subjectId!,
//                         chapterId: chapterId!,
//                         partId: partId!,
//                         content: contentC.text.trim(),
//                         options: opts,
//                         correctOptionId: opts[correctIndex].id,
//                         difficulty: diff,
//                       );
//                       if (widget.id == null) {
//                         await qRepo.createQuestion(q);
//                       } else {
//                         await qRepo.updateQuestion(q);
//                       }
//                       if (mounted) context.pop();
//                     },
//                     child: const Text('Lưu'),
//                   )
//                 ],
//               ),
//             ),
//           );
//         },
//       ),
//     );
//   }
// }
