import React from "react";

const FeedbackMessages = ({ error, success }) => {
  return (
    <div className="mt-4 flex flex-col gap-2">
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md shadow-md">
          <p className="font-bebas">{error}</p>
        </div>
      )}
      {success && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-md shadow-md">
          <p className="font-bebas">{success}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackMessages;
