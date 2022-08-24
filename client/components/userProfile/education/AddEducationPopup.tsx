import PopupOverlay from '../../PopupOverlay';

interface Props {
  setShowAddPopup: (val: boolean) => void;
}

export default function AddEducationPopup({ setShowAddPopup }: Props) {
  return (
    <PopupOverlay setShowPopup={setShowAddPopup}>
      <p>Education</p>
    </PopupOverlay>
  );
}
