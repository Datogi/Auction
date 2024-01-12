import React, { useEffect } from "react";

export default function TextArea({ id, value, onChange, text, name, error }) {
  return (
    <div className="mb-4 ">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {text}:
      </label>
      <div className="relative  mt-1">
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full  px-4 py-2 border-2 rounded-md focus:outline-none focus:border-blue-500 text-lg ${
            error ? "border-red-500" : "border-gray-300"
          } placeholder-gray-500`}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="h-5 w-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
