type Props = {
  children?: React.ReactNode;
  className?: string;
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl';
  weight?:
    | 'thin'
    | 'extralight'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'black';
  color?:
    | 'gray'
    | 'red'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'indigo'
    | 'purple'
    | 'pink';
  align?: 'left' | 'center' | 'right' | 'justify';
};

export const Heading = ({
  children,
  className,
  size,
  weight,
  color,
  align,
}: Props) => {
  return (
    <h1
      className={`text-${size} font-${weight} text-${color}-700 ${
        align ? `text-${align}` : ``
      } ${className}`}
    >
      {children}
    </h1>
  );
};
