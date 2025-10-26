import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../providers.dart';
import '../../core/ui/duo_widgets.dart';

class DashboardScreen extends ConsumerWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final tiles = <_Tile>[
      _Tile('Quản lý thí sinh', '👨‍🎓', '/students'),
      _Tile('Lớp học', '🏫', '/classes'),
      _Tile('Môn/Chương/Phần', '📚', '/subjects'),
      _Tile('Ngân hàng câu hỏi', '❓', '/questions'),
      _Tile('Đề & Lịch thi', '📝', '/exams'),
      _Tile('Thi trắc nghiệm', '⚡', '/take/select'),
      _Tile('Thống kê', '📈', '/stats'),
      _Tile('Tìm kiếm', '🔎', '/search'),
      _Tile('Đổi mật khẩu', '🔐', '/change-password'),
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Bảng điều khiển',
            style: TextStyle(fontWeight: FontWeight.bold)),
        actions: [
          IconButton(
            tooltip: 'Đăng xuất',
            icon: const Icon(Icons.logout),
            onPressed: () async {
              await ref.read(authRepoProvider).logout();
              ref.read(currentUserProvider.notifier).state = null;
              if (context.mounted) context.go('/login');
            },
          ),
        ],
      ),
      body: Column(
        children: [
          const DuoHeader(title: 'Xin chào!', subtitle: 'Chọn tính năng bên dưới'),
          Expanded(
            child: GridView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: tiles.length,
              gridDelegate:
              const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2, mainAxisExtent: 120, crossAxisSpacing: 12, mainAxisSpacing: 12),
              itemBuilder: (_, i) {
                final t = tiles[i];
                return InkWell(
                  borderRadius: BorderRadius.circular(20),
                  onTap: () => context.push(t.route),
                  child: Card(
                    child: Padding(
                      padding: const EdgeInsets.all(14),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(t.emoji, style: const TextStyle(fontSize: 28)),
                          const Spacer(),
                          Text(t.title, style: const TextStyle(fontWeight: FontWeight.w800)),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _Tile {
  final String title;
  final String emoji;
  final String route;
  _Tile(this.title, this.emoji, this.route);
}
