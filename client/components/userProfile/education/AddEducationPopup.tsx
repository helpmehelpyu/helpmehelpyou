import PopupOverlay from '../../PopupOverlay';
import EducationForm from './EducationForm';
import axios from '../../../config/axios';
import { getAuthCookie } from '../../../auth/auth';

interface Props {
  setShowAddPopup: (val: boolean) => void;
  setRefetchUserData: (val: boolean) => void;
}

export default function AddEducationPopup({
  setShowAddPopup,
  setRefetchUserData,
}: Props) {
  const submitData = async (data: {
    school: string;
    fieldOfStudy: string;
    degree: string;
    startYear: number | null;
    endYear: number | null;
    gpa: number | null;
  }) => {
    return axios.post('/users/education', data, {
      headers: {
        Authorization: 'Bearer ' + getAuthCookie(),
      },
    });
  };

  return (
    <PopupOverlay setShowPopup={setShowAddPopup}>
      <div className="fixed p-10 left-0 right-0 top-0 bottom-0 m-auto rounded bg-white h-1/2 sm:h-2/3 w-1/4 space-y-10 min-w-min overflow-auto transparent-scrollbar">
        <div className="w-full h-full flex flex-col">
          <div className="m-auto">
            <h1 className="w-full mb-10 text-2xl text-center font-semibold m-auto">
              Add Education
            </h1>
            <EducationForm
              setShowPopup={setShowAddPopup}
              submitData={submitData}
              setRefetchUserData={setRefetchUserData}
            ></EducationForm>
          </div>
        </div>
      </div>
    </PopupOverlay>
  );
}
