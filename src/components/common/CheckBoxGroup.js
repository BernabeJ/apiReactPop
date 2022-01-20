function CheckboxGroup({ options, value, onChange, ...props }) {
  const handleChange = ev => {
    const { name, checked, value: optionValue } = ev.target;
    onChange({
      target: {
        name,
        value: checked
          ? [...value, optionValue]
          : value.filter(v => v !== optionValue),
      },
    });
  };

  return (
    <div>
      {options.map(option => (
        <label key={option}>
          <input
            type="checkbox"
            value={option}
            checked={value.includes(option)}
            onChange={handleChange}
            {...props}
          />
          {option}
        </label>
      ))}
    </div>
  );
}


export default CheckboxGroup;