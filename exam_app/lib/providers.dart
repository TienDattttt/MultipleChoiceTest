import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'core/repo/auth_repo.dart';
import 'core/models/user.dart';
import 'core/repo/exam_repo.dart';

/// Repos
final authRepoProvider = Provider<AuthRepo>((ref) => AuthRepo());
final examApiProvider = Provider<ExamApi>((ref) => ExamApi());

/// App State: currentUser
class CurrentUser extends Notifier<User?> {
  @override
  User? build() => null;

  void set(User? u) => state = u;
  void logout() => state = null;
}

final currentUserProvider =
NotifierProvider<CurrentUser, User?>(CurrentUser.new);

/// Hàm bootstrap để Auto-Login khi mở app
Future<void> bootstrapAuth(WidgetRef ref) async {
  final repo = ref.read(authRepoProvider);
  final hasTkn = await repo.hasToken();
  if (!hasTkn) {
    ref.read(currentUserProvider.notifier).set(null);
    return;
  }
  try {
    final me = await repo.me(); // { id, fullName, email, role }
    ref.read(currentUserProvider.notifier).set(User.fromJson(me));
  } catch (_) {
    // token không hợp lệ → xóa JWT + state null
    await repo.logout();
    ref.read(currentUserProvider.notifier).set(null);
  }
}
