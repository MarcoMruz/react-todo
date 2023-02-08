import { classNames } from '../../helpers/utils.helpers';
import { config, vstackConfig } from './config';

type Props = {
  children?: React.ReactNode;
  className?: string;
  spacing?: keyof typeof vstackConfig.spacing;
  rounded?: keyof typeof config.rounded;
  shadow?: keyof typeof config.shadow;
  justify?: keyof typeof vstackConfig.justify;
  align?: keyof typeof vstackConfig.align;
};

export const VStack = ({
  children,
  className = '',
  spacing = 0,
  rounded = 'none',
  shadow = 'none',
  justify = 'start',
  align = 'start',
}: Props) => {
  const classnames = classNames(
    `flex flex-col`,
    className,
    vstackConfig.spacing[spacing],
    vstackConfig.justify[justify],
    vstackConfig.align[align],
    config.rounded[rounded],
    config.shadow[shadow]
  );
  return <div className={classnames}>{children}</div>;
};
