import { useEffect } from 'react';

interface Props {
  setShowPopup: (val: boolean) => void;
  children?: JSX.Element | JSX.Element[];
}

export default function PopupOverlay({ setShowPopup, children }: Props) {
  useEffect(() => {
    const oldOverflowStyle = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return function addScrollBack() {
      document.documentElement.style.overflow = oldOverflowStyle;
    };
  }, []);

  return (
    <div
      className="fixed w-full h-full bg-black bg-opacity-90 z-10"
      onClick={() => setShowPopup(false)}
    >
      <div className="fixed top-0 left-2 text-white text-xl md:text-3xl mt-2 ml-2 text-center duration-300 transition-colors hover:text-red-400 cursor-pointer select-none">
        ✕
      </div>
      {children}
    </div>
  );
}
