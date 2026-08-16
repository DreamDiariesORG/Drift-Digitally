import content from "./processedContent.json";
import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Drift Digitally | Services",
  description: "Services we offer — brand strategy, web design, performance marketing, and more.",
};

export default function ServicesPage() {
  return <PageShell content={content} />;
}
