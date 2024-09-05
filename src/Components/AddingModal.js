import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function AddingModal({ isOpen, OnClose, AddCity, City = [] }) {
  const dialogRef = useRef();

  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      )}

      <dialog
        ref={dialogRef}
        className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-gray-100 flex flex-col z-50 mx-4 sm:mx-auto rounded-md shadow-lg"
        style={{
          visibility: isOpen ? "visible" : "hidden",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 1 }}
        >
          <div className="relative p-4">
            <button
              onClick={OnClose}
              className="absolute top-0 right-5 text-black font-bold text-3xl"
            >
              X {/* &times; */}
            </button>
            <h1 className="text-center text-black font-bold text-xl mt-5">
              Available Cities
            </h1>
          </div>
          <div className="flex-grow px-4 pb-4">
            {City.length > 0 ? (
              <div className="flex flex-col mt-5 space-y-4">
                {City.map((item ,index) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.25 }}
                    key={index}
                    className="flex flex-col justify-between items-start border-b pb-2"
                  >
                    <div className="flex justify-between items-center w-full">
                      <p className="font-semibold text-base sm:text-lg">
                        {item.name}
                      </p>
                      <button
                        className="px-3 py-1 bg-black text-white hover:bg-gray-800 rounded text-sm sm:text-base"
                        onClick={() => AddCity(item)}
                        disabled={item.added}
                      >
                        Add
                      </button>
                    </div>
                    {item.added ? (
                      <p className="text-red-500 mt-2">City Added!</p>
                    ) : null}
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-center text-xl font-semibold mt-10 mb-20">
                No Cities Available
              </p>
            )}
          </div>
        </motion.div>
      </dialog>
    </>
  );
}
