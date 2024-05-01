import { React } from "react";

const Button = ({ onClick, title, buttonClass = "", buttonStyle={}, isDisabled }) => {
  return (
    <button
      className={`mr-auto border-2 rounded-full   ${buttonClass}`}
      onClick={onClick}
      type="button"
      style={buttonStyle}
      disabled={isDisabled}
    >
      {title}
    </button>
  );
};

export default Button;
