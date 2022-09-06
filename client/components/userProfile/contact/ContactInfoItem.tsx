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
  return (
    <li key={key} className="relative text-2xl rounded">
      <span className="font-medium">{name}:</span> {value}
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
