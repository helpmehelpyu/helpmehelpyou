import { FormEvent, useState } from 'react';
import FloatingLabelInput from '../../FloatingLabelField';
import PopupOverlay from '../../PopupOverlay';
import axios from '../../../config/axios';
import { getAuthCookie } from '../../../auth/auth';
import ExperienceForm from './ExperienceForm';

interface Props {
  setShowAddPopup: (val: boolean) => void;
  setRefetchUserData: (val: boolean) => void;
}

export default function AddExperiencePopup({
  setShowAddPopup,
  setRefetchUserData,
}: Props) {
  return (
    <PopupOverlay setShowPopup={setShowAddPopup}>
      <div className="fixed p-10 left-0 right-0 top-0 bottom-0 m-auto rounded bg-white h-4/5 w-1/3 space-y-10 min-w-min overflow-auto">
        <div className="flex flex-col h-full w-full">
          <div className="m-auto">
            <h1 className="mb-10 text-2xl text-center font-semibold m-auto">
              Add Experience
            </h1>
            <ExperienceForm
              submitData={(data) => {
                return axios.post('users/experience', data, {
                  headers: {
                    Authorization: 'Bearer ' + getAuthCookie(),
                  },
                });
              }}
              setRefetchUserData={setRefetchUserData}
              setShowPopup={setShowAddPopup}
            ></ExperienceForm>
          </div>
        </div>
      </div>
    </PopupOverlay>
  );
}
