import React from "react";

const Input = ({ inputClass = "", placeholder = "Search", value = "", onChange = () => { }, title = "defaultTitle", label="", parentClass="" }) => {
    return (
        <div className={parentClass}>
        {label && <label className="mt-0 ">{label}</label>}
        <input
            className={`input-custom w-full rounded-full px-2 bg-white text-black ${inputClass}`}
            title={title}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
        </div>
    )
};

export default Input