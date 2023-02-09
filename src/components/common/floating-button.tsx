import { Button, ButtonProps } from './button';

export const FloatingButton = (props: ButtonProps) => {
  return (
    <div
      className="fixed bottom-10 right-10"
      title="CTRL+A shortcut also opens modal for you to add new TODO"
    >
      <Button {...props} />
    </div>
  );
};
