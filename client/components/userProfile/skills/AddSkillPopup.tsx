import axios from '../../../config/axios';
import { FormEvent, useState } from 'react';
import FloatingLabelInput from '../../FloatingLabelField';
import PopupOverlay from '../../PopupOverlay';
import { getAuthCookie } from '../../../auth/auth';

interface Props {
  setShowAddPopup: (val: boolean) => void;
  setRefetchUserData: (val: boolean) => void;
}

export default function AddSkillPopup({
  setShowAddPopup,
  setRefetchUserData,
}: Props) {
  const [skillName, setSkillName] = useState('');

  const handleAddSkill = async (event: FormEvent) => {
    event.preventDefault();
    const response = await axios.post(
      '/users/skills/',
      {
        name: skillName,
      },
      {
        headers: {
          Authorization: 'Bearer ' + getAuthCookie(),
        },
      }
    );

    if (response.status === 200) {
      setRefetchUserData(true);
      setShowAddPopup(false);
    }
  };

  return (
    <PopupOverlay setShowPopup={setShowAddPopup}>
      <div className="w-full">
        <div className="fixed rounded md:w-1/3 w-1/2 bg-white left-0 right-0 top-0 bottom-0 m-auto z-20 p-10 overflow-auto aspect-square">
          <h1 className="text-center w-full mb-20 font-light text-3xl">
            Add Skill
          </h1>
          <form>
            <FloatingLabelInput
              placeholder="Skill Name"
              isRequired={true}
              setValue={setSkillName}
              type="text"
            ></FloatingLabelInput>
            <button
              className="bg-cyan-700 bg-opacity-50 rounded border-2 border-cyan-700 text-lg text-cyan-700 hover:border-cyan-900 hover:bg-cyan-900 hover:text-cyan-200 w-full p-1 m-2 duration-150"
              onClick={handleAddSkill}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </PopupOverlay>
  );
}
