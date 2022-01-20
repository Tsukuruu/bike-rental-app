import React from "react";

const NewRentInputText = (props) => {
  const error = props.errors[props.name];

  return (
    <div className="form__element">
      <label htmlFor={props.id} className="form__label">
        {props.label}
      </label>
      <input
        type="text"
        id={props.id}
        name={props.name}
        className={`form__input shadow-card ${props.small && "small-input"} ${
          error && "is-invalid-input"
        }`}
        onChange={(e) => props.changeHandler(e.target.value)}
        onFocus={() => props.setError({ ...props.errors, [props.name]: null })}
      />
    </div>
  );
};

export default NewRentInputText;
