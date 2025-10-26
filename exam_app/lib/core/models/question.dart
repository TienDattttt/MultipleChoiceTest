
enum Difficulty { easy, medium, hard }

class AnswerOption {
  final String id;
  final String content;
  AnswerOption({required this.id, required this.content});
}

class Question {
  final String id;
  final String subjectId;
  final String chapterId;
  final String partId;
  final String content;
  final List<AnswerOption> options;
  final String correctOptionId;
  final Difficulty difficulty;

  Question({
    required this.id,
    required this.subjectId,
    required this.chapterId,
    required this.partId,
    required this.content,
    required this.options,
    required this.correctOptionId,
    required this.difficulty,
  });

  Question copyWith({String? content, List<AnswerOption>? options, String? correctOptionId, Difficulty? difficulty}) =>
      Question(
        id: id,
        subjectId: subjectId,
        chapterId: chapterId,
        partId: partId,
        content: content ?? this.content,
        options: options ?? this.options,
        correctOptionId: correctOptionId ?? this.correctOptionId,
        difficulty: difficulty ?? this.difficulty,
      );
}
