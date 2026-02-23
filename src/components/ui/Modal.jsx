import { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-md p-6 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2 className="font-display text-lg font-semibold text-slate-900 mb-4">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
