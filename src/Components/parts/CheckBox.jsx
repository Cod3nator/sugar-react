// import { useState } from "react";

// eslint-disable-next-line react/prop-types
function CheckBox({ id, option, value = false, updateValue = () => {} }) {
  const handleChange = () => {
    updateValue(!value, id);
  };
  return (
    <div className="">
      <input
        type="checkbox"
        value={id}
        checked={value}
        onChange={handleChange}
      />
      <label>{option}</label>
    </div>
  );
}
export default CheckBox;
