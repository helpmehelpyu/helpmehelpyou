import { useEffect, useState } from 'react';
import { MediaResult } from '../types/MediaResult';
import axios from '../config/axios';
import HomeItem from '../components/home/homeItem';

enum OrderBy {
  newest = 'newest',
  oldest = 'oldest',
}

enum DataState {
  init,
  loading,
  success,
  failure,
}

export default function Home() {
  const [media, setMedia] = useState<MediaResult[]>([]);
  const [orderBy, setOrderBy] = useState<OrderBy>(OrderBy.newest);
  const [page, setPage] = useState(1);
  const [mediaCards, setMediaCards] = useState<JSX.Element[]>([]);
  const [dataState, setDataState] = useState(DataState.init);
  const [dataError, setDataError] = useState('');
  const limit = 10;

  useEffect(() => {
    setDataState(DataState.loading);
    axios
      .get(`/media?orderBy=${orderBy}&limit=${limit}&page=${page}`)
      .then((response) => {
        if (response.status === 200) {
          const newMedia = response.data.media;
          setMedia((oldMedia) => [...oldMedia, ...newMedia]);
          setDataState(DataState.success);
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
    for (const mediaItem of media) {
      setMediaCards((oldMediaCards) => [
        ...oldMediaCards,
        <HomeItem key={mediaItem.id} media={mediaItem}></HomeItem>,
      ]);
    }
  }, [media]);

  return (
    <div className="flex flex-col justify-center items-center gap-10 py-10 bg-slate-50 min-h-screen">
      {mediaCards}
      {dataState == DataState.failure && dataError !== '' && <p>{dataError}</p>}
    </div>
  );
}
