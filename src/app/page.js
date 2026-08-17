import content from "./processedContent.json";
import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Drift Digitally | Home",
  description:
    "Drift Digitally — We Build Brands That Grow, Look Premium, and Never Blend In.",
};

export default function HomePage() {
  return <PageShell content={content} />;
}
