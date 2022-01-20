
function RadioGroup({ options, value, ...props }) {
  return (
    <div>
      {options.map(({ value: optionValue, label }) => (
        <label key={optionValue}>
          <input
            type="radio"
            value={optionValue}
            checked={optionValue === value}
            {...props}
          />
          {label}
        </label>
      ))}
    </div>
  );
}

export default RadioGroup;
