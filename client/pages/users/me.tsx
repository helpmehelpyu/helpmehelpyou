import axios from '../../config/axios';
import { UserData } from '../../types/UserData';
import { GetServerSideProps } from 'next';
import UserProfile from '../../components/userProfile/UserProfile';

interface Props {
  user: UserData;
}

const Me = ({ user }: Props) => {
  return <UserProfile initialUserData={user} canEdit={true}></UserProfile>;
};

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

export default Me;
