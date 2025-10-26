// import 'package:flutter/material.dart';
// import 'package:flutter_riverpod/flutter_riverpod.dart';
// import 'package:go_router/go_router.dart';
// import '../../providers.dart';
// import '../../core/models/classroom.dart';
//
// class ClassFormScreen extends ConsumerStatefulWidget {
//   final String? id;
//   const ClassFormScreen({super.key, this.id});
//
//   @override
//   ConsumerState<ClassFormScreen> createState() => _ClassFormScreenState();
// }
//
// class _ClassFormScreenState extends ConsumerState<ClassFormScreen> {
//   final _form = GlobalKey<FormState>();
//   final nameC = TextEditingController();
//
//   @override
//   Widget build(BuildContext context) {
//     final repo = ref.watch(classRepoProvider);
//     return Scaffold(
//       appBar: AppBar(title: Text(widget.id == null ? 'Thêm lớp' : 'Sửa lớp')),
//       body: FutureBuilder<List<ClassRoom>>(
//         future: repo.getClasses(),
//         builder: (_, snap) {
//           if (!snap.hasData) return const Center(child: CircularProgressIndicator());
//           final list = snap.data!;
//           ClassRoom? editing = widget.id == null ? null : list.firstWhere((e) => e.id == widget.id);
//           if (editing != null && nameC.text.isEmpty) nameC.text = editing.name;
//
//           return Padding(
//             padding: const EdgeInsets.all(16),
//             child: Form(
//               key: _form,
//               child: Column(
//                 children: [
//                   TextFormField(
//                     controller: nameC,
//                     decoration: const InputDecoration(labelText: 'Tên lớp'),
//                     validator: (v) => v!.isEmpty ? 'Nhập tên lớp' : null,
//                   ),
//                   const SizedBox(height: 16),
//                   FilledButton(
//                     onPressed: () async {
//                       if (!_form.currentState!.validate()) return;
//                       if (editing == null) {
//                         await repo.createClass(ClassRoom(id: '', name: nameC.text, studentIds: const []));
//                       } else {
//                         await repo.updateClass(editing.copyWith(name: nameC.text));
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
