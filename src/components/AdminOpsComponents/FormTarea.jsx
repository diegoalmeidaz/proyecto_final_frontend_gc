import React from "react";

function FormTextarea({ label, name, value, onChange, required, rows }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="border rounded w-full p-2"
        rows={rows}
      ></textarea>
    </div>
  );
}

export default FormTextarea;
