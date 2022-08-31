import { useState } from 'react';
import PopupOverlay from '../../PopupOverlay';

interface Props {
  closePopup: () => void;
  deleteItem: () => Promise<boolean>;
  deletedItemName: string;
}

export default function DeleteConfirmationPopup({
  closePopup,
  deleteItem,
  deletedItemName,
}: Props) {
  const [deleteError, setDeleteError] = useState(false);

  const handleDelete = async () => {
    const isDeleted = await deleteItem();
    setDeleteError(isDeleted);
  };

  return (
    <PopupOverlay
      setShowPopup={closePopup}
      backgroundOpacity={0}
      showCloseIcon={false}
    >
      <div className="fixed drop-shadow-lg w-1/3 h-1/3 rounded p-10 space-y-5 bg-white top-0 left-0 right-0 bottom-0 m-auto overflow-auto">
        <div className="absolute top-0 left-2 text-black text-sm md:text-lg mt-2 ml-2 text-center duration-300 transition-colors hover:text-red-400 cursor-pointer select-none">
          ✕
        </div>
        {deleteError ? (
          <p className="text-red-600">
            The request resource could not be deleted. Try Again Later.
          </p>
        ) : (
          <div className="flex flex-col justify-center align-center w-full h-5/6 text-center">
            <p>Are you sure you want to delete the {deletedItemName}</p>
            <div className="flex justify-center align-center md:gap-16 gap-5 flex-wrap w-full">
              <button
                className="font-bold text-cyan-600 hover:bg-gray-200 p-2 rounded"
                onClick={handleDelete}
              >
                Yes
              </button>
              <button
                className="font-bold text-red-600 hover:bg-gray-200 p-2 rounded"
                onClick={closePopup}
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </PopupOverlay>
  );
}
