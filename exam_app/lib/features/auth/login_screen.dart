import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../core/models/user.dart';
import '../../providers.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});
  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _email = TextEditingController();
  final _password = TextEditingController();
  bool loading = false;

  @override
  Widget build(BuildContext context) {
    final authRepo = ref.read(authRepoProvider);

    return Scaffold(
      backgroundColor: const Color(0xFFF7FAF5),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(28),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.school, color: Color(0xFF58CC02), size: 80),
              const SizedBox(height: 16),
              const Text(
                "Đăng nhập để bắt đầu học!",
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800),
              ),
              const SizedBox(height: 24),
              TextField(
                controller: _email,
                decoration: const InputDecoration(
                  labelText: 'Email',
                  prefixIcon: Icon(Icons.email_outlined),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _password,
                obscureText: true,
                decoration: const InputDecoration(
                  labelText: 'Mật khẩu',
                  prefixIcon: Icon(Icons.lock_outline),
                ),
              ),
              const SizedBox(height: 20),
              FilledButton.icon(
                onPressed: loading
                    ? null
                    : () async {
                  setState(() => loading = true);
                  try {
                    final data = await authRepo.login(
                        _email.text, _password.text);
                    // data có: token, expiresIn, id, fullName, role, email (bổ sung)
                    ref
                        .read(currentUserProvider.notifier)
                        .set(User.fromJson(data));
                    if (mounted) context.go('/');
                  } catch (e) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                          content: Text(
                              'Đăng nhập thất bại: ${e.toString()}')),
                    );
                  } finally {
                    setState(() => loading = false);
                  }
                },
                icon: const Icon(Icons.login),
                label: Text(loading ? 'Đang xử lý...' : 'Đăng nhập'),
              ),
              const SizedBox(height: 16),
              TextButton(
                onPressed: () => context.push('/register'),
                child: const Text('Chưa có tài khoản? Đăng ký ngay'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
