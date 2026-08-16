import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FormHandler from "@/components/FormHandler";

/**
 * Shared page shell used by every route.
 * Accepts the processedContent JSON and renders:
 *   - page-scoped Tailwind CSS (cssHtml)
 *   - Navbar
 *   - raw page body (bodyHtml)
 *   - Footer
 *   - FormHandler (client-side interactivity)
 */
export default function PageShell({ content }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: content.cssHtml }} />
      <Navbar />
      <div dangerouslySetInnerHTML={{ __html: content.bodyHtml }} />
      <Footer />
      <FormHandler />
    </>
  );
}
