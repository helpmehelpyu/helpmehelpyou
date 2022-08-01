import Image from 'next/image';
import { UserData } from '../types/UserData';

interface Props {
  user: UserData;
}

export default function Avatar({ user }: Props) {
  let userAvatar = (
    <h1 className=" text-sky-900 font-bold">
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
