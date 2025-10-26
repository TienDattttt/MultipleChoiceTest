import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'theme.dart';
import 'app_router.dart';
import 'providers.dart';

void main() => runApp(const ProviderScope(child: ExamApp()));

class ExamApp extends ConsumerStatefulWidget {
  const ExamApp({super.key});

  @override
  ConsumerState<ExamApp> createState() => _ExamAppState();
}

class _ExamAppState extends ConsumerState<ExamApp> {
  late Future<void> _initFuture;

  @override
  void initState() {
    super.initState();
    // Auto-Login: đọc JWT (nếu có) rồi gọi /me
    _initFuture = bootstrapAuth(ref);
  }

  @override
  Widget build(BuildContext context) {
    final router = ref.watch(routerProvider);

    return FutureBuilder(
      future: _initFuture,
      builder: (context, snapshot) {
        // Splash đơn giản trong lúc /me
        if (snapshot.connectionState != ConnectionState.done) {
          return MaterialApp(
            debugShowCheckedModeBanner: false,
            theme: buildTheme(),
            home: const Scaffold(
              body: Center(child: CircularProgressIndicator()),
            ),
          );
        }

        return MaterialApp.router(
          debugShowCheckedModeBanner: false,
          title: 'Thi trắc nghiệm',
          theme: buildTheme(),
          routerConfig: router,
        );
      },
    );
  }
}
