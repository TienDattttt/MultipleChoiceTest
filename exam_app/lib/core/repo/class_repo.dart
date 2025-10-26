import '../models/classroom.dart';

abstract class ClassRepo {
  Future<List<ClassRoom>> getClasses();
  Future<ClassRoom> createClass(ClassRoom c);
  Future<ClassRoom> updateClass(ClassRoom c);
  Future<void> deleteClass(String id);
}
