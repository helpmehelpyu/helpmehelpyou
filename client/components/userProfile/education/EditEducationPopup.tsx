import PopupOverlay from '../../PopupOverlay';
import EducationForm from './EducationForm';
import axios from '../../../config/axios';
import { getAuthCookie } from '../../../auth/auth';
import { useState } from 'react';
import { Education } from '../../../types/Education';

interface Props {
  education: Education;
  setShowPopup: (val: boolean) => void;
  setRefetchUserData: (val: boolean) => void;
}

export function EditEducationPopup({
  education,
  setShowPopup,
  setRefetchUserData,
}: Props) {
  const [deleteErrors, setDeleteErrors] = useState('');

  const handleDelete = async () => {
    const response = await axios.delete('/users/education', {
      data: { educationId: education.id },
      headers: { Authorization: 'Bearer ' + getAuthCookie() },
    });

    if (response.status === 200) {
      setRefetchUserData(true);
      setShowPopup(false);
    } else {
      setDeleteErrors(response.data.message);
    }
  };

  return (
    <PopupOverlay setShowPopup={setShowPopup} opaqueBackground={false}>
      <div className="fixed drop-shadow-2xl p-10 left-0 right-0 top-0 bottom-0 m-auto rounded bg-white h-1/2 sm:h-3/4 w-1/4 space-y-10 min-w-min overflow-auto transparent-scrollbar">
        <div className="flex flex-col w-full h-full">
          <div
            className="absolute top-2 left-4 text-slate-700 text-2xl text-center duration-300 transition-colors hover:text-red-400 cursor-pointer select-none"
            onClick={() => setShowPopup(false)}
          >
            ✕
          </div>
          <div className="w-full m-auto">
            <h1 className="mb-10 text-2xl text-center font-semibold">
              Edit Education
            </h1>
            <EducationForm
              education={education}
              setShowPopup={setShowPopup}
              submitData={(data) => {
                return axios.put(
                  '/users/education',
                  { id: education.id, ...data },
                  {
                    headers: {
                      Authorization: 'Bearer ' + getAuthCookie(),
                    },
                  }
                );
              }}
              setRefetchUserData={setRefetchUserData}
              handleDelete={handleDelete}
            ></EducationForm>
            <p className="text-red-500 text-xs mx-2 mb-2 px-1">
              {deleteErrors}
            </p>
          </div>
        </div>
      </div>
    </PopupOverlay>
  );
}
