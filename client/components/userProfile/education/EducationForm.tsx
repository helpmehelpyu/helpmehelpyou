import { AxiosResponse } from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { Education } from '../../../types/Education';
import FloatingLabelInput from '../../FloatingLabelField';

interface Props {
  education?: Education;
  handleDelete?: () => void;
  submitData: (val: {
    school: string;
    fieldOfStudy: string;
    degree: string;
    startYear: number | null;
    endYear: number | null;
    gpa: number | null;
  }) => Promise<AxiosResponse>;
  setShowPopup: (val: boolean) => void;
  setRefetchUserData: (val: boolean) => void;
}

enum DegreeType {
  BACHELORS = "Bachelor's",
  MASTERS = "Master's",
  DOCTORAL = 'Doctoral',
  ASSOCIATE = 'Associate',
  HIGHSCHOOL = 'High School Diploma',
}

export default function EducationForm({
  education,
  submitData,
  setShowPopup,
  setRefetchUserData,
  handleDelete,
}: Props) {
  const [school, setSchool] = useState('');
  const [schoolError, setSchoolError] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [fieldOfStudyError, setFieldOfStudyError] = useState('');
  const [degree, setDegree] = useState('');
  const [degreeError, setDegreeError] = useState('');
  const [degreeOptions, setDegreeOptions] = useState<JSX.Element[]>([]);
  const [startYear, setStartYear] = useState<number | null>(null);
  const [startYearError, setStartYearError] = useState('');
  const [endYear, setEndYear] = useState<number | null>(null);
  const [endYearError, setEndYearError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [gpa, setGpa] = useState<string | null>(null);
  const [gpaErrors, setGpaErrors] = useState('');

  useEffect(() => {
    const options = [
      <option key={0} value={''}>
        -- Please Select A Degree Type --
      </option>,
    ];
    for (const degreeType of Object.values(DegreeType)) {
      options.push(
        <option value={degreeType.toString()}>{degreeType.toString()}</option>
      );
    }
    setDegreeOptions(options);
  }, []);

  useEffect(() => {
    if (education) {
      setSchool(education.school);
      setDegree(education.degree);
      setFieldOfStudy(education.fieldOfStudy);
      setStartYear(education.startYear);
      setEndYear(education.endYear);
      setGpa(education.gpa ? education.gpa.toString() : null);
    }
  }, [education]);

  const clearData = () => {
    setSchool('');
    setFieldOfStudy('');
    setDegree('');
    setStartYear(null);
    setEndYear(null);
    setGpa(null);
  };

  const handleValidationErrors = (errors: { param: string; msg: string }[]) => {
    for (const error of errors) {
      switch (error.param) {
        case 'school':
          setSchoolError(error.msg);
          break;
        case 'fieldOfStudy':
          setFieldOfStudyError(error.msg);
          break;
        case 'startYear':
          setStartYearError(error.msg);
          break;
        case 'endYear':
          setEndYearError(error.msg);
          break;
        case 'degree':
          setDegreeError(error.msg);
          break;
        case 'gpa':
          setGpaErrors(error.msg);
          break;
      }
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const response = await submitData({
      school: school,
      fieldOfStudy: fieldOfStudy,
      degree: degree,
      startYear: startYear,
      endYear: endYear,
      gpa: gpa ? parseFloat(gpa) : null,
    });

    if (response.status === 200) {
      setRefetchUserData(true);
      setShowPopup(false);
    } else {
      if (response.data.errors) {
        handleValidationErrors(response.data.errors);
      }

      if (response.status === 401) {
        setGeneralError(
          'The current User is not authorized to perform this action'
        );
      } else {
        setGeneralError(response.data.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FloatingLabelInput
        isRequired={true}
        placeholder="School"
        setValue={setSchool}
        type="text"
        error={schoolError}
        value={school}
      ></FloatingLabelInput>
      <FloatingLabelInput
        isRequired={true}
        placeholder="Field Of Study"
        setValue={setFieldOfStudy}
        type="text"
        error={fieldOfStudyError}
        value={fieldOfStudy}
      ></FloatingLabelInput>
      <label htmlFor="degree" className="p-1 m-2 z-10 bg-transparent">
        Degree:{' '}
      </label>
      <select
        className="rounded focus:outline-cyan-500 w-full border-2 p-1 m-2 z-10 bg-transparent min-w-max text-slate-600"
        name="degree"
        onChange={(e) => {
          setDegree(e.target.value);
        }}
        value={degree}
      >
        {degreeOptions}
      </select>
      <p className="text-red-500 text-xs mx-2 mb-2 px-1">{degreeError}</p>
      <FloatingLabelInput
        isRequired={true}
        placeholder="Start Year"
        setValue={setStartYear}
        value={startYear || ''}
        type="number"
        error={startYearError}
      ></FloatingLabelInput>
      <FloatingLabelInput
        isRequired={false}
        placeholder="End Year"
        setValue={setEndYear}
        value={endYear || ''}
        type="number"
        error={endYearError}
      ></FloatingLabelInput>
      <FloatingLabelInput
        isRequired={false}
        placeholder="GPA"
        setValue={setGpa}
        type="number"
        error={gpaErrors}
        min={0}
        max={4.0}
        step={0.01}
        value={gpa || ''}
      ></FloatingLabelInput>
      <div className="flex justify-center items-center w-full gap-2 m-2 mt-10">
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
        {handleDelete && (
          <input
            onClick={handleDelete}
            className="w-20 p-1 text-red-600 border-2 rounded border-red-600  hover:bg-slate-200 hover:cursor-pointer"
            value="Delete"
            type="button"
          ></input>
        )}
      </div>
      <p className="text-red-500 text-xs mx-2 mb-2 px-1">{generalError}</p>
    </form>
  );
}
