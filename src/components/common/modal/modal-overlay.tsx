import { useModalProps } from '../../../hooks/use-modal-props';

export function ModalOverlay() {
  const { onClose, closeOnOverlayClick } = useModalProps();
  return (
    <div
      className="absolute top-0 left-0 h-full w-full backdrop-blur-sm bg-slate-500/50"
      onClick={() => {
        if (closeOnOverlayClick) {
          onClose();
        }
      }}
      aria-hidden
    />
  );
}
