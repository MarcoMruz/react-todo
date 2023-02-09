import { Button, ButtonProps } from './button';

export const FloatingButton = (props: ButtonProps) => {
  return (
    <div className="fixed bottom-10 right-10">
      <Button {...props} />
    </div>
  );
};
