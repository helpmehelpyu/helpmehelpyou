import { FormEvent, useEffect, useState } from 'react';
import FloatingLabelInput from '../../FloatingLabelField';
import { AxiosResponse } from 'axios';
import { Experience } from '../../../types/Experience';

interface Props {
  handleDelete?: () => void;
  experience?: Experience;
  submitData: (val: {
    jobTitle: string;
    organization: string;
    startDate: string | null;
    endDate: string | null;
    description: string;
  }) => Promise<AxiosResponse>;
  setShowPopup: (val: boolean) => void;
  setRefetchUserData: (val: boolean) => void;
}

export default function ExperienceForm({
  experience,
  submitData,
  setShowPopup,
  setRefetchUserData,
  handleDelete,
}: Props) {
  const [jobTitle, setJobTitle] = useState('');
  const [jobTitleErrors, setJobTitleErrors] = useState('');
  const [organization, setOrganization] = useState('');
  const [organizationErrors, setOrganizationErrors] = useState('');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [startDateErrors, setStartDateErrors] = useState('');
  const [endDate, setEndDate] = useState<string | null>(null);
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

    const response = await submitData({
      jobTitle: jobTitle,
      organization: organization,
      startDate: ISOStartDate,
      endDate: ISOEndDate,
      description: workDescription,
    });

    if (response.status === 200) {
      setRefetchUserData(true);
      setShowPopup(false);
    } else if (response.data.errors) {
      handleValidationErrors(response.data.errors);
    } else if (response.status === 401) {
      setGeneralError('User is unauthorized to perform this action');
    } else {
      setGeneralError(response.data.message);
    }
  };

  const clearData = () => {
    setJobTitle('');
    setOrganization('');
    setWorkDescription('');
    setStartDate(null);
    setEndDate(null);
  };

  useEffect(() => {
    if (experience) {
      setJobTitle(experience.jobTitle);
      setOrganization(experience.organization);
      setWorkDescription(experience.description);
      setStartDate(experience.startDate);
      setEndDate(experience.endDate);
    }
  }, [experience]);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FloatingLabelInput
        placeholder="Job Title"
        isRequired={true}
        setValue={setJobTitle}
        type="text"
        value={jobTitle}
        error={jobTitleErrors}
      ></FloatingLabelInput>
      <FloatingLabelInput
        placeholder="Organization"
        isRequired={true}
        setValue={setOrganization}
        type="text"
        value={organization}
        error={organizationErrors}
      ></FloatingLabelInput>
      <FloatingLabelInput
        placeholder="Start Date"
        isRequired={true}
        setValue={setStartDate}
        type="date"
        value={
          startDate ? new Date(startDate).toISOString().substring(0, 10) : ''
        }
        error={startDateErrors}
      ></FloatingLabelInput>
      <FloatingLabelInput
        placeholder="End Date"
        isRequired={false}
        setValue={setEndDate}
        type="date"
        value={endDate ? new Date(endDate).toISOString().substring(0, 10) : ''}
        error={endDateErrors}
      ></FloatingLabelInput>
      <FloatingLabelInput
        placeholder="Work Description"
        isRequired={false}
        setValue={setWorkDescription}
        type="text"
        value={workDescription}
        error={workDescriptionErrors}
      ></FloatingLabelInput>
      <div className="flex justify-center items-center w-full gap-2 m-2 mt-10">
        <input
          type="submit"
          className="w-20 p-1 text-cyan-500 border-2 rounded border-cyan-500  hover:bg-slate-200 hover:cursor-pointer"
          value="Submit"
        ></input>
        <input
          type="button"
          className="w-20 p-1 text-orange-600 border-2 rounded border-orange-600  hover:bg-slate-200 hover:cursor-pointer"
          value="Clear"
          onClick={clearData}
        ></input>
        {handleDelete && (
          <input
            onClick={handleDelete}
            className="w-20 p-1 text-red-600 border-2 rounded border-red-600  hover:bg-slate-200 hover:cursor-pointer"
            value="Delete"
            type="button"
          ></input>
        )}
      </div>
      <p className="text-red-500 text-xs mx-2 px-1">{generalError}</p>
    </form>
  );
}
