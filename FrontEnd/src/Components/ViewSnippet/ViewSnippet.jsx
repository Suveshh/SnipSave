import React from "react";

const ViewSnippet = ({ snippet, onEditClick, currentUser }) => {
  return (
    <div className="min-h-screen w-full rounded-2xl m-0 p-0 bg-gray-900 flex items-center justify-center ">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-3xl">
        <h1 className="text-white text-4xl font-extrabold mb-8 mt-2 text-center">
          {snippet.name}
        </h1>
        <div className="mb-4">
          <p className="text-white text-lg">Author: {snippet.author}</p>
          <p className="text-white text-lg">Date: {snippet.date}</p>
          <p className="text-white text-lg">Language: {snippet.language}</p>
          <pre className="whitespace-pre-wrap text-white">{snippet.code}</pre>
        </div>

        <div className="flex justify-center items-center">
          <button className="bg-gray-600 mx-3 rounded-full text-white py-2 px-4 shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Back
          </button>
          {snippet.author === currentUser && ( // Conditional rendering based on author
            <button
              onClick={onEditClick}
              className="bg-blue-600 mx-3 rounded-full text-white py-2 px-4 shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewSnippet;
