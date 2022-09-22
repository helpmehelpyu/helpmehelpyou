import axios from '../../config/axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAuthCookie } from '../../auth/auth';
import { UserData } from '../../types/UserData';
import Avatar from '../Avatar';
import Image from 'next/image';

export default function Navbar() {
  const [user, setUser] = useState<UserData>();

  useEffect(() => {
    axios
      .get('/users/me', {
        headers: {
          Authorization: 'Bearer ' + getAuthCookie(),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
        }
      });
  }, []);

  return (
    <ul className="flex w-full justify-between border-2 gap-10 p-1 items-center text-center text-xl px-4">
      <Link href="/home">
        <a>
          <li className="hover:cursor-pointer hover:bg-slate-200 rounded p-1 flex justify-center items-center gap-1">
            <Image
              src="/home.svg"
              alt="home symbol"
              width={22}
              height={22}
            ></Image>
            Home
          </li>
        </a>
      </Link>
      {user ? (
        <div className="flex gap-6">
          <Link href="/media/upload">
            <a>
              <li className="hover:cursor-pointer hover:bg-slate-200 rounded p-1 flex justify-center items-center gap-1">
                <Image
                  src="/upload.svg"
                  alt="upload symbol"
                  width={22}
                  height={22}
                ></Image>
                Upload
              </li>
            </a>
          </Link>
          <Link href={'/users/me'}>
            <a>
              <li className="hover:cursor-pointer hover:bg-slate-200 rounded p-1 flex justify-center items-center gap-2">
                <span className="flex items-center justify-center border-2 rounded-full w-8 aspect-square text-sm">
                  <Avatar user={user}></Avatar>
                </span>
                {user.firstName}
              </li>
            </a>
          </Link>
        </div>
      ) : (
        <Link href="/login">
          <a>
            <li className="hover:cursor-pointer hover:bg-slate-200 rounded p-1">
              Login
            </li>
          </a>
        </Link>
      )}
    </ul>
  );
}
