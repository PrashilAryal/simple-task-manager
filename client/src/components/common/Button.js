import React from "react";

import "../../app.css";
const Button = ({ onClick, children }) => {
  return (
    <div className="button__container">
      <button onClick={onClick}>{children}</button>
    </div>
  );
};

export default Button;
