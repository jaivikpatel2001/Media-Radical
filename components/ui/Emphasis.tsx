import { Fragment } from 'react';

interface EmphasisProps {
  /** Full heading text. */
  text: string;
  /** Substring within `text` to set in serif italic. */
  emphasis?: string;
}

/**
 * Sets one phrase of a heading in italic serif.
 *
 * The emphasis is expressed in data as a substring rather than as markup, so
 * content files stay plain strings — which matters because the same heading
 * is also fed to SplitText, read by screen readers as one continuous phrase,
 * and used in metadata.
 *
 * If the substring is absent the heading renders unchanged, so a typo in a
 * data file degrades quietly instead of losing the heading.
 */
export function Emphasis({ text, emphasis }: EmphasisProps) {
  if (!emphasis) return <>{text}</>;

  const index = text.indexOf(emphasis);
  if (index === -1) return <>{text}</>;

  return (
    <Fragment>
      {text.slice(0, index)}
      <em className="serif">{emphasis}</em>
      {text.slice(index + emphasis.length)}
    </Fragment>
  );
}
