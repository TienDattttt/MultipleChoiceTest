// import 'package:flutter/material.dart';
// import 'package:flutter_riverpod/flutter_riverpod.dart';
// import 'package:go_router/go_router.dart';
// import '../../providers.dart';
// import '../../core/models/classroom.dart';
//
// class StudentFormScreen extends ConsumerStatefulWidget {
//   final String? id;
//   const StudentFormScreen({super.key, this.id});
//
//   @override
//   ConsumerState<StudentFormScreen> createState() => _StudentFormScreenState();
// }
//
// class _StudentFormScreenState extends ConsumerState<StudentFormScreen> {
//   final _form = GlobalKey<FormState>();
//   final nameC = TextEditingController();
//   final emailC = TextEditingController();
//   String? classId;
//
//   @override
//   Widget build(BuildContext context) {
//     final studentRepo = ref.watch(studentRepoProvider);
//     final classRepo = ref.watch(classRepoProvider);
//     return Scaffold(
//       appBar: AppBar(title: Text(widget.id == null ? 'Thêm thí sinh' : 'Sửa thí sinh')),
//       body: FutureBuilder(
//         future: Future.wait([classRepo.getClasses(), studentRepo.getStudents()]),
//         builder: (_, snap) {
//           if (!snap.hasData) return const Center(child: CircularProgressIndicator());
//           final classes = (snap.data![0] as List<ClassRoom>);
//           final students = (snap.data![1] as List<Student>);
//           Student? editing = widget.id == null ? null : students.firstWhere((s) => s.id == widget.id);
//           if (editing != null && nameC.text.isEmpty) {
//             nameC.text = editing.fullName;
//             emailC.text = editing.email;
//             classId = editing.classId;
//           }
//           return Padding(
//             padding: const EdgeInsets.all(16),
//             child: Form(
//               key: _form,
//               child: Column(children: [
//                 TextFormField(controller: nameC, decoration: const InputDecoration(labelText: 'Họ tên'), validator: (v)=>v!.isEmpty?'Nhập họ tên':null),
//                 const SizedBox(height: 12),
//                 TextFormField(controller: emailC, decoration: const InputDecoration(labelText: 'Email'), validator: (v)=>v!.contains('@')?null:'Email không hợp lệ'),
//                 const SizedBox(height: 12),
//                 DropdownButtonFormField<String>(
//                   value: classId,
//                   items: classes.map((c)=>DropdownMenuItem(value: c.id, child: Text(c.name))).toList(),
//                   onChanged: (v)=>setState(()=>classId=v),
//                   decoration: const InputDecoration(labelText: 'Lớp'),
//                   validator: (v)=>v==null?'Chọn lớp':null,
//                 ),
//                 const SizedBox(height: 16),
//                 FilledButton(
//                   onPressed: () async {
//                     if (!_form.currentState!.validate()) return;
//                     if (editing == null) {
//                       await studentRepo.createStudent(Student(id: '', fullName: nameC.text, email: emailC.text, classId: classId!));
//                     } else {
//                       await studentRepo.updateStudent(editing.copyWith(fullName: nameC.text, email: emailC.text, classId: classId));
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
