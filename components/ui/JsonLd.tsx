/**
 * Renders a JSON-LD block.
 *
 * The payload is built on the server from the same `/data` records the page
 * renders, so the structured data cannot drift from the visible content —
 * which is both the point of it and what Google penalises when it fails.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The object is authored in this codebase, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
