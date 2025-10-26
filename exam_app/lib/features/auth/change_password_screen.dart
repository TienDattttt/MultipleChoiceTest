// import 'package:flutter/material.dart';
// import 'package:flutter_riverpod/flutter_riverpod.dart';
// import '../../providers.dart';
//
// class ChangePasswordScreen extends ConsumerStatefulWidget {
//   const ChangePasswordScreen({super.key});
//   @override
//   ConsumerState<ChangePasswordScreen> createState() => _ChangePasswordScreenState();
// }
//
// class _ChangePasswordScreenState extends ConsumerState<ChangePasswordScreen> {
//   final _form = GlobalKey<FormState>();
//   final oldC = TextEditingController();
//   final newC = TextEditingController();
//   @override
//   Widget build(BuildContext context) {
//     final user = ref.watch(currentUserProvider)!;
//     return Scaffold(
//       appBar: AppBar(title: const Text('Đổi mật khẩu')),
//       body: Padding(
//         padding: const EdgeInsets.all(16),
//         child: Form(
//           key: _form,
//           child: Column(children: [
//             TextFormField(controller: oldC, decoration: const InputDecoration(labelText: 'Mật khẩu cũ'), obscureText: true, validator: (v)=>v!.isEmpty?'Nhập mật khẩu cũ':null),
//             const SizedBox(height: 12),
//             TextFormField(controller: newC, decoration: const InputDecoration(labelText: 'Mật khẩu mới'), obscureText: true, validator: (v)=>v!.length<4?'>=4 ký tự':null),
//             const SizedBox(height: 16),
//             FilledButton(
//               onPressed: () async {
//                 if (!_form.currentState!.validate()) return;
//                 await ref.read(authRepoProvider).changePassword(user.id, oldC.text, newC.text);
//                 if (mounted) {
//                   ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Đã đổi mật khẩu (mock)')));
//                 }
//               },
//               child: const Text('Lưu'),
//             )
//           ]),
//         ),
//       ),
//     );
//   }
// }
