import { FormEvent, MouseEvent, useEffect, useState } from 'react';
import Image from 'next/future/image';
import PopupOverlay from '../../PopupOverlay';
import axios from '../../../config/axios';
import { getAuthCookie } from '../../../auth/auth';

interface Props {
  currentAvatar: string;
  setShowEditAvatarPopup: (val: boolean) => void;
}

export default function EditAvatarPopup({
  currentAvatar,
  setShowEditAvatarPopup,
}: Props) {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [avatarPreview, setAvatarPreview] = useState('');
  const [uploadErrors, setUploadErrors] = useState('');

  useEffect(() => {
    if (!selectedFile) {
      setAvatarPreview('');
      return;
    }

    const avatarURL = URL.createObjectURL(selectedFile);
    setAvatarPreview(avatarURL);

    return () => URL.revokeObjectURL(avatarURL);
  }, [selectedFile]);

  const onFileSelect = (event: FormEvent) => {
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(target.files[0]);
  };

  const browseFiles = (event: MouseEvent) => {
    event.preventDefault();
    const fileInput = document.getElementById('avatar');
    fileInput!.click();
  };
  const saveAvatar = async () => {
    const form = document.querySelector('form');
    const data = new FormData(form!);
    const response = await axios.put('/users/avatar', data, {
      headers: {
        Authorization: 'Bearer ' + getAuthCookie(),
      },
    });

    if (response.status >= 400) {
      setUploadErrors(response.data.message);
      return;
    }

    document.location.href = document.URL;
  };

  return (
    <PopupOverlay setShowPopup={setShowEditAvatarPopup}>
      <div className="absolute flex flex-col space-y-2 justify-center w-2/5 items-center top-0 bottom-0 right-0 left-0 m-auto p-2 bg-white rounded z-20 overflow-auto transparent-scrollbar aspect-square box-border">
        {avatarPreview !== '' || currentAvatar !== '' ? (
          <Image
            src={avatarPreview !== '' ? avatarPreview : currentAvatar}
            height={300}
            width={300}
            alt="Avatar"
            className="aspect-square mt-36 md:mt-20 md2:mt-0"
          ></Image>
        ) : (
          <h1 className="w-full flex justify-center items-center aspect-square">
            No Avatar Selected
          </h1>
        )}
        <form className="hidden" encType="multipart/form-data">
          <input
            type="file"
            id="avatar"
            name="avatar"
            onChange={onFileSelect}
            className="hidden"
          ></input>
        </form>
        <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-2">
          <button
            className="block p-1 text-cyan-500 border-2 rounded border-cyan-500 hover:bg-slate-200"
            onClick={(event) => browseFiles(event)}
          >
            Browse
          </button>
          <button
            className="block p-1 text-green-500 border-2 rounded border-green-500 hover:bg-slate-200"
            onClick={saveAvatar}
          >
            Save
          </button>
          <button
            className="block p-1 text-slate-500 border-2 rounded border-slate-500 hover:bg-slate-200"
            onClick={saveAvatar}
          >
            Restore Default
          </button>
        </div>
        <p className="text-center text-red-500 text-sm mx-2 px-1">
          {uploadErrors}
        </p>
      </div>
    </PopupOverlay>
  );
}
