import Image from 'next/future/image';
import { useState } from 'react';
import { WorkSample } from '../../../types/WorkSample';
import PopupOverlay from '../../PopupOverlay';

interface Props {
  mediaDetails: WorkSample;
  setMediaDetails: (val: WorkSample | null) => void;
}

export default function FloatingMediaDetails({
  mediaDetails,
  setMediaDetails,
}: Props) {
  const [ratio, setRatio] = useState(16 / 9);

  return (
    <PopupOverlay
      setShowPopup={() => setMediaDetails(null)}
      stopPropagation={false}
    >
      <div className="flex h-full left-0 right-0 top-0 bottom-0 m-auto z-20 space-x-5 p-10 justify-center items-center">
        <Image
          src={mediaDetails.source}
          alt="Work Sample"
          height={500}
          width={500 * ratio}
          quality={100}
          className={
            'object-contain md2:m-5 select-none' +
            (ratio >= 1 ? ' w-2/3' : ' w-1/3')
          }
          onClick={(event) => event.stopPropagation()}
          onLoadingComplete={({ naturalWidth, naturalHeight }) =>
            setRatio(naturalWidth / naturalHeight)
          }
          placeholder={'blur'}
          blurDataURL={mediaDetails.source}
        ></Image>

        <div
          className="hidden sm:block max-h-[90vh] w-1/3 rounded-sm p-1 sm:p-5 text-white break-word text-sm md:text-2xl overflow-auto space-y-10 transparent-scrollbar"
          onClick={(event) => event.stopPropagation()}
        >
          <h1 className="font-bold">{mediaDetails.title}</h1>
          <h2>{mediaDetails.description}</h2>
          <h3>{new Date(mediaDetails.uploadDate).toLocaleDateString()}</h3>
        </div>
      </div>
    </PopupOverlay>
  );
}
