import React from "react";
import { Oval } from "react-loader-spinner";

function Loader() {
  return (
    <div className="flex justify-center items-center  w-screen h-screen">
      <Oval
        height={80}
        width={80}
        color="orange-200"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#2658ceeb"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
}

export default Loader;
