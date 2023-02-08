import React from 'react';
import { classNames } from '../../helpers/utils.helpers';
import { tagConfig } from './config';

type Props = {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  size?: keyof typeof tagConfig.size;
  color?: keyof typeof tagConfig.colorScheme;
  label?: string;
  variant?: keyof typeof tagConfig.variant;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const Tag = ({
  children,
  className = '',
  label,
  title,
  size = 'md',
  color = 'neutral',
  variant = 'solid',
  onClick,
}: Props) => {
  const classnames = classNames(
    `badge`,
    tagConfig.size[size],
    tagConfig.colorScheme[color],
    tagConfig.variant[variant],
    className
  );

  return (
    <div title={title} className={classnames} onClick={onClick}>
      {label ? label : children}
    </div>
  );
};

/*
Tag tailwind classes

size: badge-xs, badge-sm, badge-md, badge-lg
color: badge-primary, badge-secondary, badge-accent, badge-ghost, badge-neutral
variant: badge-outline, badge-solid

*/
