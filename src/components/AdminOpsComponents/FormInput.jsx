import React from "react";

function FormInput({ label, name, type, value, onChange, required }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="border rounded w-full p-2"
      />
    </div>
  );
}

export default FormInput;
