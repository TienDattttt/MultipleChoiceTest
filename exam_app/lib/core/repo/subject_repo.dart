import '../models/subject.dart';
import '../models/chapter.dart';
import '../models/part.dart';

abstract class SubjectRepo {
  Future<List<Subject>> getSubjects();
  Future<Subject> createSubject(Subject s);
  Future<Subject> updateSubject(Subject s);
  Future<void> deleteSubject(String id);

  Future<List<Chapter>> getChapters(String subjectId);
  Future<Chapter> createChapter(Chapter c);
  Future<Chapter> updateChapter(Chapter c);
  Future<void> deleteChapter(String id);

  Future<List<Part>> getParts(String chapterId);
  Future<Part> createPart(Part p);
  Future<Part> updatePart(Part p);
  Future<void> deletePart(String id);
}
