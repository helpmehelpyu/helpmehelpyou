import axios from '../../config/axios';
import { UserData } from '../../types/UserData';
import { GetServerSideProps } from 'next';
import UserProfile from '../../components/UserProfile';

interface Props {
  user: UserData;
}

export default function Me({ user }: Props) {
  return <UserProfile user={user}></UserProfile>;
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
