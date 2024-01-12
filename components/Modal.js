import Link from "next/link";
import React from "react";

const Modal = ({ message }) => {
  return (
    <div className={`modal block`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">{message}</div>
        <Link
          href={"/"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
        >
          Close
        </Link>
      </div>
    </div>
  );
};

export default Modal;
