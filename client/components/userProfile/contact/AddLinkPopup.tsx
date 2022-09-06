import { FormEvent, useState } from 'react';
import FloatingLabelInput from '../../FloatingLabelField';
import PopupOverlay from '../../PopupOverlay';
import axios from '../../../config/axios';
import { getAuthCookie } from '../../../auth/auth';

interface Props {
  setShowAddLinkPopup: (val: boolean) => void;
  setRefetchUserData: (val: boolean) => void;
}

export default function AddLinkPopup({
  setShowAddLinkPopup,
  setRefetchUserData,
}: Props) {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');

  const normalizeUrl = (url: string): string => {
    const prefix = url.slice(0, 4);

    if (prefix === 'http') {
      if (url.length > 5 && url[4] === 's') {
        return url;
      } else {
        return 'https://' + url.slice(7);
      }
    }

    return 'https://' + url;
  };

  const clearErrors = () => {
    setNameError('');
    setUrlError('');
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    clearErrors();

    const response = await axios.post(
      '/users/links',
      { name: name, url: normalizeUrl(url) },
      { headers: { Authorization: 'Bearer ' + getAuthCookie() } }
    );

    if (response.status === 400) {
      for (const error of response.data.errors) {
        if (error.param === 'name') {
          setNameError(error.msg);
        } else {
          setUrlError(error.msg);
        }
      }
    } else {
      setRefetchUserData(true);
      setShowAddLinkPopup(false);
    }
  };

  return (
    <PopupOverlay setShowPopup={setShowAddLinkPopup}>
      <div className="fixed rounded w-1/2 h-2/3 p-10 left-0 right-0 top-0 bottom-0 m-auto bg-white space-y-10 overflow-auto min-w-min transparent-scrollbar">
        <div className="flex flex-col h-full w-full">
          <div className="m-auto w-full">
            <h1 className="text-center font-semibold text-2xl mb-5">
              Add New Link
            </h1>
            <form noValidate onSubmit={handleSubmit}>
              <FloatingLabelInput
                isRequired={true}
                placeholder="Link Name"
                setValue={setName}
                type="text"
                error={nameError}
                value={name}
              ></FloatingLabelInput>
              <FloatingLabelInput
                isRequired={true}
                placeholder="Url"
                setValue={setUrl}
                type="text"
                error={urlError}
                value={url}
              ></FloatingLabelInput>
              <input
                type="submit"
                className="w-full mt-5 p-1 mx-2 text-cyan-500 border-2 rounded border-cyan-500  hover:bg-slate-200 hover:cursor-pointer"
              ></input>
            </form>
          </div>
        </div>
      </div>
    </PopupOverlay>
  );
}
