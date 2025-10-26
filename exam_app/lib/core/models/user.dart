class User {
  final int id;
  final String fullName;
  final String email;
  final String role;

  User({
    required this.id,
    required this.fullName,
    required this.email,
    required this.role,
  });

  factory User.fromJson(Map<String, dynamic> json) => User(
    id: json['userId'] as int,
    fullName: json['fullName'] as String,
    email: json['email'] as String,
    role: json['role'] as String,
  );
}
