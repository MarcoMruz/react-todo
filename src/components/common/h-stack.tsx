import React from 'react';
import Reference from 'yup/lib/Reference';
import { classNames } from '../../helpers/utils.helpers';
import { config, hstackConfig } from './config';

type Props = {
  children?: React.ReactNode;
  className?: string;
  spacing?: keyof typeof hstackConfig.spacing;
  rounded?: keyof typeof config.rounded;
  shadow?: keyof typeof config.shadow;
  justify?: keyof typeof hstackConfig.justify;
  align?: keyof typeof hstackConfig.align;
};

export const HStack = ({
  children,
  className = '',
  spacing = 0,
  rounded = 'none',
  shadow = 'none',
  justify = 'start',
  align = 'start',
}: Props) => {
  const classnames = classNames(
    `flex flex-row`,
    className,
    hstackConfig.spacing[spacing],
    hstackConfig.justify[justify],
    hstackConfig.align[align],
    config.rounded[rounded],
    config.shadow[shadow]
  );

  return <div className={classnames}>{children}</div>;
};
