import React from 'react';
import { FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';

const CustomInput = (props) => {
  return (
    <FormGroup>
      {props.label && <Label for='exampleEmail'>{props.label}</Label>}
      {props.options ? (
        <Input
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          type={props.type}
        >
          {props.options}
        </Input>
      ) : (
        <Input
          name={props.name}
          valid={props.valid}
          invalid={props.invalid}
          value={props.value}
          onChange={props.onChange}
          type={props.type}
        />
      )}
    </FormGroup>
  );
};

export default CustomInput;
