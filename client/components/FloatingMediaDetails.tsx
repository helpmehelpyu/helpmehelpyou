import Image from 'next/future/image';
import { useEffect, useState } from 'react';
import { WorkSample } from '../types/WorkSample';

interface Props {
  mediaDetails: WorkSample;
  setMediaDetails: (val: WorkSample | null) => void;
}

export default function FloatingMediaDetails({
  mediaDetails,
  setMediaDetails,
}: Props) {
  const [ratio, setRatio] = useState(16 / 9);

  // disable background scrolling when the details overlay is visible
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
      onClick={() => setMediaDetails(null)}
    >
      <div className="fixed top-0 left-2 text-white text-xl md:text-3xl mt-2 ml-2 text-center duration-300 transition-colors hover:text-red-400 cursor-pointer">
        ✕
      </div>
      <div className="flex h-full left-0 right-0 top-0 bottom-0 m-auto z-20 space-x-5 p-10 justify-center items-center">
        <Image
          src={mediaDetails.source}
          alt="Loading"
          height={500}
          width={500 * ratio}
          quality={100}
          className="object-contain md2:m-5 md2:w-1/2 bg-white"
          onClick={(event) => event.stopPropagation()}
          onLoadingComplete={({ naturalWidth, naturalHeight }) =>
            setRatio(naturalWidth / naturalHeight)
          }
        ></Image>

        <div className="hidden md2:block max-h-[90vh] rounded-sm p-1 sm:p-5 text-white break-word text-sm md:text-2xl overflow-auto space-y-10 transparent-scrollbar">
          <h1 className="font-bold">{mediaDetails.title}</h1>
          <h2>{mediaDetails.description}</h2>
          <h3>{new Date(mediaDetails.uploadDate).toLocaleDateString()}</h3>
        </div>
      </div>
    </div>
  );
}
