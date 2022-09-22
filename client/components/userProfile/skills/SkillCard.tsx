import { Skill } from '../../../types/Skill';
import { htmlDecode } from '../../../utils/stringUtils';

interface Props {
  skill: Skill;
  canEdit: boolean;
  openDeleteConfirmation: () => void;
}

export default function SkillCard({
  skill,
  canEdit,
  openDeleteConfirmation,
}: Props) {
  return (
    <li key={skill.id} className="relative rounded-3xl p-2 border-2">
      {canEdit && (
        <div
          className="text-xs absolute -top-1 -right-2 hover:bg-red-800 hover:cursor-pointer text-white bg-red-600 w-4 font-black rounded-full text-center aspect-square"
          onClick={openDeleteConfirmation}
        >
          ✕
        </div>
      )}
      <h1>{htmlDecode(skill.name)}</h1>
    </li>
  );
}
