class Exam {
  final int id;
  final int? courseId;
  final String name;
  final int durationMinutes;
  final double? score;

  Exam({
    required this.id,
    required this.courseId,
    required this.name,
    required this.durationMinutes,
    required this.score,
  });

  factory Exam.fromJson(Map<String, dynamic> json) {
    return Exam(
      id: json['id'] as int,
      courseId: json['courseId'] as int?,
      name: json['title'] ?? json['name'] ?? '',
      durationMinutes: json['durationMin'] ?? json['durationMinutes'] ?? 0,
      score: json['score'] == null
          ? null
          : (json['score'] as num).toDouble(),
    );
  }
}


class ExamSchedule {
  final String id;
  final String examId;
  final List<String> classIds;
  final DateTime startTime;
  final DateTime endTime;

  ExamSchedule({
    required this.id,
    required this.examId,
    required this.classIds,
    required this.startTime,
    required this.endTime,
  });
}
