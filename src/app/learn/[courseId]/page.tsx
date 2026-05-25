import { redirect, notFound } from "next/navigation";
import { getCourse } from "@/data/courses/index";

interface PageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CourseLearnPage({ params }: PageProps) {
  const { courseId } = await params;
  const course = getCourse(courseId);
  if (!course) notFound();

  const firstLesson = course.chapters[0]?.lessons[0];
  if (!firstLesson) notFound();

  redirect(`/learn/${courseId}/${firstLesson.id}`);
}
