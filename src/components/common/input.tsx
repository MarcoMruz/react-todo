type Props = {
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  variant?: 'bordered' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  disabled,
  invalid,
  variant,
  size,
  onChange,
  ...props
}: Props) => {
  return (
    <input
      aria-invalid={invalid}
      disabled={disabled}
      onChange={onChange}
      className={`input input-${variant} input-${size} ${
        invalid ? 'input-error' : ''
      }`}
      {...props}
    />
  );
};
