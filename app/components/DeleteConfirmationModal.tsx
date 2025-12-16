import React from "react";

interface DeleteModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm?: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteModalProps> = ({
  isOpen,
  setOpen,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    setOpen(false);
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box text-[#272622] max-w-[700px] xl:max-w-[30%] rounded-none relative bg-[#EAEAEA] p-6">
        {/* Heading */}

        {/* Confirmation Message */}
        <p className="text-[#272622] leading-[100%] xl:leading-6 text-[18px] text-center font-[400] mb-4 xl:mb-6">
          Are you sure you want to permanently delete this address?
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 w-auto m-auto">
          {/* Cancel Button */}
          
          <button
          onClick={() => setOpen(false)}
                className=" mt-5
    relative rounded-[50px] overflow-hidden w-[50%] cursor-pointer
    p-[1px]
    bg-[linear-gradient(179deg,#013FE8_0%,#8725EA_100%)]
    group
  "
              >
                {/* Sliding background */}
                <span
                  className="
      absolute inset-0
      bg-[linear-gradient(179deg,#013FE8_0%,#8725EA_100%)]
      w-0
      transition-all duration-500 ease-in-out
      group-hover:w-full
      origin-left
      rounded-[50px]
    "
                ></span>
                {/* Actual button content */}
                <span
                  className="
      relative z-10
      flex items-center gap-3 justify-center
      rounded-[50px]
      bg-[#eaeaea]
      py-3 px-6
      text-[#272622]
      transition-all duration-500 ease-in-out
      group-hover:bg-transparent
      group-hover:text-white
    "
                >
                  <span className="text-[16px] font-[400] leading-[100%]">
                    Cancel
                  </span>
                </span>
              </button>

          {/* Confirm Delete Button */}
          
          <button
            onClick={handleConfirm}
            className=" mt-5
    relative rounded-[50px] overflow-hidden w-[50%] cursor-pointer
    p-[1px]
    bg-[linear-gradient(179deg,#013FE8_0%,#8725EA_100%)]
    group
  "
          >
            {/* Sliding background */}
            <span
              className="
      absolute inset-0
      bg-[linear-gradient(179deg,#013FE8_0%,#8725EA_100%)]
      w-0
      transition-all duration-500 ease-in-out
      group-hover:w-full
      origin-left
      rounded-[50px]
    "
            ></span>
            {/* Actual button content */}
            <span
              className="
      relative z-10
      flex items-center gap-3 justify-center
      rounded-[50px]
      bg-[#eaeaea]
      py-3 px-6
      text-[#272622]
      transition-all duration-500 ease-in-out
      group-hover:bg-transparent
      group-hover:text-white
    "
            >
              <span className="text-[16px] font-[400] leading-[100%]">
                Delete
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop" onClick={() => setOpen(false)}></div>
    </div>
  );
};

export default DeleteConfirmationModal;
