// components/FormField.js
import React, { useState } from "react";
// import icons from "../constants/icons"; // Ensure you have the path correct for your project

const FormField = ({
  title,
  value,
  handleChangeText,
  placeholder,
  otherStyles,
  keyboardType = "text",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`space-y-2 ${otherStyles}`}>
      <span className="text-base text-gray-100 font-lregular">{title}</span>
      <div className="border border-primary-dark dark:border-white/50 w-full h-16 bg-dark-50 rounded-lg focus:border-primary items-center flex px-3">
        <input
          className="flex-1 dark:text-white font-lregular text-base bg-transparent border-none outline-none"
          type={(title === "Password" || placeholder === "Password") && !showPassword ? "password" : keyboardType}
          value={value}
          placeholder={placeholder}
          onChange={(e) => handleChangeText(e.target.value)}
          {...props}
        />
        {/* {(title === "Password" || placeholder === "Password") && (
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            <img
              src={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              alt="Toggle visibility"
            />
          </button>
        )} */}
      </div>
    </div>
  );
};

export default FormField;
