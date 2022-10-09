import { MediaResult } from '../../../types/MediaResult';
import { WorkSample } from '../../../types/WorkSample';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MediaPaginationNav } from './WorkSamplePagination';
import useWindowDimensions from '../../../utils/windowSizeUtils';
import Link from 'next/link';

interface Props {
  media: MediaResult[] | WorkSample[];
  setMediaDetails: (val: WorkSample) => void;
}

export default function WorkSamplesTab({
  media,
  setMediaDetails: setMediaDetails,
}: Props) {
  const itemsPerPage = 25;
  const totalPages = Math.ceil(media.length / itemsPerPage);
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const [splicedList, setSplicedList] = useState(media);
  const { width } = useWindowDimensions();
  const [mediaItems, setMediaItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (width && width >= 970) {
      setSplicedList(
        media.slice(
          currentPageNumber * itemsPerPage,
          (currentPageNumber + 1) * itemsPerPage
        )
      );
    } else {
      setSplicedList(media);
    }
  }, [width, currentPageNumber, media]);

  useEffect(() => {
    setMediaItems(
      splicedList.reverse().map((media) => (
        <li
          key={media.id}
          className="select-none duration-500 hover:scale-105"
          onClick={() => setMediaDetails(media)}
        >
          <Image
            src={media.source.toString()}
            objectFit="cover"
            height={5000}
            width={5000}
            className="rounded-2xl aspect-square scale-[80%] md2:scale-100"
            alt="Loading..."
          ></Image>
          <div className="text-ellipsis overflow-hidden text-center text-xl md2:max-w-full">
            {media.title}
          </div>
        </li>
      ))
    );
  }, [splicedList, setMediaDetails]);

  if (media.length === 0) {
    return (
      <div className="w-full text-center">
        <h1 className="text-2xl lg:text-4xl font-light p-16 m-auto">
          No Work Samples
        </h1>
        <Link href={'/media/upload'}>
          <p className="inline-block text-3xl font-light underline p-2 hover:text-cyan-400 duration-200 hover:cursor-pointer">
            Add Some Here
          </p>
        </Link>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <ul className="grid md2:grid-cols-5 grid-cols-1 w-full gap-10 justify-center items-center">
        {mediaItems}
      </ul>
      <MediaPaginationNav
        currentPageNumber={currentPageNumber}
        totalPages={totalPages}
        setCurrentPageNumber={setCurrentPageNumber}
      ></MediaPaginationNav>
    </div>
  );
}
