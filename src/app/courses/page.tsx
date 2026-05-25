import { redirect } from "next/navigation";

// /courses redirects to /learn
export default function CoursesPage() {
  redirect("/learn");
}
