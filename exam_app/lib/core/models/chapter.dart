class Chapter {
  final String id;
  final String name;

  Chapter({required this.id, required this.name});

  factory Chapter.fromJson(Map<String, dynamic> json) {
    return Chapter(
      id: json['id'].toString(),
      name: json['name'] as String,
    );
  }
}