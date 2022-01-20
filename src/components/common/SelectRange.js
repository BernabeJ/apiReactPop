import React from 'react';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

function SelectRange({ name, onChange, min, max, ...props }) {
  const handleChange = ([minValue, maxValue]) => {
    onChange({ target: { name, value: [minValue || min, maxValue || max] } });
  };
  return <Range onChange={handleChange} min={min} max={max} {...props} />;
}

export default SelectRange;