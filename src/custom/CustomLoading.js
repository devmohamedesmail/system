import React from "react";
import { ThreeCircles } from "react-loader-spinner";

export default function CustomLoading() {
  return (
    <div className="flex justify-center items-center">
      <ThreeCircles
        visible={true}
        height="40"
        width="40"
        color="#4c0054"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      
    </div>
  );
}
