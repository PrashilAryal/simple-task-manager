import React, { useState } from "react";
import "../../app.css";

const TextBox = ({ type, placeholder, onTextChange }) => {
  const [textBoxValue, setTextBoxValue] = useState("");
  const handleTextBoxChange = async (e) => {
    setTextBoxValue(e.target.value);
    if (onTextChange) {
      onTextChange(e.target.value);
    }
  };

  return (
    <div className="textBox">
      <input
        className="textBox__input"
        type={type}
        value={textBoxValue}
        placeholder={placeholder}
        onChange={handleTextBoxChange}
      ></input>
    </div>
  );
};

export default TextBox;
