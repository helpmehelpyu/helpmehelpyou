import axios from '../../config/axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAuthCookie } from '../../auth/auth';
import { UserData } from '../../types/UserData';

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
    <ul className="flex w-full justify-between border-2 gap-10 p-5 items-center text-center text-xl">
      <Link href="/home">
        <li className="hover:cursor-pointer">Home</li>
      </Link>
      {user ? (
        <div className="flex gap-6">
          <Link href="/media/upload">
            <li className="hover:cursor-pointer">Upload</li>
          </Link>
          <Link href={'/users/me'}>
            <li className="hover:cursor-pointer">{user.firstName}</li>
          </Link>
        </div>
      ) : (
        <Link href="/login">
          <li className="hover:cursor-pointer">Login</li>
        </Link>
      )}
    </ul>
  );
}
