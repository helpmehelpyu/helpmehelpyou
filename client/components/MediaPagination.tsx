import { MediaResult } from '../types/MediaResult';
import { WorkSample } from '../types/WorkSample';
import Image from 'next/image';

interface Props {
  media: MediaResult[] | WorkSample[];
}

export default function MediaPagination({ media }: Props) {
  if (media.length === 0) {
    return (
      <h1 className="w-full text-center text-4xl font-light p-16">
        No Work Samples
      </h1>
    );
  }

  const items = media.map((val) => (
    <li key={val.id} className="flex-[0_0_16.3%]">
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

  const fillerElements: JSX.Element[] = [];
  for (let i = 0; i < ((-media.length % 5) + 5) % 5; i++) {
    fillerElements.push(
      <li className="h-[10px] w-[10px] flex-[0_0_16.3%] hidden md2:block"></li>
    );
  }

  return (
    <div>
      <ul className="flex flex-col md2:flex-row md2:flex-wrap gap-10 justify-center">
        {items}
        {fillerElements}
      </ul>
    </div>
  );
}
