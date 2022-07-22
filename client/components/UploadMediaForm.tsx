import axios from "../config/axios";
import { FormEvent, useState } from "react";
import { getAuthCookie } from "../auth/auth";

export default function UploadMediaForm() {
  const [titleErrors, setTitleErrors] = useState("");
  const [descriptionErrors, setDescriptionErrors] = useState("");
  const [fileErrors, setFileErrors] = useState("");
  const [canSubmit, setCanSubmit] = useState(true);

  const clearErrors = () => {
    setTitleErrors("");
    setDescriptionErrors("");
    setFileErrors("");
  };

  const uploadMedia = async (event: FormEvent) => {
    event.preventDefault();

    if (!canSubmit) return;
    setCanSubmit(false);

    const mediaData = new FormData(event.target as HTMLFormElement);
    const response = await axios.post("/media", mediaData, {
      headers: {
        Authorization: "Bearer " + getAuthCookie(),
      },
    });

    clearErrors();
    if (response.status === 201) {
      document.location.href = "/media/" + response.data.mediaId;
    } else {
      setCanSubmit(true);
      setFileErrors(
        (response.data.fileError && response.data.fileError.message) || ""
      );

      for (const error of response.data.validationErrors) {
        if (error.param === "title") {
          setTitleErrors(error.msg);
        } else {
          setDescriptionErrors(error.msg);
        }
      }
    }
  };

  return (
    <div className="rounded bg-white p-5 border-2 w-1/3">
      <h1 className="p-1 m-2 text-2xl">Upload</h1>
      <form onSubmit={uploadMedia} encType="multipart/form-data" noValidate>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="rounded focus:outline-none w-full border-2 focus:bg-slate-100 p-1 m-2"
        ></input>
        <p className="text-red-500 text-sm mx-2 px-1">{titleErrors}</p>
        <input
          type="text"
          name="description"
          placeholder="Description"
          className="rounded focus:outline-none w-full border-2 focus:bg-slate-100 p-1 m-2"
        ></input>
        <p className="text-red-500 text-sm mx-2 px-1">{descriptionErrors}</p>
        <input
          type="file"
          name="media"
          className="rounded focus:outline-none w-full border-2 focus:bg-slate-100 p-1 m-2"
        ></input>
        <p className="text-red-500 text-sm mx-2 px-1">{fileErrors}</p>
        <input
          type="submit"
          className="m-2 p-1 text-cyan-500 border-2 rounded border-cyan-500"
        ></input>
      </form>
    </div>
  );
}
