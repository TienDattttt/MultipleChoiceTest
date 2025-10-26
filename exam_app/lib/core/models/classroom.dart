class Student {
  final String id;
  final String fullName;
  final String email;
  final String classId;

  Student({required this.id, required this.fullName, required this.email, required this.classId});

  Student copyWith({String? fullName, String? email, String? classId}) =>
      Student(id: id, fullName: fullName ?? this.fullName, email: email ?? this.email, classId: classId ?? this.classId);
}

class ClassRoom {
  final String id;
  final String name;
  final List<String> studentIds;

  ClassRoom({required this.id, required this.name, required this.studentIds});

  ClassRoom copyWith({String? name, List<String>? studentIds}) =>
      ClassRoom(id: id, name: name ?? this.name, studentIds: studentIds ?? this.studentIds);
}
