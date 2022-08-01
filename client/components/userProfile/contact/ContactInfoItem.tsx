interface Props {
  key: string;
  name: string;
  value: string;
}

export default function ContactInfoItem({ key, name, value }: Props) {
  return (
    <li key={key} className="text-2xl">
      <span className="font-medium">{name}:</span> {value}
    </li>
  );
}
