import { useEffect } from 'react';

interface Props {
  setShowPopup: (val: boolean) => void;
  children?: JSX.Element | JSX.Element[];
  opaqueBackground?: boolean;
  stopPropagation?: boolean;
  showCloseIcon?: boolean;
}

export default function PopupOverlay({
  setShowPopup,
  children,
  opaqueBackground = true,
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
        'fixed top-0 bottom-0 left-0 right-0 m-auto bg-black z-20' +
        (opaqueBackground ? ' bg-opacity-90' : ' bg-opacity-0')
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
