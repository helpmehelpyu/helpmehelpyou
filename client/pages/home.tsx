import { useEffect, useState } from 'react';
import { MediaResult } from '../types/MediaResult';
import axios from '../config/axios';
import HomeItem from '../components/home/homeItem';

enum OrderBy {
  newest = 'newest',
  oldest = 'oldest',
}

enum DataState {
  loading,
  success,
  failure,
  nodata,
}

const Home = () => {
  const [media, setMedia] = useState<MediaResult[]>([]);
  const [orderBy, setOrderBy] = useState<OrderBy>(OrderBy.newest);
  const [page, setPage] = useState(1);
  const [mediaCards, setMediaCards] = useState<JSX.Element[]>([]);
  const [dataState, setDataState] = useState(DataState.loading);
  const [dataError, setDataError] = useState('');
  const limit = 10;

  useEffect(() => {
    setDataState(DataState.loading);
    axios
      .get(`/media?orderBy=${orderBy}&limit=${limit}&page=${page}`)
      .then((response) => {
        if (response.status === 200) {
          const newMedia: MediaResult[] = response.data.media;
          if (newMedia.length === 0) {
            setDataState(DataState.nodata);
          } else {
            setMedia((oldMedia) => [...oldMedia, ...newMedia]);
            setDataState(DataState.success);
          }
        } else {
          setDataState(DataState.failure);
          setDataError(response.data.message);
        }
      })
      .catch((err) => {
        setDataState(DataState.failure);
        setDataError(err.message || err.response.data.message);
      });
  }, [orderBy, page]);

  useEffect(() => {
    const newMediaCards = [];
    for (const mediaItem of media) {
      newMediaCards.push(
        <HomeItem key={mediaItem.id} media={mediaItem}></HomeItem>
      );
    }
    setMediaCards(newMediaCards);
  }, [media]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.pageYOffset >=
          document.body.offsetHeight - 2 &&
        dataState === DataState.success
      ) {
        setPage((page) => page + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dataState]);

  return (
    <div className="flex flex-col justify-center items-center gap-10 py-10 bg-slate-50 min-h-screen w-full">
      {mediaCards}
      {dataState === DataState.failure && dataError !== '' && (
        <p className="text-center text-3xl font-bold text-red-500">
          {dataError}
        </p>
      )}
      {dataState === DataState.nodata && (
        <p className="text-3xl font-light">That&apos;s all folks!</p>
      )}
      {dataState === DataState.loading && (
        <p className="text-3xl font-light">Loading...</p>
      )}
    </div>
  );
};

export default Home;
