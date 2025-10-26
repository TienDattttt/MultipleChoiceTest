class Part {
  final String id;
  final String name;

  Part({required this.id, required this.name});

  factory Part.fromJson(Map<String, dynamic> json) {
    return Part(
      id: json['id'].toString(),
      name: json['name'] as String,
    );
  }
}