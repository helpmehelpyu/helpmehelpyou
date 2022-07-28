import { MediaResult } from '../types/MediaResult';
import { WorkSample } from '../types/WorkSample';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MediaPaginationNav } from './MediaPaginationNav';
import useWindowDimensions from '../utils/windowSizeUtils';

interface Props {
  media: MediaResult[] | WorkSample[];
}

export default function MediaPagination({ media }: Props) {
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
      <h1 className="w-full text-center text-4xl font-light p-16">
        No Work Samples
      </h1>
    );
  }

  const items = splicedList.map((val) => (
    <li key={val.id} className="flex-[0_0_16.3%] select-none">
      <Image
        src={val.source.toString()}
        objectFit="cover"
        height={5000}
        width={5000}
        className="rounded-2xl aspect-square scale-75 md2:scale-100"
        alt=""
      ></Image>
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
