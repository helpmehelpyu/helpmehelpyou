import { useEffect, useState } from 'react';
import { Skill } from '../../../types/Skill';

interface Props {
  skills: Skill[];
}

export default function SkillsTab({ skills }: Props) {
  const [skillsList, setSkillsList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const tmpSkillsList = [];
    for (const skill of skills) {
      tmpSkillsList.push(
        <li>
          <h1>{skill.name}</h1>
        </li>
      );
    }
    setSkillsList(tmpSkillsList);
  }, [skills]);

  if (skills.length === 0) {
    return (
      <h1 className="text-4xl text-center p-16 font-light">
        This user has no skill
      </h1>
    );
  }

  return (
    <div>
      <ul>{skillsList}</ul>
    </div>
  );
}
