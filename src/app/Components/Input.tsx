import React, { InputHTMLAttributes, useState } from "react";

type InputProps = {
  nativeProps: InputHTMLAttributes<HTMLInputElement>;
  helperText?: string | null;
};

const Input: React.FC<InputProps> = ({ nativeProps, helperText }) => {
  return (
    <div className="w-full">
      <input
        {...nativeProps}
        className={`w-full border p-2.5 rounded ${nativeProps.className || ""}`}
      />
      {helperText ? <p className="text-sm text-red-500 m-1 animate-fadeIn">{helperText}</p> : null}
    </div>
  );
};

export default Input;
