abstract class StatsRepo {
  Future<Map<String, int>> registrationAndAttendance(); // {registered: x, attended: y}
}
