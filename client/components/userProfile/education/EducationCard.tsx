import { Education } from '../../../types/Education';

interface Props {
  education: Education;
}

export default function EducationCard({ education }: Props) {
  return (
    <div className="border-2 rounded p-5">
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
