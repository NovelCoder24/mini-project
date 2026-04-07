import React from 'react';
import clsx from 'clsx';
import './Input.css';

const Input = ({ 
  label, 
  error, 
  className, 
  containerClassName,
  icon: Icon,
  ...props 
}) => {
  return (
    <div className={clsx('input-container', containerClassName)}>
      {label && <label className="input-label">{label}</label>}
      <div className="input-wrapper">
        {Icon && (
          <div className="input-icon">
            <Icon size={18} />
          </div>
        )}
        <input
          className={clsx(
            'base-input',
            Icon && 'has-icon',
            error && 'has-error',
            className
          )}
          {...props}
        />
      </div>
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default Input;
