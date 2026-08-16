import content from "./processedContent.json";
import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Drift Digitally | Contact",
  description: "Get in touch with Drift Digitally to start your project.",
};

export default function ContactPage() {
  return <PageShell content={content} />;
}
