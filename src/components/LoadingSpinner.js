import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="text-center text-primary my-auto mx-auto">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="font-medium text-primary">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
