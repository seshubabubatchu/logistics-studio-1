import type { Metadata } from "next";
import ResourcesView from "@/components/ResourcesView";

export const metadata: Metadata = {
  title: "Resources",
  description: "Blog posts, white papers, webinars and case studies on logistics technology and AI.",
};

export default function Page() {
  return <ResourcesView />;
}
