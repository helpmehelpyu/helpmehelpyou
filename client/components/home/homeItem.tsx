import Image from 'next/future/image';
import Link from 'next/link';
import { MediaResult } from '../../types/MediaResult';
import { getDateDifferentAsString } from '../../utils/dateUtils';
import Avatar from '../Avatar';

interface Props {
  media: MediaResult;
}

export default function HomeItem({ media }: Props) {
  return (
    <div
      className="border-2 space-y-3 rounded p-10 bg-white hover:border-gray-300 hover:cursor-pointer"
      onClick={() => {
        document.location.href = '/media/' + media.id;
      }}
    >
      <Image
        src={media.source}
        alt={
          'media uploaded by ' +
          media.author.firstName +
          ' ' +
          media.author.lastName
        }
        height={800}
        width={800}
        priority={true}
        className="rounded"
      ></Image>
      <Link href={'/media/' + media.id}>
        <h1 className="text-5xl mt-5 font-medium hover:underline">
          {media.title}
        </h1>
      </Link>
      <div
        className="flex rounded items-center gap-2 hover:bg-slate-100"
        onClick={(event) => {
          event.stopPropagation();
          document.location.href = '/users/' + media.author.id;
        }}
      >
        <span className="relative flex items-center justify-center border-2 rounded-full w-10 aspect-square">
          <Avatar user={media.author}></Avatar>
        </span>
        <h2 className="text-2xl">
          {media.author.firstName} {media.author.lastName}
        </h2>
      </div>
      <h2>{media.description}</h2>
      <p>{getDateDifferentAsString(new Date(media.uploadDate))}</p>
    </div>
  );
}
