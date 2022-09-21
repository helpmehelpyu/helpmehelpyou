import Link from 'next/link';
import { Author } from '../../types/Author';
import Avatar from '../Avatar';

interface Props {
  author: Author;
}

export default function UserMiniProfile({ author }: Props) {
  return (
    <div className="flex flex-col justify-center gap-2 items-center w-full p-2">
      <div className="flex items-center justify-center border-2 rounded-full w-10 aspect-square">
        <Avatar user={author}></Avatar>
      </div>
      <h1 className="text-xl">
        {author.firstName} {author.lastName}
      </h1>

      <div className="text-center mt-5 space-y-1">
        <h1 className="font-bold">Contact:</h1>
        <h2 className="hover:underline">
          <Link href={'mailto:' + author.email}>{author.email}</Link>
        </h2>
        <h2>{author.phoneNumber}</h2>
      </div>
    </div>
  );
}
