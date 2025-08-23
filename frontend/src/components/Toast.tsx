import React from "react";

interface ToastProps {
  show: boolean;
  message: string;
}

const Toast: React.FC<ToastProps> = ({ show, message }) => {
  if (!show || !message) return null;
  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-[100] bg-green-600 text-white px-6 py-3 rounded shadow-lg font-semibold animate-fade-in transition-all duration-300">
      {message}
    </div>
  );
};

export default Toast;
