import { ForwardedRef, forwardRef, HTMLAttributes, useEffect } from 'react';
import { config } from './modal.config';
import { ModalProvider } from '../../../hooks/use-modal-props';

export type ModalProps = {
  isOpen: boolean;
  closeOnOverlayClick?: boolean;
  children?: React.ReactNode;
  size?: keyof typeof config.size;
  position?: keyof typeof config.position;
  onClose: () => void;
} & HTMLAttributes<HTMLDivElement>;

export const Modal = forwardRef(
  (
    {
      children,
      isOpen,
      onClose,
      position = 'top',
      size = 'md',
      closeOnOverlayClick = true,
      ...divProps
    }: ModalProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    useEffect(() => {
      const handleCloseClick = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleCloseClick);

      return () => {
        window.removeEventListener('keydown', handleCloseClick);
      };
    }, [closeOnOverlayClick, onClose]);

    const classes = isOpen ? config.position[position] : 'hidden';

    const layout = (
      <ModalProvider
        size={size}
        onClose={onClose}
        closeOnOverlayClick={closeOnOverlayClick}
      >
        <div className={classes} {...divProps} ref={ref}>
          {children}
        </div>
      </ModalProvider>
    );

    return layout;
  }
);
