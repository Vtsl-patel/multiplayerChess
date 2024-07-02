import React, { forwardRef, useRef } from "react";
import { useId } from "react";

const SelectTime = forwardRef(({ options, label, className, ...props }, ref) => {
    const [htmlId] = useId();

    return (
        <div className="w-full flex flex-row flex-wrap">
            {label && <label htmlFor={htmlId} className="block">{label}</label>}
            <select
                {...props}
                id={htmlId}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            >
                {options?.map((option, index) => (
                    <option key={index} value={option}>
                        {option === "none" ? "Select Time" : `${option} minutes`}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default SelectTime;
