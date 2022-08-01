import Image from 'next/image';
import { UserData } from '../../types/UserData';

interface Props {
  user: UserData;
  canEdit: boolean;
}

export default function Avatar({ user, canEdit }: Props) {
  let userAvatar = (
    <h1 className="text-7xl text-sky-900 font-bold">
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

  return (
    <div className="relative h-56 bg-slate-200 md2:rounded-tr-md2">
      <div className="peer absolute ring-4 ring-sky-600 rounded-full -bottom-20 left-0 right-0 m-auto bg-white h-60 w-60 select-none">
        <div className="flex justify-center items-center h-full">
          {userAvatar}
        </div>
      </div>
      {canEdit && (
        <div className="hidden peer-hover:block hover:block absolute rounded-full -bottom-20 left-0 right-0 m-auto h-60 w-60 bg-black bg-opacity-90">
          <div className="flex justify-center items-center h-full">
            <Image
              src="/edit.svg"
              height={90}
              width={90}
              alt="Edit Icon"
              className="filter invert"
            ></Image>
          </div>
        </div>
      )}
    </div>
  );
}
