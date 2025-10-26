import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';

class DioClient {
  static Dio? _dio;

  static Dio instance() {
    if (_dio != null) return _dio!;
    final dio = Dio(
      BaseOptions(
        baseUrl: 'http://10.0.2.2:8080/api', // Đổi IP nếu chạy trên device thật
        connectTimeout: const Duration(seconds: 10),
        receiveTimeout: const Duration(seconds: 10),
        headers: {'Content-Type': 'application/json'},
      ),
    );

    // Interceptor tự gắn JWT
    dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final prefs = await SharedPreferences.getInstance();
        final token = prefs.getString('jwt');
        if (token != null && token.isNotEmpty) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        return handler.next(options);
      },
      onError: (e, handler) {
        if (e.response?.statusCode == 401) {
          // Có thể phát broadcast để logout nếu muốn
          // print('⚠️ Token hết hạn/không hợp lệ');
        }
        return handler.next(e);
      },
    ));

    _dio = dio;
    return dio;
  }
}
