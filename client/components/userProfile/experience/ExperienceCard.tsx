import { Experience } from '../../../types/Experience';

interface Props {
  experience: Experience;
}

export default function ExperienceCard({ experience }: Props) {
  return (
    <div className="rounded flex flex-col justify-center border-2 p-6 columns-9">
      <h1 className="text-2xl font-semibold">{experience.jobTitle}</h1>
      <h2 className="">{experience.organization}</h2>
      <p className="mt-2 mb-4">{experience.description}</p>
      <p>
        {new Date(experience.startDate).toLocaleDateString() +
          ' - ' +
          (experience.endDate
            ? new Date(experience.endDate).toLocaleDateString()
            : 'Present')}
      </p>
    </div>
  );
}
