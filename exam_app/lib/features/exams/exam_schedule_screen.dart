// import 'package:flutter/material.dart';
// import 'package:flutter_riverpod/flutter_riverpod.dart';
// import 'package:go_router/go_router.dart';
// import 'package:intl/intl.dart';
// import '../../providers.dart';
// import '../../core/models/exam.dart';
// import '../../core/ui/duo_widgets.dart';
//
// class ExamScheduleScreen extends ConsumerWidget {
//   const ExamScheduleScreen({super.key});
//
//   @override
//   Widget build(BuildContext context, WidgetRef ref) {
//     final repo = ref.watch(examRepoProvider);
//     final fmt = DateFormat('dd/MM/yyyy HH:mm');
//     return Scaffold(
//       body: Column(
//         children: [
//           DuoHeader(
//             title: 'Kỳ thi & Lịch thi',
//             subtitle: 'Tạo đề – xếp lịch cho lớp',
//             trailing: FilledButton.icon(
//               onPressed: () => context.push('/exams/new'),
//               icon: const Icon(Icons.add),
//               label: const Text('Tạo đề'),
//             ),
//           ),
//           Expanded(
//             child: FutureBuilder<List<ExamSchedule>>(
//               future: repo.getSchedules(),
//               builder: (_, snap) {
//                 if (!snap.hasData) return const Center(child: CircularProgressIndicator());
//                 final data = snap.data!;
//                 if (data.isEmpty) {
//                   return const DuoEmpty(text: 'Chưa có lịch thi', emoji: '😴');
//                 }
//                 return ListView.builder(
//                   padding: const EdgeInsets.only(bottom: 16),
//                   itemCount: data.length,
//                   itemBuilder: (_, i) {
//                     final s = data[i];
//                     return DuoCard(
//                       child: Row(children: [
//                         const CircleAvatar(child: Icon(Icons.event_note)),
//                         const SizedBox(width: 12),
//                         Expanded(
//                           child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
//                             Text(
//                               'Lịch #${s.id.length >= 6 ? s.id.substring(0, 6) : s.id}',
//                               style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16),
//                             ),
//                             const SizedBox(height: 4),
//                             Text('Bắt đầu: ${fmt.format(s.startTime)}'),
//                             Text('Kết thúc: ${fmt.format(s.endTime)}'),
//                           ]),
//                         ),
//                         IconButton(
//                           icon: const Icon(Icons.delete),
//                           onPressed: () async {
//                             await repo.deleteSchedule(s.id);
//                             (context as Element).reassemble();
//                           },
//                         ),
//                       ]),
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
