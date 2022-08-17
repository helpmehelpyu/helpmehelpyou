import { Tabs } from './userProfile/UserProfile';

interface Props {
  tab: Tabs;
  setSelectedTab: (tab: Tabs) => void;
  isSelected: boolean;
}

export default function TabItem({ tab, setSelectedTab, isSelected }: Props) {
  return (
    <li className="whitespace-nowrap">
      <button
        onClick={() => setSelectedTab(tab)}
        className={
          'text-lg hover:underline p-2 hover:bg-gray-200 duration-300' +
          (isSelected
            ? ' text-cyan-500 border rounded-l border-cyan-500 font-bold'
            : ' rounded')
        }
      >
        {tab.toString()}
      </button>
      {isSelected && (
        <button className="w-10 aspect-square border-r border-y border-slate-400 rounded-r text-lg font-light">
          +
        </button>
      )}
    </li>
  );
}
