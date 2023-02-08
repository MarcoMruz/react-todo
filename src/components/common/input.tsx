import { classNames } from '../../helpers/utils.helpers';
import { inputConfig } from './config';

type Props = {
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  variant?: keyof typeof inputConfig.variant;
  inputSize?: keyof typeof inputConfig.inputSize;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  disabled,
  invalid,
  variant = 'unstyled',
  inputSize = 'md',
  onChange,
  ...props
}: Props) => {
  const classnames = classNames(
    `input`,
    inputConfig.variant[variant],
    inputConfig.inputSize[inputSize],
    invalid ? `input-error` : ``,
    props.className || ``
  );

  return (
    <input
      aria-invalid={invalid}
      disabled={disabled}
      onChange={onChange}
      className={classnames}
      {...props}
    />
  );
};

/*

Input tailwind classes
variant: input-bordered, input-ghost
size: input-xs, input-sm, input-md, input-lg

*/
