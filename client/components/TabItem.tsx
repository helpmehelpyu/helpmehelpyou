import { Tabs } from './userProfile/UserProfile';

interface Props {
  tab: Tabs;
  setSelectedTab: (tab: Tabs) => void;
  isSelected: boolean;
  canEdit: boolean;
}

export default function TabItem({
  tab,
  setSelectedTab,
  isSelected,
  canEdit,
}: Props) {
  return (
    <li className="whitespace-nowrap">
      <button
        onClick={() => setSelectedTab(tab)}
        className={
          'relative z-50 text-lg hover:underline p-2 hover:bg-slate-300 duration-300 peer' +
          (isSelected && canEdit
            ? ' text-cyan-500 border bg-white rounded-l border-cyan-500 font-bold'
            : ' rounded bg-gray-50')
        }
      >
        {tab.toString()}
      </button>
      {isSelected && canEdit && (
        <button className="relative w-10 aspect-square border-r border-y border-slate-400 rounded-r text-lg font-light hover:bg-slate-300 duration-300 z-10">
          +
        </button>
      )}
    </li>
  );
}
