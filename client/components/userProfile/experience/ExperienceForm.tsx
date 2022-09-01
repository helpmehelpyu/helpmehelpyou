import { FormEvent, useEffect, useState } from 'react';
import FloatingLabelInput from '../../FloatingLabelField';
import { AxiosResponse } from 'axios';
import { Experience } from '../../../types/Experience';

interface Props {
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
      setShowPopup(false);
      setRefetchUserData(true);
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
        value={experience ? jobTitle : ''}
      ></FloatingLabelInput>
      <p className="text-red-500 text-xs mx-2 mb-2 px-1">{jobTitleErrors}</p>
      <FloatingLabelInput
        placeholder="Organization"
        isRequired={true}
        setValue={setOrganization}
        type="text"
        value={experience ? organization : ''}
      ></FloatingLabelInput>
      <p className="text-red-500 text-xs mx-2 mb-2 px-1">
        {organizationErrors}
      </p>
      <FloatingLabelInput
        placeholder="Start Date"
        isRequired={true}
        setValue={setStartDate}
        type="date"
        value={
          experience && startDate
            ? new Date(startDate).toISOString().substring(0, 10)
            : ''
        }
      ></FloatingLabelInput>
      <p className="text-red-500 text-xs mx-2 mb-2 px-1">{startDateErrors}</p>
      <FloatingLabelInput
        placeholder="End Date"
        isRequired={false}
        setValue={setEndDate}
        type="date"
        value={
          experience && endDate
            ? new Date(endDate).toISOString().substring(0, 10)
            : ''
        }
      ></FloatingLabelInput>
      <p className="text-red-500 text-xs mx-2 mb-2 px-1">{endDateErrors}</p>
      <FloatingLabelInput
        placeholder="Work Description"
        isRequired={false}
        setValue={setWorkDescription}
        type="text"
        value={experience ? workDescription : ''}
      ></FloatingLabelInput>
      <p className="text-red-500 text-xs mx-2 mb-2 px-1">
        {workDescriptionErrors}
      </p>
      <div className="flex gap-2 m-2 mt-8">
        <input
          type="submit"
          className="w-20 p-1 text-cyan-500 border-2 rounded border-cyan-500  hover:bg-slate-200 hover:cursor-pointer"
        ></input>
        <input
          type="button"
          className="w-20 p-1 text-orange-600 border-2 rounded border-orange-600  hover:bg-slate-200 hover:cursor-pointer"
          value="Clear"
          onClick={clearData}
        ></input>
      </div>
      <p className="text-red-500 text-xs mx-2 px-1">{generalError}</p>
    </form>
  );
}
