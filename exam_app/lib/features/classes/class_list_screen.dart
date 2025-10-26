// import 'package:flutter/material.dart';
// import 'package:flutter_riverpod/flutter_riverpod.dart';
// import 'package:go_router/go_router.dart';
// import '../../providers.dart';
// import '../../core/models/classroom.dart';
// import '../../core/ui/duo_widgets.dart';
//
// class ClassListScreen extends ConsumerWidget {
//   const ClassListScreen({super.key});
//
//   @override
//   Widget build(BuildContext context, WidgetRef ref) {
//     final repo = ref.watch(classRepoProvider);
//
//     return DuoScaffold(
//       title: 'Quản lý lớp học',
//       subtitle: 'Xem – thêm – xoá lớp',
//       actions: [
//         IconButton(
//           tooltip: 'Thêm lớp mới',
//           icon: const Icon(Icons.add_circle_outline),
//           onPressed: () => context.push('/classes/new'),
//         ),
//       ],
//       body: FutureBuilder<List<ClassRoom>>(
//         future: repo.getClasses(),
//         builder: (_, snap) {
//           if (!snap.hasData) return const Center(child: CircularProgressIndicator());
//           final items = snap.data!;
//           if (items.isEmpty) {
//             return const DuoEmpty(text: 'Chưa có lớp nào', emoji: '🏫');
//           }
//
//           return ListView.builder(
//             padding: const EdgeInsets.only(bottom: 16),
//             itemCount: items.length,
//             itemBuilder: (_, i) {
//               final c = items[i];
//               return DuoListTile(
//                 icon: Icons.class_,
//                 title: c.name,
//                 subtitle: 'Sĩ số: ${c.studentIds.length}',
//                 onTap: () => context.push('/classes/${c.id}'),
//                 trailing: [
//                   IconButton(
//                     tooltip: 'Xoá lớp',
//                     icon: const Icon(Icons.delete_outline, color: Colors.redAccent),
//                     onPressed: () async {
//                       await repo.deleteClass(c.id);
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
