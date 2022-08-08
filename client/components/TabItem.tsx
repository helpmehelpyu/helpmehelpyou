import { Tabs } from './userProfile/UserProfile';

interface Props {
  tab: Tabs;
  setSelectedTab: (tab: Tabs) => void;
  isSelected: boolean;
}

export default function TabItem({ tab, setSelectedTab, isSelected }: Props) {
  return (
    <li>
      <button
        onClick={() => setSelectedTab(tab)}
        className={
          'text-lg hover:underline p-2 rounded hover:bg-gray-200 duration-300' +
          (isSelected ? ' text-cyan-500 border border-cyan-500 font-bold' : '')
        }
      >
        {tab.toString()}
      </button>
    </li>
  );
}
