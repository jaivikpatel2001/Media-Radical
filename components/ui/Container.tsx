import { cx } from '@/utils/cx';

type ContainerWidth = 'default' | 'narrow' | 'wide';

const WIDTH_CLASS: Record<ContainerWidth, string> = {
  default: 'container',
  narrow: 'containerNarrow',
  wide: 'containerWide',
};

interface ContainerProps {
  children: React.ReactNode;
  width?: ContainerWidth;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav';
}

/** Horizontal rhythm. The gutter is fluid; see styles/utilities.css. */
export function Container({
  children,
  width = 'default',
  className,
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag className={cx(WIDTH_CLASS[width], className)}>{children}</Tag>
  );
}
