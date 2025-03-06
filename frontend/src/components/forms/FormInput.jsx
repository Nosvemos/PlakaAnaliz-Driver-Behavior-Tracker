import React from 'react';

const FormInput = ({ icon, type, name, placeholder, value, onChange, pattern, title, minLength, maxLength, required, disabled, validatorHidden, validatorHint }) => {
  return (
    <div className="form-control py-4">
      <label className="input validator shadow-md text-sm">
        {icon}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          pattern={pattern}
          title={title}
          minLength={minLength}
          maxLength={maxLength}
          required={required}
          disabled={disabled}
        />
      </label>
      <p className={`validator-hint ${validatorHidden} text-left`}>{validatorHint}</p>
    </div>
  );
};

export default FormInput;