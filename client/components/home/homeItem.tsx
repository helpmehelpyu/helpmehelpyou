import Image from 'next/future/image';
import { MediaResult } from '../../types/MediaResult';

interface Props {
  media: MediaResult;
}

export default function HomeItem({ media }: Props) {
  return (
    <div>
      <h1>{media.title}</h1>
      <h2>
        {media.author.firstName} {media.author.lastName}
      </h2>
      <h2>{media.description}</h2>
      <Image
        src={media.source}
        alt={
          'media uploaded by ' +
          media.author.firstName +
          ' ' +
          media.author.lastName
        }
        height={1000}
        width={1000}
        priority={true}
      ></Image>
    </div>
  );
}
