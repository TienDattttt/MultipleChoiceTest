import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../api/dio_client.dart';

class AuthRepo {
  final Dio _dio = DioClient.instance();

  Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      final res = await _dio.post('/auth/login', data: {
        'email': email.trim(),
        'password': password,
      });
      if (res.data['success'] != true) {
        throw Exception(res.data['message'] ?? 'Đăng nhập thất bại');
      }
      final data = Map<String, dynamic>.from(res.data['data'] as Map);
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('jwt', data['accessToken'] as String);

      // backend không trả email trong /login → tự bổ sung để map sang User
      return {
        ...data,
        'email': email.trim(),
      };
    } on DioException catch (e) {
      final msg = e.response?.data is Map
          ? (e.response?.data['message'] ?? 'Lỗi kết nối')
          : (e.message ?? 'Lỗi kết nối');
      throw Exception(msg);
    }
  }

  Future<Map<String, dynamic>> register(
      String fullName, String email, String password) async {
    try {
      final res = await _dio.post('/auth/register', data: {
        'fullName': fullName.trim(),
        'email': email.trim(),
        'password': password,
      });
      if (res.data['success'] != true) {
        throw Exception(res.data['message'] ?? 'Đăng ký thất bại');
      }
      return Map<String, dynamic>.from(res.data['data'] as Map);
    } on DioException catch (e) {
      final msg = e.response?.data is Map
          ? (e.response?.data['message'] ?? 'Lỗi kết nối')
          : (e.message ?? 'Lỗi kết nối');
      throw Exception(msg);
    }
  }

  Future<Map<String, dynamic>> me() async {
    try {
      final res = await _dio.get('/auth/me');
      if (res.data['success'] != true) {
        throw Exception(res.data['message'] ?? 'Lấy thông tin thất bại');
      }
      return Map<String, dynamic>.from(res.data['data'] as Map);
    } on DioException catch (e) {
      final msg = e.response?.data is Map
          ? (e.response?.data['message'] ?? 'Lỗi kết nối')
          : (e.message ?? 'Lỗi kết nối');
      throw Exception(msg);
    }
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('jwt');
  }

  Future<bool> hasToken() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('jwt');
    return token != null && token.isNotEmpty;
  }
}
