import { orpc } from "../lib/api";
export const progressOptions = () => orpc.learning.progress.queryOptions();
export const lessonOptions = (course: string, lesson: number, en: boolean) =>
  orpc.learning.lesson.queryOptions({ input: { course, lesson, en } });
export const adminOptions = () => orpc.learning.admin.queryOptions();
