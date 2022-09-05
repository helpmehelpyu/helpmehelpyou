import { Education } from '../../../types/Education';
import Image from 'next/future/image';

interface Props {
  education: Education;
  canEdit: boolean;
  showEditPopup: () => void;
  setEducationToEdit: (val: Education) => void;
}

export default function EducationCard({
  education,
  canEdit,
  showEditPopup,
  setEducationToEdit,
}: Props) {
  return (
    <div className="relative border-2 rounded p-5">
      {canEdit && (
        <Image
          src="/edit.svg"
          height={35}
          width={35}
          alt="Edit Icon"
          className="absolute right-0 top-0 m-1 cursor-pointer hover:bg-gray-200 rounded-full p-2"
          onClick={() => {
            setEducationToEdit(education);
            showEditPopup();
          }}
        ></Image>
      )}
      <h1 className="text-2xl font-semibold">{education.school}</h1>
      <h2>
        {education.degree} in {education.fieldOfStudy}
      </h2>
      {education.gpa && <h3>GPA: {education.gpa}</h3>}
      <h3 className="mt-2">
        {education.startYear} - {education.endYear}
      </h3>
    </div>
  );
}
