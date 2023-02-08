type Props = {
  isChecked?: boolean;
  disabled?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({ isChecked, disabled, size, onChange }: Props) => {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      disabled={disabled}
      onChange={onChange}
      className={`checkbox checkbox-${size}`}
    />
  );
};
