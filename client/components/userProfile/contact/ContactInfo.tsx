import Image from 'next/future/image';
import { Link } from '../../../types/Link';
import PopupOverlay from '../../PopupOverlay';
import ContactInfoItem from './ContactInfoItem';

interface Props {
  openAddLinkPopup: () => void;
  canEdit: boolean;
  setShowContactInfo: (val: boolean) => void;
  email: string;
  phoneNumber: string;
  links: Link[];
}

export default function ContactInfo({
  canEdit,
  setShowContactInfo,
  openAddLinkPopup,
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
      <div className="fixed rounded w-1/2 h-2/3 p-10 left-0 right-0 top-0 bottom-0 m-auto bg-white space-y-10 overflow-auto min-w-min transparent-scrollbar">
        {canEdit && (
          <Image
            src="/add.svg"
            alt="add button"
            height={30}
            width={30}
            className="absolute rounded-full hover:bg-slate-200 right-10 top-5"
            quality={100}
            onClick={() => {
              openAddLinkPopup();
              setShowContactInfo(false);
            }}
          ></Image>
        )}
        <h1 className="text-3xl text-center font-semibold">Contact Info</h1>
        <ul>{contactItems}</ul>
      </div>
    </PopupOverlay>
  );
}
