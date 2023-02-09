import { classNames } from '../../helpers/utils.helpers';
import { textConfig } from './config';

type Props = {
  children?: React.ReactNode;
  className?: string;
  size?: keyof typeof textConfig.size;
  weight?: keyof typeof textConfig.weight;
  color?: keyof typeof textConfig.color;
  align?: keyof typeof textConfig.align;
} & React.HTMLAttributes<HTMLHeadingElement>;

export const Heading = ({
  children,
  className = '',
  size = 'xl',
  weight = 'normal',
  color = 'black',
  align = 'left',
  ...props
}: Props) => {
  const classnames = classNames(
    textConfig.size[size],
    textConfig.weight[weight],
    textConfig.color[color],
    textConfig.align[align],
    className
  );

  return (
    <h1 className={classnames} {...props}>
      {children}
    </h1>
  );
};
