import React from 'react';

const AdvertSpinner = () => {
  return (
    <div className="flex items-center justify-center mt-4">
      <div class="py-2 text-blue-600">
      <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <g>
          <path d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843" fill="none" stroke="currentColor" stroke-width="12"></path>
          <path d="M49 3L49 27L61 15L49 3" fill="currentColor"></path>
          <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
        </g>
      </svg>
    </div>
      {/* <svg
        className="animate-spin h-10 w-10 mr-3 text-gray-700"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042.87 5.855 2.291 8.209l1.416-1.416A5.965 5.965 0 012 12H6zm10 6.209A7.962 7.962 0 0020 12h4c0 6.627-5.373 12-12 12v-4c3.042 0 5.855-.87 8.209-2.291l-1.416-1.416z"
        ></path>
      </svg> */}
      <span className="text-gray-600 text-2xl font-semibold">Loading Advert...</span>
    </div>
  );
};

export default AdvertSpinner;