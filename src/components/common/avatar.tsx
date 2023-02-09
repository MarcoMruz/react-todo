import React from 'react';
import { classNames } from '../../helpers/utils.helpers';
import { avatarConfig } from './config';

type Props = {
  imgSrc?: string;
  alt: string;
  size?: keyof typeof avatarConfig.size;
  status?: keyof typeof avatarConfig.status;
  className?: string;
  mask?: keyof typeof avatarConfig.mask;
  rounded?: keyof typeof avatarConfig.rounded;
};

export const Avatar = ({
  imgSrc,
  alt,
  className = '',
  mask = 'none',
  rounded = 'none',
  size = 'md',
  status = 'none',
}: Props) => {
  const classnames = classNames(
    avatarConfig.size[size],
    avatarConfig.mask[mask],
    avatarConfig.rounded[rounded]
  );
  return (
    <div
      className={`avatar ${className} ${avatarConfig.status[status]} ${
        imgSrc ? '' : 'placeholder'
      }`}
    >
      <div className={classnames}>
        {imgSrc ? (
          <img src={imgSrc} alt={alt} />
        ) : (
          <span className="text-xl">JO</span>
        )}
      </div>
    </div>
  );
};
