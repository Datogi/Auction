import AuctionForm from "@/components/AuctionForm";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Add() {
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [itemUploaded, setItemUploaded] = useState("Uploading");
  return (
    <div className="bg-opacity-15 flex justify-center items-center ">
      {loading || (session.status == "loading" && <Loader />)}
      {session.status == "authenticated" &&
        !loading &&
        itemUploaded == "Uploading" && (
          <AuctionForm
            setLoading={setLoading}
            itemUploaded={itemUploaded}
            setItemUploaded={setItemUploaded}
          />
        )}{" "}
      {session.status == "unauthenticated" &&
        !loading &&
        itemUploaded == "Uploading" && (
          <div className="flex h-screen justify-center items-center ">
            <h1>Please Login in to add book information</h1>
          </div>
        )}
      {itemUploaded == "Success" && (
        <div className="h-screen w-screen flex-col flex justify-center items-center ">
          <div className="bg-gray-100 p-6 rounded-md shadow-md max-w-md mx-auto md:max-w-xl">
            <p className="text-green-500 font-bold text-lg md:text-xl mb-4">
              Your item has been successfully updated
            </p>

            <p className="mt-4 text-gray-600">
              Thank you for using our services. If you have any questions, feel
              free to{" "}
              <a href="/contact" className="text-blue-500 hover:underline">
                contact us
              </a>
              .
            </p>
            <div className="mt-6 md:flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Last updated:{new Date().getDate()}.{new Date().getMonth() + 1}.
                {new Date().getFullYear()}
              </p>
              <Link
                href={"/"}
                className="mt-4 md:mt-0 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Home Page
              </Link>
            </div>
          </div>
        </div>
      )}
      {itemUploaded == "Error" && (
        <div className="h-screen w-screen flex-col flex justify-center items-center ">
          <div className="bg-gray-100 p-6 rounded-md shadow-md max-w-md mx-auto md:max-w-xl">
            <p className="text-red-500 font-bold text-lg md:text-xl mb-4">
              Your item has not been Added
            </p>

            <p className="mt-4 text-gray-600">please try again later</p>
            <div className="mt-6 md:flex justify-between items-center">
              <Link
                href={"/"}
                className="mt-4 md:mt-0 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Home Page
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Add;
