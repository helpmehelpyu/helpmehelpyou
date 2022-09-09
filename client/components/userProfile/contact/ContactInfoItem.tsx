import Link from 'next/link';

interface Props {
  key: string;
  name: string;
  value: string;
  canEdit: boolean;
  initiateDeleteLink?: () => void;
}

export default function ContactInfoItem({
  initiateDeleteLink,
  canEdit,
  key,
  name,
  value,
}: Props) {
  let entry;

  if (name === 'phone number' || name === 'email') {
    entry = (
      <span>
        <span className="font-medium">{name}: </span>
        {value}
      </span>
    );
  } else {
    entry = (
      <Link href={'/redirectConfirmation?url=' + encodeURIComponent(value)}>
        <span>
          <span className="font-medium">{name}: </span>
          <span className="underline cursor-pointer hover:text-cyan-600">
            {value}
          </span>
        </span>
      </Link>
    );
  }

  return (
    <li key={key} className="relative text-2xl rounded">
      {entry}
      {canEdit && initiateDeleteLink && (
        <span
          className="text-xl mx-10 hover:text-red-800 hover:cursor-pointer text-red-600 font-black rounded-full text-center aspect-square"
          onClick={initiateDeleteLink}
        >
          ✕
        </span>
      )}
    </li>
  );
}
