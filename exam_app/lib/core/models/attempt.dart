class Attempt {
  final String id;
  final String examId;
  final String studentId;
  final DateTime startedAt;
  final DateTime? submittedAt;
  final Map<String, String> answers; // questionId -> optionId

  Attempt({
    required this.id,
    required this.examId,
    required this.studentId,
    required this.startedAt,
    this.submittedAt,
    required this.answers,
  });

  Attempt copyWith({DateTime? submittedAt, Map<String, String>? answers}) =>
      Attempt(
        id: id,
        examId: examId,
        studentId: studentId,
        startedAt: startedAt,
        submittedAt: submittedAt ?? this.submittedAt,
        answers: answers ?? this.answers,
      );
}
