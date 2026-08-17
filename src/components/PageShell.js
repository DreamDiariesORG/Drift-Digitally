import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FormHandler from "@/components/FormHandler";
import DOMPurify from "isomorphic-dompurify";

/**
 * Shared page shell — used by every route.
 *
 * Architecture note:
 * Each page's content is pre-rendered HTML baked into processedContent.json
 * by an external build tool (StackFusion). The page shell wires that static
 * content into the Next.js App Router scaffold.
 *
 * CSS loading strategy (Strategy 3):
 *   - `content.cssUrl` points to a static CSS file in /public/styles/.
 *   - Using <link rel="stylesheet"> instead of <style dangerouslySetInnerHTML>
 *     allows the browser to cache the file across navigations (HTTP caching).
 *   - The shared CSS rules (extracted by deduplicate-shared-css.js) live in
 *     globals.css and are loaded once via layout.js for all routes.
 *
 * bodyHtml note:
 *   - dangerouslySetInnerHTML is intentional — the content is server-controlled
 *     pre-rendered HTML, not user input. It must not be sanitised or it will
 *     break component hydration markers and SVG inline elements.
 */
export default function PageShell({ content }) {
  return (
    <>
      {/* Per-page CSS — HTTP-cacheable static file */}
      {content.cssUrl && <link rel="stylesheet" href={content.cssUrl} />}
      <Navbar />
      {/* Pre-rendered page body from processedContent.json */}
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.bodyHtml) }} />
      <Footer />
      {/* Client-side interactivity: forms, modals, sliders, filters */}
      <FormHandler />
    </>
  );
}
