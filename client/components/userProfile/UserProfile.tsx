import { useEffect, useState } from 'react';
import { WorkSample } from '../../types/WorkSample';
import FloatingMediaDetails from './workSamples/FloatingMediaDetails';
import WorkSamplesTab from './workSamples/WorkSamplesTab';
import { UserData } from '../../types/UserData';
import Image from 'next/image';
import Avatar from '../Avatar';
import ContactInfo from './contact/ContactInfo';
import EditAvatarPopup from './avatar/EditAvatarPopup';
import TabItem from '../TabItem';

interface Props {
  user: UserData;
  canEdit: boolean;
}

export enum Tabs {
  WorkSamples = 'Work Samples',
  Skills = 'Skills',
  Experience = 'Experience',
  Education = 'Education',
}

export default function UserProfile({ user, canEdit }: Props) {
  const [selectedTab, setSelectedTab] = useState(Tabs.WorkSamples);
  const [tabs, setTabs] = useState<JSX.Element[]>([]);
  const [mediaDetails, setMediaDetails] = useState<WorkSample | null>(null);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showEditAvatarPopup, setShowEditAvatarPopup] = useState(false);

  const [selectedTabComponent, setSelectedTabComponent] = useState(
    <WorkSamplesTab
      media={user.workSamples}
      setMediaDetails={setMediaDetails}
    ></WorkSamplesTab>
  );

  useEffect(() => {
    switch (selectedTab) {
      case Tabs.WorkSamples:
        setSelectedTabComponent(
          <WorkSamplesTab
            media={user.workSamples}
            setMediaDetails={setMediaDetails}
          ></WorkSamplesTab>
        );
        break;
      case Tabs.Skills:
        setSelectedTabComponent(<h1>Skill tab is selected</h1>);
        break;
      case Tabs.Experience:
        setSelectedTabComponent(<h1>Experience tab is selected</h1>);
        break;
      case Tabs.Education:
        setSelectedTabComponent(<h1>Education tab is selected</h1>);
        break;
    }

    const newTabs = [];
    for (let tab of Object.values(Tabs)) {
      newTabs.push(
        <TabItem
          key={tab}
          tab={tab}
          setSelectedTab={setSelectedTab}
          isSelected={tab === selectedTab}
          canEdit={canEdit}
        ></TabItem>
      );
    }
    setTabs(newTabs);
  }, [selectedTab, user, canEdit]);

  let featuredWork = <div className="hidden"></div>;
  if (user.userProfile.featuredWork !== '') {
    featuredWork = (
      <div className="space-y-10 md2:w-2/3 border-2 md2:rounded-l-2xl bg-white rounded min-w-max pt-5">
        <h1 className="text-3xl font-bold text-center">Featured Work</h1>
        <div className="relative md2:h-[70%] h-[50vw]">
          <Image
            alt=""
            layout="fill"
            objectFit="contain"
            src={user.userProfile.featuredWork}
          ></Image>
        </div>
      </div>
    );
  }

  return (
    <div>
      {showContactInfo && (
        <ContactInfo
          setShowContactInfo={setShowContactInfo}
          email={user.email}
          phoneNumber={user.phoneNumber}
          links={user.links}
        ></ContactInfo>
      )}
      {mediaDetails && (
        <FloatingMediaDetails
          mediaDetails={mediaDetails}
          setMediaDetails={setMediaDetails}
        ></FloatingMediaDetails>
      )}
      {showEditAvatarPopup && (
        <EditAvatarPopup
          currentAvatar={user.avatar.source}
          setShowEditAvatarPopup={setShowEditAvatarPopup}
        ></EditAvatarPopup>
      )}
      <div className="bg-gray-50 space-y-10 p-5 md2:p-10 min-h-screen md2:min-w-0 min-w-min">
        <div className="flex flex-col md2:flex-row md2:space-x-5 md2:justify-center md2:items-stretch space-y-10 md2:space-y-0">
          <div className="md2:rounded-r-2md2 border-2 md2:bg-white w-full rounded">
            <div className="relative h-56 bg-slate-200 md2:rounded-tr-md2 select-none">
              <div className="peer absolute border-4 border-slate-900 shadow rounded-full -bottom-20 left-0 right-0 m-auto bg-white h-60 w-60">
                <div className="flex justify-center items-center h-full text-7xl">
                  <Avatar user={user}></Avatar>
                </div>
              </div>
              {canEdit && (
                <div
                  className="hidden peer-hover:block hover:block absolute rounded-full -bottom-20 left-0 right-0 m-auto h-60 w-60 bg-black bg-opacity-90 select-none"
                  onClick={() => setShowEditAvatarPopup(true)}
                >
                  <div className="flex justify-center items-center h-full">
                    <Image
                      src="/edit.svg"
                      height={90}
                      width={90}
                      alt="Edit Icon"
                      className="filter invert cursor-pointer"
                    ></Image>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col p-10 pt-28 space-y-5 justify-center items-center">
              <h1 className="text-5xl font-bold">
                {user.firstName + ' ' + user.lastName}
              </h1>
              <h1 className="text-xl font-medium">
                {user.userProfile.headline}
              </h1>
              <p className="text-xl pb-10 w-full">
                {user.userProfile.description}
              </p>
              <button
                onClick={() => setShowContactInfo(true)}
                className="text-cyan-500 text-2xl rounded-full ring-2 ring-cyan-500 w-full p-4 hover:bg-cyan-50 font-semibold"
              >
                Contact
              </button>
            </div>
          </div>
          {featuredWork}
        </div>
        <div className="w-full border-2 rounded p-10">
          <ul className="flex w-full justify-center items-center space-x-20 text-center">
            {tabs}
          </ul>
        </div>
        <div className="min-h-[50vh]">{selectedTabComponent}</div>
      </div>
    </div>
  );
}
