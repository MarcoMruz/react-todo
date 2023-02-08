type Props = {
  children?: React.ReactNode;
  className?: string;
  spacing?: number;
  rounded?: 'sm' | 'md' | 'lg' | 'full' | 'none';
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner' | 'none';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
};

export const VStack = ({
  children,
  className,
  spacing,
  rounded,
  shadow,
  justify,
  align,
}: Props) => {
  return (
    <div
      className={`flex flex-col ${className}
      ${spacing ? `space-y-${spacing}` : ``}
      ${rounded ? `rounded-${rounded}` : ``}
      ${shadow ? `shadow-${shadow}` : ``}
      ${justify ? `justify-${justify}` : ``}
      ${align ? `items-${align}` : ``}
      `}
    >
      {children}
    </div>
  );
};
