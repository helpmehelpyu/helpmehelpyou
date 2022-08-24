import axios from '../../config/axios';
import { GetServerSideProps } from 'next';
import { UserData } from '../../types/UserData';
import UserProfile from '../../components/userProfile/UserProfile';

interface Props {
  user: UserData | null;
  isCurrentUser: boolean;
}

export default function UserIdProfile({ user, isCurrentUser }: Props) {
  if (user) {
    return (
      <UserProfile initialUserData={user} canEdit={isCurrentUser}></UserProfile>
    );
  }

  return <h1>404 user not found</h1>;
  // return <UserNotFoundPage></UserNotFoundPage>; // TODO create user not found page
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  let response = await axios.get('/users/' + params!.userId, {
    headers: {
      Authorization: 'Bearer ' + req.cookies['auth_token'],
    },
  });

  let user: UserData | null = null;
  if (response.status === 200) {
    user = response.data;
  }

  response = await axios.get('/users/me', {
    headers: {
      Authorization: 'Bearer ' + req.cookies['auth_token'],
    },
  });

  let currentUser: UserData | null = null;
  if (response.status === 200) {
    currentUser = response.data;
  }

  return {
    props: {
      user: user,
      isCurrentUser: currentUser && user && currentUser.id === user.id,
    },
  };
};
