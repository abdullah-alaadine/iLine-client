import React from 'react';

const SearchBar = () => {
  return (
    <div className="relative mx-4">
      <input
        type="text"
        placeholder="Search..."
        className="pl-10 pr-4 py-2 rounded-md bg-white border-gray-300 border focus:outline-none focus:border-blue-500"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8.427 15.428a7.5 7.5 0 111.06-1.06l4.548 4.548a.75.75 0 001.06-1.06l-4.548-4.548zm5.303-2.77a5 5 0 11-7.072-7.072 5 5 0 017.072 7.072z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
