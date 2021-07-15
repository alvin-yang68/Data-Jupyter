import React from "react";

export default function Loading(): React.ReactElement {
  return (
    <div className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-md text-yellow-700 bg-yellow-100 border border-yellow-300 ">
      <div className="text-xl font-normal  max-w-full flex-initial">
        <div className="p-2">Loading...</div>
      </div>
    </div>
  );
}
