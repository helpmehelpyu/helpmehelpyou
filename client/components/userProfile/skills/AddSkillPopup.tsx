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
  const [errorMessage, setErrorMessage] = useState('');

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
    } else {
      if (response.data.message) {
        setErrorMessage(response.data.message);
      } else {
        setErrorMessage(response.data.errors[0].msg);
      }
    }
  };

  return (
    <PopupOverlay setShowPopup={setShowAddPopup}>
      <div className="fixed rounded h-1/2 w-1/4 bg-white left-0 right-0 top-0 bottom-0 m-auto z-20 p-10 overflow-auto min-w-min">
        <div className="flex flex-col h-full w-full">
          <div className="w-full m-auto">
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
                className="font-bold min-w-min bg-cyan-700 bg-opacity-20 rounded border-2 border-cyan-700 text-lg text-cyan-700 hover:border-cyan-900 hover:bg-cyan-900 hover:text-cyan-200 w-full p-1 m-2 duration-150"
                onClick={handleAddSkill}
              >
                Add
              </button>
              <p className="text-red-500 text-sm mx-2 px-1">{errorMessage}</p>
            </form>
          </div>
        </div>
      </div>
    </PopupOverlay>
  );
}
