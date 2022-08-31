import { FormEvent, useState } from 'react';
import FloatingLabelInput from '../../FloatingLabelField';
import PopupOverlay from '../../PopupOverlay';
import axios from '../../../config/axios';
import { getAuthCookie } from '../../../auth/auth';

interface Props {
  setShowAddPopup: (val: boolean) => void;
  setRefetchUserData: (val: boolean) => void;
}

export default function AddExperiencePopup({
  setShowAddPopup,
  setRefetchUserData,
}: Props) {
  const [jobTitle, setJobTitle] = useState('');
  const [jobTitleErrors, setJobTitleErrors] = useState('');
  const [organization, setOrganization] = useState('');
  const [organizationErrors, setOrganizationErrors] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [startDateErrors, setStartDateErrors] = useState('');
  const [endDate, setEndDate] = useState(null);
  const [endDateErrors, setEndDateErrors] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [workDescriptionErrors, setWorkDescriptionErrors] = useState('');
  const [generalError, setGeneralError] = useState('');

  const handleValidationErrors = (errors: { param: string; msg: string }[]) => {
    for (const error of errors) {
      switch (error.param) {
        case 'jobTitle':
          setJobTitleErrors(error.msg);
          break;
        case 'organization':
          setOrganizationErrors(error.msg);
          break;
        case 'startDate':
          setStartDateErrors(error.msg);
          break;
        case 'endDate':
          setEndDateErrors(error.msg);
          break;
        case 'description':
          setWorkDescriptionErrors(error.msg);
          break;
      }
    }
  };

  const clearValidationErrors = () => {
    setJobTitleErrors('');
    setOrganizationErrors('');
    setStartDateErrors('');
    setEndDateErrors('');
    setWorkDescriptionErrors('');
    setGeneralError('');
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    clearValidationErrors();
    let ISOStartDate = null;
    if (startDate) {
      ISOStartDate = new Date(startDate).toISOString();
    }

    let ISOEndDate = null;
    if (endDate) {
      ISOEndDate = new Date(endDate).toISOString();
    }

    const response = await axios.post(
      'users/experience',
      {
        jobTitle: jobTitle,
        organization: organization,
        startDate: ISOStartDate,
        endDate: ISOEndDate,
        description: workDescription,
      },
      {
        headers: {
          Authorization: 'Bearer ' + getAuthCookie(),
        },
      }
    );

    if (response.status === 200) {
      setShowAddPopup(false);
      setRefetchUserData(true);
    } else if (response.data.errors) {
      handleValidationErrors(response.data.errors);
    } else if (response.status === 401) {
      setGeneralError('User is unauthorized to perform this action');
    } else {
      setGeneralError(response.data.message);
    }
  };

  return (
    <PopupOverlay setShowPopup={setShowAddPopup}>
      <div className="fixed p-10 left-0 right-0 top-0 bottom-0 m-auto rounded bg-white h-5/6 w-1/3 space-y-10 min-w-min overflow-auto">
        <div className="flex flex-col w-full h-full justify-center">
          <h1 className="mb-10 text-2xl text-center font-semibold">
            Add Experience
          </h1>
          <form onSubmit={handleSubmit} noValidate>
            <FloatingLabelInput
              placeholder="Job Title"
              isRequired={true}
              setValue={setJobTitle}
              type="text"
            ></FloatingLabelInput>
            <p className="text-red-500 text-xs mx-2 mb-2 px-1">
              {jobTitleErrors}
            </p>
            <FloatingLabelInput
              placeholder="Organization"
              isRequired={true}
              setValue={setOrganization}
              type="text"
            ></FloatingLabelInput>
            <p className="text-red-500 text-xs mx-2 mb-2 px-1">
              {organizationErrors}
            </p>
            <FloatingLabelInput
              placeholder="Start Date"
              isRequired={true}
              setValue={setStartDate}
              type="date"
            ></FloatingLabelInput>
            <p className="text-red-500 text-xs mx-2 mb-2 px-1">
              {startDateErrors}
            </p>
            <FloatingLabelInput
              placeholder="End Date"
              isRequired={false}
              setValue={setEndDate}
              type="date"
            ></FloatingLabelInput>
            <p className="text-red-500 text-xs mx-2 mb-2 px-1">
              {endDateErrors}
            </p>
            <FloatingLabelInput
              placeholder="Work Description"
              isRequired={false}
              setValue={setWorkDescription}
              type="text"
            ></FloatingLabelInput>
            <p className="text-red-500 text-xs mx-2 mb-2 px-1">
              {workDescriptionErrors}
            </p>
            <input
              type="submit"
              className="m-2 mt-8 p-1 text-cyan-500 border-2 rounded border-cyan-500  hover:bg-slate-200 hover:cursor-pointer"
            ></input>
            <p className="text-red-500 text-xs mx-2 px-1">{generalError}</p>
          </form>
        </div>
      </div>
    </PopupOverlay>
  );
}
