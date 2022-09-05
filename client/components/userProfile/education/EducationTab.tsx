import { useEffect, useState } from 'react';
import { Education } from '../../../types/Education';
import EducationCard from './EducationCard';

interface Props {
  rawEducation: Education[];
  canEdit: boolean;
  setShowEditPopup: (val: boolean) => void;
  setEducationToEdit: (val: Education) => void;
}

export default function EducationTab({
  rawEducation,
  canEdit,
  setEducationToEdit,
  setShowEditPopup,
}: Props) {
  const [educationEntries, setEducationEntries] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const temp: JSX.Element[] = [];
    for (const education of rawEducation) {
      temp.push(<EducationCard education={education}></EducationCard>);
    }
    setEducationEntries(temp);
  }, [rawEducation]);

  return (
    <div className="w-full grid grid-cols-5 gap-10">{educationEntries}</div>
  );
}
