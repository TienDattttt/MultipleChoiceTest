// import 'package:flutter/material.dart';
// import 'package:flutter_riverpod/flutter_riverpod.dart';
// import 'package:go_router/go_router.dart';
// import '../../providers.dart';
// import '../../core/models/classroom.dart';
// import '../../core/ui/duo_widgets.dart';
//
// class StudentsListScreen extends ConsumerStatefulWidget {
//   const StudentsListScreen({super.key});
//   @override
//   ConsumerState<StudentsListScreen> createState() => _StudentsListScreenState();
// }
//
// class _StudentsListScreenState extends ConsumerState<StudentsListScreen> {
//   String keyword = '';
//
//   @override
//   Widget build(BuildContext context) {
//     final studentRepo = ref.watch(studentRepoProvider);
//     final classRepo = ref.watch(classRepoProvider);
//
//     return Scaffold(
//       body: Column(
//         children: [
//           DuoHeader(
//             title: 'Quản lý thí sinh',
//             subtitle: 'Thêm / sửa / xoá thí sinh',
//             trailing: FilledButton.icon(
//               onPressed: () => context.push('/students/new'),
//               icon: const Icon(Icons.person_add_alt),
//               label: const Text('Thêm'),
//             ),
//           ),
//           DuoCard(
//             child: TextField(
//               decoration: const InputDecoration(hintText: 'Tìm theo họ tên hoặc email', prefixIcon: Icon(Icons.search)),
//               onChanged: (v) => setState(() => keyword = v.trim()),
//             ),
//           ),
//           Expanded(
//             child: FutureBuilder(
//               future: Future.wait([studentRepo.getStudents(), classRepo.getClasses()]),
//               builder: (_, snap) {
//                 if (!snap.hasData) return const Center(child: CircularProgressIndicator());
//                 final students = (snap.data![0] as List<Student>);
//                 final classes = (snap.data![1] as List<ClassRoom>);
//                 final byId = {for (final c in classes) c.id: c};
//
//                 var data = students;
//                 if (keyword.isNotEmpty) {
//                   data = data.where((s) =>
//                   s.fullName.toLowerCase().contains(keyword.toLowerCase()) ||
//                       s.email.toLowerCase().contains(keyword.toLowerCase())
//                   ).toList();
//                 }
//                 if (data.isEmpty) return const DuoEmpty(text: 'Không tìm thấy thí sinh', emoji: '🙈');
//
//                 return ListView.builder(
//                   padding: const EdgeInsets.only(bottom: 16),
//                   itemCount: data.length,
//                   itemBuilder: (_, i) {
//                     final s = data[i];
//                     return DuoListTile(
//                       icon: Icons.person_outline,
//                       title: s.fullName,
//                       subtitle: '${s.email} • Lớp: ${byId[s.classId]?.name ?? '—'}',
//                       onTap: () => context.push('/students/${s.id}'),
//                       trailing: [
//                         IconButton(icon: const Icon(Icons.edit), onPressed: () => context.push('/students/${s.id}')),
//                         IconButton(icon: const Icon(Icons.delete), onPressed: () async {
//                           await studentRepo.deleteStudent(s.id);
//                           if (mounted) setState(() {});
//                         }),
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
