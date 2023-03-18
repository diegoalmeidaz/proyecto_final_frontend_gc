import React from "react";

function FormCheckbox({ label, name, checked, onChange }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-2">
        {label}
      </label>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        className="border rounded"
      />
    </div>
  );
}

export default FormCheckbox;
