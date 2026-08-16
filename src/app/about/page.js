import content from "./processedContent.json";
import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Drift Digitally | About",
  description: "Learn about the Drift Digitally team and our philosophy.",
};

export default function AboutPage() {
  return <PageShell content={content} />;
}
