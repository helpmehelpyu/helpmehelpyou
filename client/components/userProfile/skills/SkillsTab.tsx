import { useEffect, useState } from 'react';
import { Skill } from '../../../types/Skill';
import SkillCard from './SkillCard';

interface Props {
  skills: Skill[];
  canEdit: boolean;
  openDeleteConfirmation: () => void;
  setSkillName: (val: string) => void;
}

export default function SkillsTab({
  skills,
  canEdit,
  openDeleteConfirmation,
  setSkillName,
}: Props) {
  const [skillsList, setSkillsList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const tmpSkillsList = [];
    for (const skill of skills) {
      tmpSkillsList.push(
        <SkillCard
          skill={skill}
          canEdit={canEdit}
          openDeleteConfirmation={() => {
            openDeleteConfirmation();
            setSkillName(skill.name);
          }}
        ></SkillCard>
      );
    }
    setSkillsList(tmpSkillsList);
  }, [skills, canEdit, openDeleteConfirmation, setSkillName]);

  if (skills.length === 0) {
    return (
      <h1 className="text-4xl text-center p-16 font-light">
        This user has no listed skills
      </h1>
    );
  }

  return (
    <div>
      <ul className="flex gap-5 flex-wrap">{skillsList}</ul>
    </div>
  );
}
