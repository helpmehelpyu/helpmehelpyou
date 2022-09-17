import Image from 'next/image';
import { Author } from '../types/Author';

interface Props {
  user: Author;
}

export default function Avatar({ user }: Props) {
  let userAvatar = (
    <h1 className=" text-sky-900 font-bold text-center">
      {user.firstName[0]}
      {user.lastName[0]}
    </h1>
  );
  if (user.avatar.source !== '') {
    userAvatar = (
      <Image
        src={user.avatar.source}
        layout="fill"
        objectFit="cover"
        alt="loading..."
        className="rounded-full"
      ></Image>
    );
  }

  return <div className="select-none">{userAvatar}</div>;
}
