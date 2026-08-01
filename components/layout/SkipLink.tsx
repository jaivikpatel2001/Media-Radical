/**
 * First focusable element on the page. Visible only when focused — the styles
 * live in styles/utilities.css.
 */
export function SkipLink() {
  return (
    <a href="#main" className="skipLink">
      Skip to content
    </a>
  );
}
