package com.acme.exam_service.question.service;

import com.acme.exam_service.course.repo.CourseRepository;
import com.acme.exam_service.question.dto.QuestionImportDtos.ImportReport;
import com.acme.exam_service.question.dto.QuestionImportDtos.RowError;
import com.acme.exam_service.question.entity.Answer;
import com.acme.exam_service.question.entity.Question;

import com.acme.exam_service.question.repo.AnswerRepository;
import com.acme.exam_service.question.repo.QuestionRepository;

import com.acme.exam_service.course.entity.Cours;
import com.acme.exam_service.course.entity.Chapter;
import com.acme.exam_service.course.entity.Section;

import com.acme.exam_service.course.repo.ChapterRepository;
import com.acme.exam_service.course.repo.SectionRepository;

import com.acme.exam_service.users.entity.User;
import com.acme.exam_service.users.repo.UserRepository;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.transaction.Transactional;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class QuestionImportService {

    private final QuestionRepository questionRepo;
    private final AnswerRepository answerRepo;
    private final CourseRepository coursRepo;           // 👈 đổi tên repo cho khớp entity Cours
    private final ChapterRepository chapterRepo;
    private final SectionRepository sectionRepo;
    private final UserRepository userRepo;

    public QuestionImportService(QuestionRepository questionRepo,
                                 AnswerRepository answerRepo,
                                 CourseRepository coursRepo,
                                 ChapterRepository chapterRepo,
                                 SectionRepository sectionRepo,
                                 UserRepository userRepo) {
        this.questionRepo = questionRepo;
        this.answerRepo = answerRepo;
        this.coursRepo = coursRepo;
        this.chapterRepo = chapterRepo;
        this.sectionRepo = sectionRepo;
        this.userRepo = userRepo;
    }

    @Transactional
    public ImportReport importCsv(MultipartFile file, Integer createdByUserId) {
        var report = new ImportReport();

        try (var reader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
            CSVFormat fmt = CSVFormat.Builder.create()
                    .setHeader("courseId","chapterId","sectionId","content","difficulty",
                            "optionA","optionB","optionC","optionD","correct")
                    .setSkipHeaderRecord(true)
                    .setTrim(true)
                    .build();

            CSVParser parser = new CSVParser(reader, fmt);
            int rowNum = 0;

            for (CSVRecord r : parser) {
                rowNum++;
                report.totalRows++;

                try {
                    // -------- 1) đọc & ép kiểu --------
                    int courseId = parseInt(r, "courseId");
                    Integer chapterId = parseNullableInt(r, "chapterId");
                    Integer sectionId = parseNullableInt(r, "sectionId");
                    String content = required(r, "content");
                    int difficulty = parseInt(r, "difficulty");

                    String optA = r.get("optionA"); String optB = r.get("optionB");
                    String optC = r.get("optionC"); String optD = r.get("optionD");
                    String correct = required(r, "correct").toUpperCase();

                    // -------- 2) validate cơ bản --------
                    if (difficulty < 1 || difficulty > 3) {
                        throw new IllegalArgumentException("difficulty phải trong [1..3]");
                    }
                    if (!coursRepo.existsById(courseId)) {
                        throw new IllegalArgumentException("courseId không tồn tại: " + courseId);
                    }
                    if (chapterId != null && !chapterRepo.existsById(chapterId)) {
                        throw new IllegalArgumentException("chapterId không tồn tại: " + chapterId);
                    }
                    if (sectionId != null && !sectionRepo.existsById(sectionId)) {
                        throw new IllegalArgumentException("sectionId không tồn tại: " + sectionId);
                    }
                    int nonEmpty = countNonEmpty(optA,optB,optC,optD);
                    if (nonEmpty < 2) throw new IllegalArgumentException("Tối thiểu 2 phương án không rỗng");
                    if (!List.of("A","B","C","D").contains(correct)) {
                        throw new IllegalArgumentException("correct phải là A/B/C/D");
                    }

                    // -------- 3) load entities (ManyToOne) --------
                    Cours course = coursRepo.getReferenceById(courseId);
                    Chapter chapter = (chapterId == null) ? null : chapterRepo.getReferenceById(chapterId);
                    Section section = (sectionId == null) ? null : sectionRepo.getReferenceById(sectionId);

                    int creatorId = (createdByUserId != null ? createdByUserId : 1);
                    User creator = userRepo.getReferenceById(creatorId);

                    // -------- 4) tạo Question --------
                    Question q = new Question();
                    q.setCourse(course);
                    q.setChapter(chapter);
                    q.setSection(section);
                    q.setContent(content);
                    q.setDifficulty((short) difficulty);
                    q.setCreatedBy(creator);
                    q.setCreatedAt(Instant.now());

                    q = questionRepo.save(q);

                    // -------- 5) tạo Answers --------
                    List<Answer> answers = new ArrayList<>();

                    if (isNonEmpty(optA)) {
                        Answer a = new Answer();
                        a.setQuestion(q);
                        a.setContent(optA);
                        a.setIsCorrect("A".equals(correct));
                        answers.add(a);
                    }
                    if (isNonEmpty(optB)) {
                        Answer a = new Answer();
                        a.setQuestion(q);
                        a.setContent(optB);
                        a.setIsCorrect("B".equals(correct));
                        answers.add(a);
                    }
                    if (isNonEmpty(optC)) {
                        Answer a = new Answer();
                        a.setQuestion(q);
                        a.setContent(optC);
                        a.setIsCorrect("C".equals(correct));
                        answers.add(a);
                    }
                    if (isNonEmpty(optD)) {
                        Answer a = new Answer();
                        a.setQuestion(q);
                        a.setContent(optD);
                        a.setIsCorrect("D".equals(correct));
                        answers.add(a);
                    }

                    // -------- 6) đảm bảo đúng 1 đáp án đúng --------
                    long correctCount = answers.stream()
                            .filter(a -> Boolean.TRUE.equals(a.getIsCorrect()))
                            .count();
                    if (correctCount != 1) {
                        throw new IllegalArgumentException("Phải có đúng 1 đáp án đúng (correct)");
                    }

                    answerRepo.saveAll(answers);
                    report.imported++;

                } catch (Exception rowEx) {
                    report.failed++;
                    report.errors.add(new RowError(rowNum, rowEx.getMessage()));
                    // tiếp tục dòng sau
                }
            }

        } catch (Exception e) {
            report.failed = report.totalRows;
            report.errors.add(new RowError(0, "Lỗi đọc file: " + e.getMessage()));
        }

        return report;
    }

    // ========= Helpers =========

    private static String required(CSVRecord r, String col) {
        String v = r.get(col);
        if (v == null || v.trim().isEmpty())
            throw new IllegalArgumentException("Thiếu cột " + col);
        return v.trim();
    }

    private static int parseInt(CSVRecord r, String col) {
        try { return Integer.parseInt(required(r, col)); }
        catch (NumberFormatException e) {
            throw new IllegalArgumentException("Cột " + col + " phải là số nguyên");
        }
    }

    private static Integer parseNullableInt(CSVRecord r, String col) {
        String v = r.get(col);
        if (v == null || v.trim().isEmpty()) return null;
        try { return Integer.parseInt(v.trim()); }
        catch (NumberFormatException e) {
            throw new IllegalArgumentException("Cột " + col + " phải là số nguyên hoặc để trống");
        }
    }

    private static boolean isNonEmpty(String s) {
        return s != null && !s.trim().isEmpty();
    }

    private static int countNonEmpty(String... arr) {
        int c = 0; for (String s : arr) if (isNonEmpty(s)) c++; return c;
    }
}
