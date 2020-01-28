import React from "react";
import "../App.css";

//props recieved from mapInfo.jsx
const SearchBar = ({ value, onChange }) => {
  return (
    <input
      name="query"
      type="text"
      className="form-control"
      id="search"
      placeholder="Enter Name, Email or CNIC"
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBar;
