import BookForm from "@/components/BookForm";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

function Add() {
  const session = useSession();
  useEffect(() => {
    console.log(session);
  });
  return (
    <div className="flex justify-center items-center ">
      {session.status == "authenticated" ? (
        <BookForm />
      ) : (
        <div className="flex h-screen justify-center items-center ">
          <h1>Please Login in to add book information</h1>
        </div>
      )}
    </div>
  );
}

export default Add;
