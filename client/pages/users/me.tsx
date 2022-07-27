import axios from '../../config/axios';
import { UserData } from '../../types/UserData';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import MediaPagination from '../../components/MediaPagination';

interface Props {
  user: UserData;
}

enum Tabs {
  WorkSamples,
  Skills,
  Experience,
  Education,
}

export default function Me({ user }: Props) {
  const [selectedTab, setSelectedTab] = useState(Tabs.WorkSamples);

  const [selectedTabComponent, setSelectedTabComponent] = useState(
    <MediaPagination media={user.workSamples}></MediaPagination>
  );

  useEffect(() => {
    switch (selectedTab) {
      case Tabs.WorkSamples:
        setSelectedTabComponent(
          <MediaPagination media={user.workSamples}></MediaPagination>
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
  }, [selectedTab, user]);

  return (
    <div className="bg-gray-50 space-y-10 p-10 min-h-screen md:min-w-0 min-w-min">
      <div className="flex flex-col xl:flex-row xl:space-x-5 xl:justify-center xl:items-stretch space-y-10 xl:space-y-0">
        <div className="xl:rounded-r-2xl border-2 xl:bg-white xl:w-1/3 rounded">
          <div className="relative h-56 bg-slate-200 xl:rounded-tr-xl">
            <div className="absolute ring-4 ring-white rounded-full -bottom-20 left-0 right-0 m-auto bg-white h-60 w-60">
              <Image
                src="https://res.cloudinary.com/dmtigi69n/image/upload/v1644902654/1644902654314.jpg"
                layout="fill"
                objectFit="cover"
                alt="loading..."
                className="rounded-full"
              ></Image>
            </div>
          </div>
          <div className="flex flex-col p-10 pt-28 space-y-5 justify-center items-center">
            <h1 className="mb-5 text-5xl font-bold">
              {user.firstName + ' ' + user.lastName}
            </h1>
            <p className="text-xl pb-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <button className="text-cyan-500 text-2xl rounded-full ring-2 ring-cyan-500 w-full p-4 hover:bg-cyan-50 font-semibold">
              Contact
            </button>
          </div>
        </div>
        <div className="space-y-10 xl:w-2/3 border-2 xl:rounded-l-2xl bg-white rounded min-w-max pt-5">
          <h1 className="text-3xl font-bold text-center">Featured Work</h1>
          <div className="relative xl:h-[90%] h-[50vw]">
            <Image
              alt=""
              layout="fill"
              objectFit="contain"
              src="https://res.cloudinary.com/dmtigi69n/image/upload/v1658469339/pxycjjhlxjnnidjl4or6.jpg"
            ></Image>
          </div>
        </div>
      </div>
      <div className="w-full border-2 rounded p-10">
        <ul className="flex w-full justify-center items-center space-x-20 text-center">
          <li>
            <button
              onClick={() => setSelectedTab(Tabs.WorkSamples)}
              className={
                'xl:text-lg hover:underline p-2 rounded hover:bg-gray-200' +
                (selectedTab === Tabs.WorkSamples
                  ? ' text-cyan-500 border border-cyan-500  font-bold'
                  : '')
              }
            >
              Work Samples
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedTab(Tabs.Skills)}
              className={
                'xl:text-lg hover:underline p-2 rounded hover:bg-gray-200' +
                (selectedTab === Tabs.Skills
                  ? ' text-cyan-500 border border-cyan-500  font-bold'
                  : '')
              }
            >
              Skills
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedTab(Tabs.Experience)}
              className={
                'xl:text-lg hover:underline p-2 rounded hover:bg-gray-200' +
                (selectedTab === Tabs.Experience
                  ? ' text-cyan-500 border border-cyan-500  font-bold'
                  : '')
              }
            >
              Experience
            </button>
          </li>
          <li>
            <button
              onClick={() => setSelectedTab(Tabs.Education)}
              className={
                'xl:text-lg hover:underline p-2 rounded hover:bg-gray-200' +
                (selectedTab === Tabs.Education
                  ? ' text-cyan-500 border border-cyan-500 font-bold'
                  : '')
              }
            >
              Education
            </button>
          </li>
        </ul>
        <div></div>
      </div>
      <div className="min-h-[50vh]">{selectedTabComponent}</div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const response = await axios.get('/users/me', {
    headers: {
      Authorization: 'Bearer ' + req.cookies['auth_token'],
    },
  });

  let user: UserData;
  if (response.status === 200) {
    user = response.data;
  } else {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: user,
    },
  };
};
