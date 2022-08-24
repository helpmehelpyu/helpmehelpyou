import PopupOverlay from '../../PopupOverlay';

interface Props {
  setShowAddPopup: (val: boolean) => void;
}

export default function AddExperiencePopup({ setShowAddPopup }: Props) {
  return (
    <PopupOverlay setShowPopup={setShowAddPopup}>
      <p>Experience</p>
    </PopupOverlay>
  );
}
