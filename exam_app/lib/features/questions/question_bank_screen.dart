// import 'package:flutter/material.dart';
// import 'package:flutter_riverpod/flutter_riverpod.dart';
// import 'package:go_router/go_router.dart';
// import '../../providers.dart';
// import '../../core/models/question.dart';
// import '../../core/ui/duo_widgets.dart';
//
// class QuestionBankScreen extends ConsumerStatefulWidget {
//   const QuestionBankScreen({super.key});
//   @override
//   ConsumerState<QuestionBankScreen> createState() => _QuestionBankScreenState();
// }
//
// class _QuestionBankScreenState extends ConsumerState<QuestionBankScreen> {
//   String keyword = '';
//   Difficulty? filterDiff;
//
//   @override
//   Widget build(BuildContext context) {
//     final repo = ref.watch(questionRepoProvider);
//     return Scaffold(
//       body: Column(
//         children: [
//           DuoHeader(
//             title: 'Ngân hàng câu hỏi',
//             subtitle: 'Tạo – sửa – xoá câu hỏi',
//             trailing: FilledButton.icon(
//               onPressed: () => context.push('/questions/new'),
//               icon: const Icon(Icons.add),
//               label: const Text('Thêm'),
//             ),
//           ),
//           DuoCard(
//             child: Column(
//               children: [
//                 TextField(
//                   decoration: const InputDecoration(
//                     hintText: 'Tìm theo nội dung...',
//                     prefixIcon: Icon(Icons.search),
//                   ),
//                   onChanged: (v) => setState(() => keyword = v.trim()),
//                 ),
//                 const SizedBox(height: 8),
//                 Wrap(spacing: 6, children: [
//                   ChoiceChip(
//                     label: const Text('Tất cả'),
//                     selected: filterDiff == null,
//                     onSelected: (_) => setState(() => filterDiff = null),
//                   ),
//                   ...Difficulty.values.map((d) => ChoiceChip(
//                     label: Text(d.name.toUpperCase()),
//                     selected: filterDiff == d,
//                     onSelected: (_) => setState(() => filterDiff = d),
//                   )),
//                 ]),
//               ],
//             ),
//           ),
//           Expanded(
//             child: FutureBuilder<List<Question>>(
//               future: repo.getQuestions(),
//               builder: (_, snap) {
//                 if (!snap.hasData) return const Center(child: CircularProgressIndicator());
//                 var data = snap.data!;
//                 if (keyword.isNotEmpty) {
//                   data = data.where((q) => q.content.toLowerCase().contains(keyword.toLowerCase())).toList();
//                 }
//                 if (filterDiff != null) {
//                   data = data.where((q) => q.difficulty == filterDiff).toList();
//                 }
//                 if (data.isEmpty) {
//                   return DuoEmpty(
//                     text: 'Chưa có câu hỏi phù hợp',
//                     emoji: '🧐',
//                     action: FilledButton.icon(
//                       onPressed: () => context.push('/questions/new'),
//                       icon: const Icon(Icons.add),
//                       label: const Text('Thêm câu hỏi'),
//                     ),
//                   );
//                 }
//                 return ListView.builder(
//                   padding: const EdgeInsets.only(bottom: 16),
//                   itemCount: data.length,
//                   itemBuilder: (_, i) {
//                     final q = data[i];
//                     return DuoListTile(
//                       icon: Icons.help_outline,
//                       title: q.content,
//                       subtitle: 'Độ khó: ${q.difficulty.name.toUpperCase()}',
//                       onTap: () => context.push('/questions/${q.id}'),
//                       trailing: [
//                         IconButton(
//                           icon: const Icon(Icons.edit),
//                           onPressed: () => context.push('/questions/${q.id}'),
//                         ),
//                         IconButton(
//                           icon: const Icon(Icons.delete),
//                           onPressed: () async {
//                             await repo.deleteQuestion(q.id);
//                             if (mounted) setState(() {});
//                           },
//                         ),
//                       ],
//                     );
//                   },
//                 );
//               },
//             ),
//           ),
//         ],
//       ),
//     );
//   }
// }
