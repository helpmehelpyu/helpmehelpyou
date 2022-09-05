import { Experience } from '../../../types/Experience';
import PopupOverlay from '../../PopupOverlay';
import ExperienceForm from './ExperienceForm';
import axios from '../../../config/axios';
import { getAuthCookie } from '../../../auth/auth';
import { useState } from 'react';

interface Props {
  setShowPopup: (val: boolean) => void;
  setRefetchUserData: (val: boolean) => void;
  experienceToEdit: Experience;
}

export default function EditExperiencePopup({
  setShowPopup,
  setRefetchUserData,
  experienceToEdit,
}: Props) {
  const [deleteErrors, setDeleteErrors] = useState('');

  const handleDelete = async () => {
    const response = await axios.delete('/users/experience', {
      data: { experienceId: experienceToEdit.id },
      headers: {
        Authorization: 'Bearer ' + getAuthCookie(),
      },
    });

    if (response.status === 200) {
      setRefetchUserData(true);
      setShowPopup(false);
    } else {
      setDeleteErrors(response.data.message);
    }
  };
  return (
    <PopupOverlay
      setShowPopup={setShowPopup}
      opaqueBackground={false}
      showCloseIcon={false}
    >
      <div className="fixed drop-shadow-2xl p-10 left-0 right-0 top-0 bottom-0 m-auto rounded bg-white h-1/2 sm:h-2/3 w-1/3 space-y-10 min-w-min overflow-auto transparent-scrollbar">
        <div className="flex flex-col w-full h-full">
          <div className="w-full m-auto">
            <div
              className="absolute top-2 left-4 text-slate-700 text-xl text-center duration-300 transition-colors hover:text-red-400 cursor-pointer select-none"
              onClick={() => setShowPopup(false)}
            >
              ✕
            </div>
            <h1 className="mb-10 text-2xl text-center font-semibold">
              Edit Experience
            </h1>
            <ExperienceForm
              experience={experienceToEdit}
              submitData={(data) => {
                return axios.put(
                  'users/experience',
                  { id: experienceToEdit.id, ...data },
                  {
                    headers: {
                      Authorization: 'Bearer ' + getAuthCookie(),
                    },
                  }
                );
              }}
              setRefetchUserData={setRefetchUserData}
              setShowPopup={setShowPopup}
              handleDelete={handleDelete}
            ></ExperienceForm>

            <p className="text-red-500 text-xs mx-2 mb-2 px-1">
              {deleteErrors}
            </p>
          </div>
        </div>
      </div>
    </PopupOverlay>
  );
}
