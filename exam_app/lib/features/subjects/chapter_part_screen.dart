// import 'package:flutter/material.dart';
// import 'package:flutter_riverpod/flutter_riverpod.dart';
// import '../../providers.dart';
// import '../../core/models/subject.dart';
// import '../../core/models/chapter.dart';
// import '../../core/models/part.dart';
// import '../../core/repo/subject_repo.dart';
// import '../../core/ui/duo_widgets.dart';
//
// class ChapterPartScreen extends ConsumerStatefulWidget {
//   final String subjectId;
//   const ChapterPartScreen({super.key, required this.subjectId});
//
//   @override
//   ConsumerState<ChapterPartScreen> createState() => _ChapterPartScreenState();
// }
//
// class _ChapterPartScreenState extends ConsumerState<ChapterPartScreen> {
//   String? expandedChapterId;
//
//   @override
//   Widget build(BuildContext context) {
//     final repo = ref.watch(subjectRepoProvider);
//
//     return DuoScaffold(
//       title: 'Cấu trúc môn học',
//       subtitle: 'Chương & phần theo dạng mở rộng',
//       body: FutureBuilder(
//         future: Future.wait([
//           repo.getSubjects(),
//           repo.getChapters(widget.subjectId),
//         ]),
//         builder: (_, snap) {
//           if (!snap.hasData) return const Center(child: CircularProgressIndicator());
//
//           final subjects = (snap.data![0] as List<Subject>);
//           final subject = subjects.firstWhere((e) => e.id == widget.subjectId);
//           final chapters = (snap.data![1] as List<Chapter>);
//
//           return Column(
//             children: [
//               DuoHeader(
//                 title: subject.name,
//                 subtitle: 'Danh sách chương và phần',
//                 trailing: IconButton(
//                   tooltip: 'Thêm chương',
//                   icon: const Icon(Icons.add_circle_outline, color: Colors.white),
//                   onPressed: () => _openChapterDialog(context, repo, subject.id),
//                 ),
//               ),
//               Expanded(
//                 child: chapters.isEmpty
//                     ? const DuoEmpty(text: 'Chưa có chương nào', emoji: '📄')
//                     : ListView.builder(
//                   padding: const EdgeInsets.symmetric(vertical: 8),
//                   itemCount: chapters.length,
//                   itemBuilder: (_, i) {
//                     final c = chapters[i];
//                     final isExpanded = expandedChapterId == c.id;
//
//                     return Card(
//                       margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
//                       shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
//                       elevation: 0,
//                       child: ExpansionTile(
//                         tilePadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
//                         initiallyExpanded: isExpanded,
//                         title: Text(
//                           c.name,
//                           style: const TextStyle(fontWeight: FontWeight.w700),
//                         ),
//                         leading: const Icon(Icons.menu_book_outlined),
//                         trailing: Row(mainAxisSize: MainAxisSize.min, children: [
//                           IconButton(
//                             tooltip: 'Sửa chương',
//                             icon: const Icon(Icons.edit_outlined),
//                             onPressed: () => _openChapterDialog(context, repo, subject.id, editing: c),
//                           ),
//                           IconButton(
//                             tooltip: 'Xoá chương',
//                             icon: const Icon(Icons.delete_outline, color: Colors.redAccent),
//                             onPressed: () async {
//                               await repo.deleteChapter(c.id);
//                               setState(() {});
//                             },
//                           ),
//                           const Icon(Icons.expand_more),
//                         ]),
//                         onExpansionChanged: (expanded) {
//                           setState(() {
//                             expandedChapterId = expanded ? c.id : null;
//                           });
//                         },
//                         children: [
//                           FutureBuilder<List<Part>>(
//                             future: repo.getParts(c.id),
//                             builder: (_, snapP) {
//                               if (!snapP.hasData) {
//                                 return const Padding(
//                                   padding: EdgeInsets.all(8.0),
//                                   child: CircularProgressIndicator(),
//                                 );
//                               }
//                               final parts = snapP.data!;
//                               if (parts.isEmpty) {
//                                 return Padding(
//                                   padding: const EdgeInsets.only(bottom: 12),
//                                   child: DuoEmpty(
//                                     text: 'Chưa có phần nào trong chương này',
//                                     emoji: '🧩',
//                                     action: TextButton.icon(
//                                       onPressed: () => _openPartDialog(context, repo, c),
//                                       icon: const Icon(Icons.add),
//                                       label: const Text('Thêm phần'),
//                                     ),
//                                   ),
//                                 );
//                               }
//
//                               return Column(
//                                 children: [
//                                   for (final p in parts)
//                                     ListTile(
//                                       dense: true,
//                                       leading: const Icon(Icons.view_agenda_outlined),
//                                       title: Text(p.name),
//                                       trailing: Wrap(
//                                         spacing: 4,
//                                         children: [
//                                           IconButton(
//                                             tooltip: 'Sửa phần',
//                                             icon: const Icon(Icons.edit_outlined),
//                                             onPressed: () => _openPartDialog(context, repo, c, editing: p),
//                                           ),
//                                           IconButton(
//                                             tooltip: 'Xoá phần',
//                                             icon: const Icon(Icons.delete_outline, color: Colors.redAccent),
//                                             onPressed: () async {
//                                               await repo.deletePart(p.id);
//                                               setState(() {});
//                                             },
//                                           ),
//                                         ],
//                                       ),
//                                     ),
//                                   Padding(
//                                     padding: const EdgeInsets.only(left: 56, bottom: 12),
//                                     child: TextButton.icon(
//                                       onPressed: () => _openPartDialog(context, repo, c),
//                                       icon: const Icon(Icons.add_circle_outline),
//                                       label: const Text('Thêm phần mới'),
//                                     ),
//                                   ),
//                                 ],
//                               );
//                             },
//                           ),
//                         ],
//                       ),
//                     );
//                   },
//                 ),
//               ),
//             ],
//           );
//         },
//       ),
//     );
//   }
//
//   Future<void> _openChapterDialog(BuildContext context, SubjectRepo repo, String subjectId, {Chapter? editing}) async {
//     final c = TextEditingController(text: editing?.name ?? '');
//     await showDialog(
//       context: context,
//       builder: (_) => AlertDialog(
//         title: Text(editing == null ? 'Thêm chương' : 'Sửa chương'),
//         content: TextField(
//           controller: c,
//           decoration: const InputDecoration(labelText: 'Tên chương'),
//         ),
//         actions: [
//           TextButton(onPressed: () => Navigator.pop(context), child: const Text('Hủy')),
//           FilledButton(
//             onPressed: () async {
//               if (c.text.trim().isEmpty) return;
//               if (editing == null) {
//                 await repo.createChapter(Chapter(id: '', subjectId: subjectId, name: c.text.trim()));
//               } else {
//                 await repo.updateChapter(Chapter(id: editing.id, subjectId: subjectId, name: c.text.trim()));
//               }
//               if (mounted) setState(() {});
//               if (mounted) Navigator.pop(context);
//             },
//             child: const Text('Lưu'),
//           ),
//         ],
//       ),
//     );
//   }
//
//   Future<void> _openPartDialog(BuildContext context, SubjectRepo repo, Chapter chapter, {Part? editing}) async {
//     final c = TextEditingController(text: editing?.name ?? '');
//     await showDialog(
//       context: context,
//       builder: (_) => AlertDialog(
//         title: Text(editing == null ? 'Thêm phần' : 'Sửa phần'),
//         content: TextField(controller: c, decoration: const InputDecoration(labelText: 'Tên phần')),
//         actions: [
//           TextButton(onPressed: () => Navigator.pop(context), child: const Text('Hủy')),
//           FilledButton(
//             onPressed: () async {
//               if (c.text.trim().isEmpty) return;
//               if (editing == null) {
//                 await repo.createPart(Part(id: '', chapterId: chapter.id, name: c.text.trim()));
//               } else {
//                 await repo.updatePart(Part(id: editing.id, chapterId: chapter.id, name: c.text.trim()));
//               }
//               if (mounted) setState(() {});
//               if (mounted) Navigator.pop(context);
//             },
//             child: const Text('Lưu'),
//           ),
//         ],
//       ),
//     );
//   }
// }
