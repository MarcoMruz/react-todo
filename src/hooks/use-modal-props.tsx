import React from 'react';
import { config } from '../components/common/modal/modal.config';

type ModalStyleProps = {
  size?: keyof typeof config.size;
  closeOnOverlayClick: boolean;
  children?: React.ReactNode;
  onClose: () => void;
};

const ModalContext = React.createContext({
  size: 'md' as keyof typeof config.size,
  closeOnOverlayClick: true,
  onClose: () => {},
});

function ModalProvider({
  children,
  size = 'md',
  closeOnOverlayClick,
  onClose,
}: ModalStyleProps) {
  const memoSize = React.useMemo(
    () => ({ size, onClose, closeOnOverlayClick }),
    [size, onClose, closeOnOverlayClick]
  );

  return (
    <ModalContext.Provider value={memoSize}>{children}</ModalContext.Provider>
  );
}

const useModalProps = () => React.useContext(ModalContext);

export { ModalProvider, useModalProps };
