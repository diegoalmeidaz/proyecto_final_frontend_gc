function Select({
    options,
    label,
    name,
    defaultValue = '',
    onChange,
  }) {
    return (
      <div>
        <select
          onChange={onChange}
          name={name}
          defaultValue={defaultValue}
          className="select ph2 pv1 br2 bn"
        >
          <option value="" disabled>
            {label}
          </option>
          {options.map((option, key) => (
            <option key={key} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  
  export default Select;
  