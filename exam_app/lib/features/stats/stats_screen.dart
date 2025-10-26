// import 'package:flutter/material.dart';
// import 'package:flutter_riverpod/flutter_riverpod.dart';
// import '../../providers.dart';
// import '../../core/ui/duo_widgets.dart';
//
// class StatsScreen extends ConsumerWidget {
//   const StatsScreen({super.key});
//
//   @override
//   Widget build(BuildContext context, WidgetRef ref) {
//     final repo = ref.watch(statsRepoProvider);
//
//     return DuoScaffold(
//       title: 'Thống kê kỳ thi',
//       subtitle: 'Theo dõi đăng ký & dự thi',
//       body: FutureBuilder<Map<String, int>>(
//         future: repo.registrationAndAttendance(),
//         builder: (_, snap) {
//           if (!snap.hasData) return const Center(child: CircularProgressIndicator());
//           final data = snap.data!;
//
//           final registered = data['registered'] ?? 0;
//           final attended = data['attended'] ?? 0;
//
//           return Padding(
//             padding: const EdgeInsets.all(24),
//             child: Column(
//               crossAxisAlignment: CrossAxisAlignment.stretch,
//               children: [
//                 const DuoHeader(title: '📊 Tổng quan'),
//                 const SizedBox(height: 16),
//                 Card(
//                   elevation: 0,
//                   shape: RoundedRectangleBorder(
//                       borderRadius: BorderRadius.circular(20)),
//                   child: Padding(
//                     padding: const EdgeInsets.all(20),
//                     child: Column(
//                       children: [
//                         _buildStatItem('Đã đăng ký', registered, Colors.blue),
//                         const Divider(height: 24),
//                         _buildStatItem('Đã dự thi', attended, Colors.green),
//                       ],
//                     ),
//                   ),
//                 ),
//                 const SizedBox(height: 32),
//                 LinearProgressIndicator(
//                   value: registered == 0 ? 0 : attended / registered,
//                   minHeight: 12,
//                   borderRadius: BorderRadius.circular(8),
//                   backgroundColor: Colors.grey.shade300,
//                   color: Theme.of(context).colorScheme.primary,
//                 ),
//                 const SizedBox(height: 8),
//                 Text(
//                   registered == 0
//                       ? 'Chưa có dữ liệu thi'
//                       : 'Tỷ lệ dự thi: ${(attended / registered * 100).toStringAsFixed(1)}%',
//                   textAlign: TextAlign.center,
//                   style: const TextStyle(fontWeight: FontWeight.w600),
//                 ),
//               ],
//             ),
//           );
//         },
//       ),
//     );
//   }
//
//   Widget _buildStatItem(String label, int value, Color color) {
//     return Row(
//       mainAxisAlignment: MainAxisAlignment.spaceBetween,
//       children: [
//         Text(label, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 16)),
//         Chip(
//           label: Text(
//             value.toString(),
//             style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
//           ),
//           backgroundColor: color,
//         ),
//       ],
//     );
//   }
// }
