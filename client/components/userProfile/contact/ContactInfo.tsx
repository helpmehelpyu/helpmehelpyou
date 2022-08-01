import { Link } from '../../../types/Link';
import PopupOverlay from '../../PopupOverlay';
import ContactInfoItem from './ContactInfoItem';

interface Props {
  setShowContactInfo: (val: boolean) => void;
  email: string;
  phoneNumber: string;
  links: Link[];
}

export default function ContactInfo({
  setShowContactInfo,
  email,
  phoneNumber,
  links,
}: Props) {
  const contactItems: JSX.Element[] = [];

  contactItems.push(
    <ContactInfoItem key="email" name="email" value={email}></ContactInfoItem>
  );

  if (phoneNumber !== '') {
    contactItems.push(
      <ContactInfoItem
        key="phone"
        name="phone number"
        value={phoneNumber}
      ></ContactInfoItem>
    );
  }

  for (const link of links) {
    contactItems.push(
      <ContactInfoItem
        key={link.id}
        name={link.name}
        value={link.url} // TODO make a warning page before redirect
      ></ContactInfoItem>
    );
  }

  return (
    <PopupOverlay setShowPopup={setShowContactInfo}>
      <div
        className="fixed rounded w-2/3 md2:w-1/2 h-5/6 p-10 left-0 right-0 top-0 bottom-0 m-auto bg-white space-y-10 overflow-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <h1 className="text-3xl text-center font-semibold">Contact Info</h1>
        <ul>{contactItems}</ul>
      </div>
    </PopupOverlay>
  );
}
