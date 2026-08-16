import content from "./processedContent.json";
import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Drift Digitally | Insights",
  description: "Growth tips, design thinking, and digital strategy from our team.",
};

export default function InsightsPage() {
  return <PageShell content={content} />;
}
