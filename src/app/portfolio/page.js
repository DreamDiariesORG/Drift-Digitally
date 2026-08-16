import content from "./processedContent.json";
import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Drift Digitally | Portfolio",
  description: "See our work — campaigns, brands, and digital experiences.",
};

export default function PortfolioPage() {
  return <PageShell content={content} />;
}
