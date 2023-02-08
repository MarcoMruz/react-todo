import { classNames } from '../../helpers/utils.helpers';
import { config, textConfig } from './config';

type Props = {
  children?: React.ReactNode;
  className?: string;
  size?: keyof typeof textConfig.size;
  weight?: keyof typeof textConfig.weight;
  color?: keyof typeof textConfig.color;
  align?: keyof typeof textConfig.align;
};

export const Text = ({
  children,
  className = '',
  size = 'base',
  weight = 'normal',
  color = 'black',
  align = 'left',
}: Props) => {
  const classnames = classNames(
    textConfig.size[size],
    textConfig.weight[weight],
    textConfig.color[color],
    textConfig.align[align],
    className
  );
  return <p className={classnames}>{children}</p>;
};
