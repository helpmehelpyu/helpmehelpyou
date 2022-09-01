import { useEffect } from 'react';

interface Props {
  setShowPopup: (val: boolean) => void;
  children?: JSX.Element | JSX.Element[];
  backgroundOpacity?: number;
  stopPropagation?: boolean;
  showCloseIcon?: boolean;
}

export default function PopupOverlay({
  setShowPopup,
  children,
  backgroundOpacity = 90,
  stopPropagation = true,
  showCloseIcon = true,
}: Props) {
  useEffect(() => {
    const oldOverflowStyle = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return function addScrollBack() {
      document.documentElement.style.overflow = oldOverflowStyle;
    };
  }, []);

  return (
    <div
      className={
        'fixed w-full h-full bg-black z-10' + ` bg-opacity-${backgroundOpacity}`
      }
      onClick={() => setShowPopup(false)}
    >
      {showCloseIcon && (
        <div className="fixed top-0 left-2 text-white text-xs sm:text-3xl text-center duration-300 transition-colors hover:text-red-400 cursor-pointer select-none">
          ✕
        </div>
      )}
      <span
        onClick={(event) => {
          if (stopPropagation) event.stopPropagation();
        }}
      >
        {children}
      </span>
    </div>
  );
}
