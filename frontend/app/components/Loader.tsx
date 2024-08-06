import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh] ">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-700">Loading...</p>
    </div>
  );
};

export default Loader;    