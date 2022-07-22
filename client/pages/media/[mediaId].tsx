import axios from "../../config/axios";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { MediaResult } from "../../types/MediaResult";
import Link from "next/link";

interface Props {
  media: MediaResult;
  isAuthor: boolean;
}

export default function Media({ media, isAuthor }: Props) {
  if (!media) {
    return <h1>No media</h1>;
  }
  return (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="flex items-center justify-center py-10 rounded-lg bg-white border-2">
        <div className="w-[50vw] h-[50vh] relative">
          <Image
            src={media.source}
            layout="fill"
            objectFit="contain"
            alt=""
          ></Image>
        </div>
        <div className="w-[20vw] h-[50vh] p-5">
          <h1>{media.title}</h1>
          <Link href={"/users/" + media.author.id}>
            <a className="my-2">
              {media.author.firstName} {media.author.lastName}
            </a>
          </Link>
          <p className="my-10"> {media.description}</p>
          <p>{new Date(media.uploadDate).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  let response = await axios.get(`/media/${query.mediaId}`);

  let media = null;
  if (response.status === 200) {
    media = response.data;
  }

  let user = null;
  if (req.headers.cookie) {
    response = await axios.get("/users/me", {
      headers: {
        Authorization: "Bearer " + req.cookies.auth_token,
      },
    });
    user = response.data;
  }

  return {
    props: {
      media: media,
      isAuthor: user && media && user.id === media.author.id,
    },
  };
};
