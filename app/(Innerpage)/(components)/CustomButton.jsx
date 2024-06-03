// components/CustomButton.js
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyle,
  textStyles,
  isLoading,
}) => {
  return (
    <button
      onClick={handlePress}
      disabled={isLoading}
      className={`bg-primary rounded-md min-h-[50px] flex justify-center items-center ${containerStyle} ${
        isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-dark"
      }`}
      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
    >
      {isLoading ? (
        <div className="spinner-border text-white" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <span className={`text-white font-bold text-lg ${textStyles}`}>
          {title}
        </span>
      )}
    </button>
  );
};

export default CustomButton;
