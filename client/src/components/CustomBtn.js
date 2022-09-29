import React from 'react';

const CustomBtn = (props) => {
  if (props.type === 'light')
    return (
      <button
        disabled={props.disabled}
        style={props.style}
        type='button'
        class='btn btn-outline-primary'
        onClick={props.onClick}
      >
        {props.text}
      </button>
    );
  else if (props.type === 'danger')
    return (
      <button
        disabled={props.disabled}
        style={props.style}
        type='button'
        class='btn btn-outline-danger'
        onClick={props.onClick}
      >
        {props.text}
      </button>
    );
  else
    return (
      <button
        disabled={props.disabled}
        style={props.style}
        type='button'
        class='btn btn-outline-dark'
        onClick={props.onClick}
      >
        {props.text}
      </button>
    );
};

export default CustomBtn;
