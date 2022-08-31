import { useEffect, useState } from 'react';
import { Experience } from '../../../types/Experience';
import ExperienceCard from './ExperienceCard';

interface Props {
  rawExperiences: Experience[];
  canEdit: boolean;
}

export default function ExperienceTab({ rawExperiences, canEdit }: Props) {
  const [experiences, setExperiences] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const experienceItems: JSX.Element[] = [];
    for (const experience of rawExperiences) {
      experienceItems.push(
        <ExperienceCard experience={experience}></ExperienceCard>
      );
    }
    setExperiences(experienceItems);
  }, [rawExperiences]);

  return (
    <div>
      <div className="grid grid-cols-4 w-full gap-10">{experiences}</div>
    </div>
  );
}
