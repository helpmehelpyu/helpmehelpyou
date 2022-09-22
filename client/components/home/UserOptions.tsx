import Link from 'next/link';
import { logout } from '../../auth/auth';

interface Props {
  closeDropdown: () => void;
}

const UserOptions = ({ closeDropdown }: Props) => {
  const handleLogout = () => {
    logout();
    document.location.href = '/home';
  };

  return (
    <ul>
      <Link href="/users/me">
        <li
          className="hover:cursor-pointer hover:underline"
          onClick={closeDropdown}
        >
          Profile
        </li>
      </Link>

      <Link href="/user/settings">
        <li
          className="hover:cursor-pointer hover:underline"
          onClick={closeDropdown}
        >
          Settings
        </li>
      </Link>
      <li
        className="hover:cursor-pointer hover:underline"
        onClick={handleLogout}
      >
        Logout
      </li>
    </ul>
  );
};

export default UserOptions;
