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
      opaqueBackground={true}
      showCloseIcon={false}
    >
      <div className="fixed drop-shadow-lg w-1/3 h-1/3 text-xl rounded p-10 space-y-5 bg-white top-0 left-0 right-0 bottom-0 m-auto min-w-min overflow-auto transparent-scrollbar">
        {deleteError ? (
          <p className="text-red-600">
            The request resource could not be deleted. Try Again Later.
          </p>
        ) : (
          <div className="flex flex-col w-full h-full text-center">
            <div className="m-auto">
              <p>Are you sure you want to delete the {deletedItemName}</p>
              <div className="flex justify-center align-center md:gap-16 gap-5 flex-wrap w-full mt-10">
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
          </div>
        )}
      </div>
    </PopupOverlay>
  );
}
