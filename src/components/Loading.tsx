import React from "react";

const Loading = () => {
  return (
    <div className="flex fixed inset-0 justify-center items-center bg-black bg-opacity-30">
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );
};

export default Loading;
