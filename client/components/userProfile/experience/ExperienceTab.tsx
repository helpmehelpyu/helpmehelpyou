import { useEffect, useState } from 'react';
import { Experience } from '../../../types/Experience';
import ExperienceCard from './ExperienceCard';

interface Props {
  setExperienceToEdit: (val: Experience) => void;
  showEditPopup: () => void;
  rawExperiences: Experience[];
  canEdit: boolean;
}

export default function ExperienceTab({
  setExperienceToEdit,
  rawExperiences,
  canEdit,
  showEditPopup,
}: Props) {
  const [experiences, setExperiences] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const experienceItems: JSX.Element[] = [];
    for (const experience of rawExperiences) {
      experienceItems.push(
        <ExperienceCard
          key={experience.id}
          setExperienceToEdit={setExperienceToEdit}
          showEditPopup={showEditPopup}
          experience={experience}
          canEdit={canEdit}
        ></ExperienceCard>
      );
    }
    setExperiences(experienceItems);
  }, [rawExperiences, canEdit, showEditPopup, setExperienceToEdit]);

  return (
    <div className="grid md2:grid-cols-4 grid-cols-1 w-full gap-10">
      {experiences}
    </div>
  );
}
