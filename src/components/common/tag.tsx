import React from 'react';

type Props = {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'neutral';
  label?: string;
  variant?: 'outline' | 'solid';
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const Tag = ({
  children,
  className,
  label,
  title,
  size = 'md',
  color = 'neutral',
  variant = 'solid',
  onClick,
}: Props) => {
  return (
    <div
      title={title}
      className={`${className} badge badge-${size} ${
        color !== 'neutral' ? `badge-${color}` : ''
      } ${variant === 'outline' ? `badge-outline` : ''}`}
      onClick={onClick}
    >
      {label ? label : children}
    </div>
  );
};
