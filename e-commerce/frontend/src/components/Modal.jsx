/* eslint-disable react/prop-types */

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute right-[25%] top-[45%] z-10 rounded-lg bg-[#161622] p-4 text-right ring-4 ring-[#FF10F0] max-phone:right-[10%] lg:right-[45%] lg:w-[20%]">
            <button
              className="mr-2 font-semibold text-white hover:text-pink-500 focus:outline-none"
              onClick={onClose}
            >
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
