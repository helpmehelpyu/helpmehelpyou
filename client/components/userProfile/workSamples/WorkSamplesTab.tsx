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
  const [fillerElements, setFillerElements] = useState<JSX.Element[]>([]);
  const { width } = useWindowDimensions();

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
    const data = [];
    for (let i = 0; i < ((-splicedList.length % 5) + 5) % 5; i++) {
      data.push(
        <li
          key={'filler' + i}
          className="h-[10px] w-[10px] flex-[0_0_16.3%] hidden md2:block"
        ></li>
      );
    }
    setFillerElements(data);
  }, [splicedList]);

  if (media.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-4xl font-light p-16">No Work Samples</h1>
        <Link href={'/media/upload'}>
          <p className="inline-block text-3xl font-light underline p-2 hover:text-cyan-400 duration-200 hover:cursor-pointer">
            Add Some Here
          </p>
        </Link>
      </div>
    );
  }

  const items = splicedList.reverse().map((media) => (
    <li
      key={media.id}
      className="flex-[0_0_16.3%] select-none duration-500 hover:scale-105"
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
  ));

  return (
    <div>
      <ul className="flex flex-col md2:flex-row md2:flex-wrap gap-10 justify-center items-center">
        {items}
        {fillerElements}
      </ul>
      <MediaPaginationNav
        currentPageNumber={currentPageNumber}
        totalPages={totalPages}
        setCurrentPageNumber={setCurrentPageNumber}
      ></MediaPaginationNav>
    </div>
  );
}
