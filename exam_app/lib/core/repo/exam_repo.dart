import 'package:dio/dio.dart';
import '../api/dio_client.dart';

/// Repo gọi API thật cho flow thi (exams + attempts).
class ExamApi {
  final Dio _dio = DioClient.instance();

  /// Lấy danh sách kỳ thi của học viên (đã được gán theo lớp)
  /// Backend: GET /api/exams/my -> trả List<ExamListItem>
  Future<List<Map<String, dynamic>>> getExams() async {
    try {
      final res = await _dio.get('/exams/my');
      if (res.data['success'] != true) return [];
      final List list = res.data['data'] as List? ?? const [];
      return list.cast<Map>().map((e) => Map<String, dynamic>.from(e)).toList();
    } on DioException catch (e) {
      // Nếu 401/403 thì coi như không có danh sách -> UI sẽ cho nhập examId
      if (e.response?.statusCode == 401 || e.response?.statusCode == 403) return [];
      rethrow;
    }
  }

  /// Bắt đầu làm bài -> trả về attemptId
  /// Backend: POST /api/attempts/start { examId }
  Future<int> startAttempt(int examId) async {
    final res = await _dio.post('/attempts/start', data: {'examId': examId});
    if (res.data['success'] != true) {
      throw Exception(res.data['message'] ?? 'Không thể bắt đầu bài thi');
    }
    final data = Map<String, dynamic>.from(res.data['data'] as Map);
    final int? attemptId = (data['attemptId'] ?? data['id'] ?? data['attempt_id']) as int?;
    if (attemptId == null) {
      throw Exception('Phản hồi startAttempt thiếu attemptId');
    }
    return attemptId;
  }

  /// Lấy chi tiết attempt: đề, câu hỏi, lựa chọn, đã chọn...
  /// Backend: GET /api/attempts/{id}
  Future<Map<String, dynamic>> getAttemptDetail(int attemptId) async {
    final res = await _dio.get('/attempts/$attemptId');
    if (res.data['success'] != true) {
      throw Exception(res.data['message'] ?? 'Không thể tải đề thi');
    }
    return Map<String, dynamic>.from(res.data['data'] as Map);
  }

  /// Lưu 1 đáp án (autosave)
  /// Backend: PUT /api/attempts/{attemptId}/answers
  /// body: { questionId, answerId/optionId }
  Future<void> saveAnswer({
    required int attemptId,
    required int questionId,
    required int optionId,
  }) async {
    final body = {
      'questionId': questionId,
      'selectedAnswerId': optionId,
    };

    final res = await _dio.put('/attempts/$attemptId/answers', data: body);
    if (res.data['success'] != true) {
      throw Exception(res.data['message'] ?? 'Lưu đáp án thất bại');
    }
  }

  /// Nộp bài
  /// Backend: POST /api/attempts/{attemptId}/submit
  Future<void> submitAttempt(int attemptId) async {
    final res = await _dio.post('/attempts/$attemptId/submit');
    if (res.data['success'] != true) {
      throw Exception(res.data['message'] ?? 'Nộp bài thất bại');
    }
  }
}
