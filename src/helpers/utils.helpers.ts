import React from 'react';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
export const findElement =
  (element: React.FC<any>) =>
  (child: React.ReactElement<any, string | React.JSXElementConstructor<any>>) =>
    child.type === element;

export const childrenElements = (children: React.ReactNode) =>
  React.Children.map(children, (child) =>
    React.isValidElement(child) ? React.cloneElement(child) : null
  );
