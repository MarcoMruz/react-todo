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
  color?:
    | 'gray'
    | 'red'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'indigo'
    | 'purple'
    | 'pink';
  rounded?: 'sm' | 'md' | 'lg' | 'full' | 'none';
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner' | 'none';
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = ({
  children,
  className,
  size,
  color,
  rounded,
  shadow,
  disabled,
  onClick,
}: Props) => {
  return (
    <button
      className={`bg-${color}-500 text-white font-bold py-2 px-4 rounded ${
        rounded ? `rounded-${rounded}` : ``
      } ${shadow ? `shadow-${shadow}` : ``} ${className} ${
        disabled ? `opacity-50 cursor-not-allowed` : ``
      }}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
