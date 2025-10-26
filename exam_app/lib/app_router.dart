import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'providers.dart';
import 'features/auth/login_screen.dart';
import 'features/auth/register_screen.dart';
import 'features/dashboard/dashboard_screen.dart';
import 'features/taking/exam_select_subject_screen.dart';
import 'features/taking/take_exam_screen.dart';

final routerProvider = Provider<GoRouter>((ref) {
  final user = ref.watch(currentUserProvider);

  return GoRouter(
    initialLocation: '/login',
    redirect: (ctx, state) {
      final path = state.uri.path;
      final isAuthPage = path == '/login' || path == '/register';
      if (user == null && !isAuthPage) return '/login';
      if (user != null && isAuthPage) return '/';
      return null;
    },
    routes: [
      GoRoute(path: '/login', builder: (_, __) => const LoginScreen()),
      GoRoute(path: '/register', builder: (_, __) => const RegisterScreen()),
      GoRoute(path: '/', builder: (_, __) => const DashboardScreen()),
      // chọn kỳ thi (dành cho STUDENT)
      GoRoute(path: '/take/select', builder: (_, __) => const ExamSelectSubjectScreen()),
      // làm bài — nhận attemptId từ đường dẫn
      GoRoute(
        path: '/take/:attemptId',
        builder: (_, st) {
          final attemptIdStr = st.pathParameters['attemptId']!;
          final attemptId = int.tryParse(attemptIdStr) ?? -1;
          return TakeExamScreen(attemptId: attemptId);
        },
      ),
    ],
  );
});
