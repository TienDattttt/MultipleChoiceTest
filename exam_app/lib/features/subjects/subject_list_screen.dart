// import 'package:flutter/material.dart';
// import 'package:flutter_riverpod/flutter_riverpod.dart';
// import 'package:go_router/go_router.dart';
// import '../../providers.dart';
// import '../../core/models/subject.dart';
// import '../../core/ui/duo_widgets.dart';
//
// class SubjectListScreen extends ConsumerWidget {
//   const SubjectListScreen({super.key});
//
//   @override
//   Widget build(BuildContext context, WidgetRef ref) {
//     final repo = ref.watch(subjectRepoProvider);
//
//     return DuoScaffold(
//       title: 'Môn học',
//       subtitle: 'Xem – thêm – sửa môn',
//       actions: [
//         IconButton(
//           tooltip: 'Thêm môn học mới',
//           icon: const Icon(Icons.add_circle_outline),
//           onPressed: () => context.push('/subjects/new'),
//         ),
//       ],
//       body: FutureBuilder<List<Subject>>(
//         future: repo.getSubjects(),
//         builder: (_, snap) {
//           if (!snap.hasData) return const Center(child: CircularProgressIndicator());
//           final items = snap.data!;
//           if (items.isEmpty) {
//             return const DuoEmpty(text: 'Chưa có môn học nào', emoji: '📚');
//           }
//
//           return ListView.builder(
//             padding: const EdgeInsets.only(bottom: 16),
//             itemCount: items.length,
//             itemBuilder: (_, i) {
//               final s = items[i];
//               return DuoListTile(
//                 icon: Icons.menu_book_outlined,
//                 title: s.name,
//                 subtitle: 'Mã: ${s.id}',
//                 onTap: () => context.push('/subjects/${s.id}/structure'),
//                 trailing: [
//                   IconButton(
//                     tooltip: 'Sửa môn học',
//                     icon: const Icon(Icons.edit_outlined),
//                     onPressed: () => context.push('/subjects/${s.id}'),
//                   ),
//                   IconButton(
//                     tooltip: 'Xoá môn học',
//                     icon: const Icon(Icons.delete_outline, color: Colors.redAccent),
//                     onPressed: () async {
//                       await repo.deleteSubject(s.id);
//                       (context as Element).reassemble();
//                     },
//                   ),
//                 ],
//               );
//             },
//           );
//         },
//       ),
//     );
//   }
// }
