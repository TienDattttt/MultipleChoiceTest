import '../models/classroom.dart';

abstract class StudentRepo {
  Future<List<Student>> getStudents();
  Future<Student> createStudent(Student s);
  Future<Student> updateStudent(Student s);
  Future<void> deleteStudent(String id);
  Future<List<Student>> searchByKeyword(String keyword);
}
