import React from "react";

const NewRentSelect = (props) => {
  const error = props.errors[props.name];

  return (
    <div className="form__element">
      <label htmlFor={props.id} className="form__label">
        {props.label}
      </label>
      <select
        id={props.id}
        name={props.name}
        className={`form__input shadow-card ${error && "is-invalid-input"}`}
        value={props.value}
        onChange={(e) => props.changeHandler(e.target.value)}
        //clear error state of component on focus
        onFocus={() => props.setError({ ...props.errors, [props.name]: null })}
      >
        {props.options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NewRentSelect;
