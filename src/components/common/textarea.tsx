import { classNames } from '../../helpers/utils.helpers';
import { textareaConfig } from './config';

type Props = {
  disabled?: boolean;
  invalid?: boolean;
  variant?: keyof typeof textareaConfig.variant;
  size?: keyof typeof textareaConfig.size;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = ({
  disabled,
  invalid,
  variant = 'unstyled',
  size = 'md',
  onChange,
  ...props
}: Props) => {
  const classnames = classNames(
    `textarea`,
    textareaConfig.variant[variant],
    textareaConfig.size[size],
    invalid ? `textarea-error` : ``,
    props.className || ``
  );
  return (
    <textarea
      disabled={disabled}
      onChange={onChange}
      className={classnames}
      {...props}
    />
  );
};

/*

Textarea tailwind classes
variant: textarea-bordered, textarea-ghost
size: textarea-xs, textarea-sm, textarea-md, textarea-lg

*/
