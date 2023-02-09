import { classNames } from '../../helpers/utils.helpers';
import { buttonConfig, config } from './config';

export type ButtonProps = {
  size?: keyof typeof buttonConfig.size;
  colorScheme?: keyof typeof buttonConfig.colorScheme;
  isLoading?: boolean;
  hasGlassEffect?: boolean;
  variant?: keyof typeof buttonConfig.variant;
  shadow?: keyof typeof config.shadow;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  className = '',
  size = 'md',
  shadow = 'none',
  disabled = false,
  colorScheme = 'neutral',
  hasGlassEffect = false,
  variant = 'none',
  isLoading = false,
  ...props
}: ButtonProps) => {
  const classnames = classNames(
    'btn',
    config.shadow[shadow],
    buttonConfig.size[size],
    buttonConfig.colorScheme[colorScheme],
    buttonConfig.variant[variant],
    hasGlassEffect ? 'glass' : '',
    className,
    disabled ? 'cursor-not-allowed opacity-1/2' : '',
    isLoading ? 'loading' : ''
  );

  return (
    <button className={classnames} {...props}>
      {children}
    </button>
  );
};
