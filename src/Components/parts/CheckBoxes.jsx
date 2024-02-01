/* eslint-disable react/prop-types */
// import { useState } from "react";
import CheckBox from "./CheckBox";
// import IndiCheckbox from "./IndiCheckbox";

const CheckBoxes = ({ data, bringFilter, selected, setSelected }) => {
  const listOptions = data;
  // const [selected, setSelected] = useState([]);

  function handleSelect(value, option) {
    if (value) {
      if (!selected.includes(option)) {
        setSelected([...selected, option]);
      }
    } else {
      const updatedSelected = selected.filter(
        (item) => item.length > 0 && item !== item
      );
      setSelected(updatedSelected);
      // setSelected([selected.filter((value) => value !== value)]);
    }
  }
  function clearAll() {
    setSelected([]);
    bringFilter();
  }

  // function handleOption(value,option){
  //   if (value) {
  //     if (!selected.includes(option)) {
  //       setSelected([...selected, option]);
  //     }
  //   } else {
  //     setSelected([selected.filter((item) => item !== option)]);
  //   }
  // }
  // console.log(selected);
  return (
    <div className="checkboxes">
      {listOptions &&
        listOptions.map((item, index) => (
          // <IndiCheckbox   key={index}   option={item.name} updateOptions={handleOption}  value={item.uuid}  ticked={selected.includes(item.uuid)} />
          <CheckBox
            key={index}
            option={item.name}
            value={selected.includes(item.uuid)}
            updateValue={handleSelect}
            id={item.uuid}
          />
        ))}
      <button
        className="btn apply"
        onClick={() => {
          bringFilter(selected, selected.length);
        }}
      >
        Apply
      </button>
      <button className="btn remove" onClick={clearAll}>
        Remove filter
      </button>
    </div>
  );
};

export default CheckBoxes;
{
  /* <button
        className="btn cancel"
      >
        Cancel
      </button> */
}
