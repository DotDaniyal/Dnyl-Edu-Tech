import { Course, Lesson, CourseCategory, CourseDifficulty } from '../types/edu';
import { COURSES_PART_1 } from './coursesPart1';
import { COURSES_PART_2 } from './coursesPart2';

export const COURSES: Course[] = [...COURSES_PART_1, ...COURSES_PART_2];

export const COURSE_CATEGORIES: ('All' | CourseCategory)[] = [
  'All',
  'Frontend',
  'Backend',
  'Programming',
  'Database',
  'Mobile',
  'AI & Tooling',
];

export const COURSE_DIFFICULTIES: ('All' | CourseDifficulty)[] = [
  'All',
  'Beginner',
  'Intermediate',
  'Advanced',
];

export function getCourseById(courseId: string): Course | undefined {
  return COURSES.find((c) => c.id === courseId || c.slug === courseId);
}

export function getLessonById(lessonId: string): { course: Course; lesson: Lesson; index: number } | undefined {
  for (const course of COURSES) {
    const idx = course.lessons.findIndex((l) => l.id === lessonId || l.slug === lessonId);
    if (idx !== -1) {
      return { course, lesson: course.lessons[idx], index: idx };
    }
  }
  return undefined;
}

export function getAllLessons(): { course: Course; lesson: Lesson }[] {
  const list: { course: Course; lesson: Lesson }[] = [];
  for (const course of COURSES) {
    for (const lesson of course.lessons) {
      list.push({ course, lesson });
    }
  }
  return list;
}

export function searchPlatform(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) {
    return {
      courses: COURSES,
      lessons: [] as { course: Course; lesson: Lesson }[],
    };
  }

  const matchedCourses = COURSES.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.shortName.toLowerCase().includes(q) ||
      c.tagline.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.topics.some((t) => t.toLowerCase().includes(q)) ||
      c.lessons.some(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.summary.toLowerCase().includes(q) ||
          l.tenPoints.definition.toLowerCase().includes(q) ||
          l.tenPoints.romanUrduExplanation.toLowerCase().includes(q)
      )
  );

  const matchedLessons = getAllLessons().filter(
    ({ course, lesson }) =>
      lesson.title.toLowerCase().includes(q) ||
      lesson.summary.toLowerCase().includes(q) ||
      lesson.tenPoints.definition.toLowerCase().includes(q) ||
      lesson.tenPoints.simpleExplanation.toLowerCase().includes(q) ||
      lesson.tenPoints.romanUrduExplanation.toLowerCase().includes(q) ||
      course.shortName.toLowerCase().includes(q)
  );

  return {
    courses: matchedCourses,
    lessons: matchedLessons,
  };
}
