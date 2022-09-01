import { Experience } from '../../../types/Experience';
import Image from 'next/future/image';

interface Props {
  setExperienceToEdit: (val: Experience) => void;
  showEditPopup: () => void;
  experience: Experience;
  canEdit: boolean;
}

export default function ExperienceCard({
  setExperienceToEdit,
  experience,
  canEdit,
  showEditPopup,
}: Props) {
  return (
    <div className="relative rounded flex flex-col justify-center border-2 p-6 columns-9">
      {canEdit && (
        <Image
          src="/edit.svg"
          height={35}
          width={35}
          alt="Edit Icon"
          className="absolute right-0 top-0 m-1 cursor-pointer hover:bg-gray-200 rounded-full p-2"
          onClick={() => {
            setExperienceToEdit(experience);
            showEditPopup();
          }}
        ></Image>
      )}
      <h1 className="text-2xl font-semibold">{experience.jobTitle}</h1>
      <h2 className="">{experience.organization}</h2>
      <p className="mt-2 mb-4">{experience.description}</p>
      <p>
        {new Date(experience.startDate).toLocaleDateString('en-US', {
          timeZone: 'UTC',
        }) +
          ' - ' +
          (experience.endDate
            ? new Date(experience.endDate).toLocaleDateString('en-US', {
                timeZone: 'UTC',
              })
            : 'Present')}
      </p>
    </div>
  );
}
