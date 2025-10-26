// import 'package:flutter/material.dart';
// import 'package:flutter_riverpod/flutter_riverpod.dart';
// import 'package:go_router/go_router.dart';
// import '../../providers.dart';
// import '../../core/models/subject.dart';
//
// class SubjectFormScreen extends ConsumerStatefulWidget {
//   final String? id;
//   const SubjectFormScreen({super.key, this.id});
//
//   @override
//   ConsumerState<SubjectFormScreen> createState() => _SubjectFormScreenState();
// }
//
// class _SubjectFormScreenState extends ConsumerState<SubjectFormScreen> {
//   final _form = GlobalKey<FormState>();
//   final nameC = TextEditingController();
//
//   @override
//   Widget build(BuildContext context) {
//     final repo = ref.watch(subjectRepoProvider);
//     return Scaffold(
//       appBar: AppBar(title: Text(widget.id == null ? 'Thêm môn học' : 'Sửa môn học')),
//       body: FutureBuilder<List<Subject>>(
//         future: repo.getSubjects(),
//         builder: (_, snap) {
//           if (!snap.hasData) return const Center(child: CircularProgressIndicator());
//           final list = snap.data!;
//           Subject? editing = widget.id == null ? null : list.firstWhere((e) => e.id == widget.id);
//           if (editing != null && nameC.text.isEmpty) nameC.text = editing.name;
//
//           return Padding(
//             padding: const EdgeInsets.all(16),
//             child: Form(
//               key: _form,
//               child: Column(children: [
//                 TextFormField(
//                   controller: nameC,
//                   decoration: const InputDecoration(labelText: 'Tên môn học'),
//                   validator: (v) => v!.isEmpty ? 'Nhập tên môn' : null,
//                 ),
//                 const SizedBox(height: 16),
//                 FilledButton(
//                   onPressed: () async {
//                     if (!_form.currentState!.validate()) return;
//                     if (editing == null) {
//                       await repo.createSubject(Subject(id: '', name: nameC.text));
//                     } else {
//                       await repo.updateSubject(editing.copyWith(name: nameC.text));
//                     }
//                     if (mounted) context.pop();
//                   },
//                   child: const Text('Lưu'),
//                 ),
//               ]),
//             ),
//           );
//         },
//       ),
//     );
//   }
// }
