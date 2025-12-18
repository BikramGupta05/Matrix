// Modal.jsx
import { FaX } from "react-icons/fa6";

export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-auto rounded-lg relative p-4">
        <button
          className="absolute top-2 right-2 p-2 rounded-full bg-gray-200"
          onClick={onClose}
        >
          <FaX className="w-3 h-3" />
        </button>
        {children}
      </div>
    </div>
  );
}
