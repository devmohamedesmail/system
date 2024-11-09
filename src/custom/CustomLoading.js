import React from "react";
import { ThreeDots } from "react-loader-spinner";

export default function CustomLoading() {
  return (
    <div className="flex justify-center items-center ">
      <ThreeDots
        visible={true}
        height="80"
        width="100%"
        color="#4c0054"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />

    </div>
  );
}
