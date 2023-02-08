type Props = {
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'bordered' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = ({
  disabled,
  invalid,
  variant,
  size,
  onChange,
  ...props
}: Props) => {
  return (
    <textarea
      disabled={disabled}
      onChange={onChange}
      className={`textarea textarea-${variant} textarea-${size} ${
        invalid ? 'textarea-error' : ''
      }`}
      {...props}
    />
  );
};
