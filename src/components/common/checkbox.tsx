import { checkboxConfig } from './config';

type Props = {
  isChecked?: boolean;
  disabled?: boolean;
  size?: keyof typeof checkboxConfig.size;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({
  isChecked,
  disabled,
  size = 'sm',
  onChange,
}: Props) => {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      disabled={disabled}
      onChange={onChange}
      className={`checkbox ${checkboxConfig.size[size]}`}
    />
  );
};
