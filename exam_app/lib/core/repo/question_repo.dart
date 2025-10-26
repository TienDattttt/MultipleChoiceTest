
import '../models/question.dart';

abstract class QuestionRepo {
  Future<List<Question>> getQuestions({String? subjectId, String? chapterId, String? partId});
  Future<Question> createQuestion(Question q);
  Future<Question> updateQuestion(Question q);
  Future<void> deleteQuestion(String id);
}
