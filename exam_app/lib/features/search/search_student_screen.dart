// import 'package:flutter/material.dart';
// import 'package:flutter_riverpod/flutter_riverpod.dart';
// import '../../providers.dart';
// import '../../core/models/classroom.dart';
//
// class SearchStudentScreen extends ConsumerStatefulWidget {
//   const SearchStudentScreen({super.key});
//
//   @override
//   ConsumerState<SearchStudentScreen> createState() => _SearchStudentScreenState();
// }
//
// class _SearchStudentScreenState extends ConsumerState<SearchStudentScreen> {
//   final _c = TextEditingController();
//   List<Student> _rs = [];
//
//   @override
//   Widget build(BuildContext context) {
//     final repo = ref.watch(studentRepoProvider);
//     return Scaffold(
//       appBar: AppBar(title: const Text('Tìm kiếm thí sinh')),
//       body: Padding(
//         padding: const EdgeInsets.all(16),
//         child: Column(children: [
//           Row(children: [
//             Expanded(child: TextField(controller: _c, decoration: const InputDecoration(labelText: 'Nhập từ khóa'))),
//             const SizedBox(width: 8),
//             FilledButton(
//               onPressed: () async {
//                 final r = await repo.searchByKeyword(_c.text);
//                 setState(()=>_rs=r);
//               },
//               child: const Text('Tìm'),
//             )
//           ]),
//           const SizedBox(height: 12),
//           Expanded(
//             child: ListView.builder(
//               itemCount: _rs.length,
//               itemBuilder: (_, i) {
//                 final s = _rs[i];
//                 return ListTile(title: Text(s.fullName), subtitle: Text(s.email));
//               },
//             ),
//           )
//         ]),
//       ),
//     );
//   }
// }
