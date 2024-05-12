import React from 'react';
import "./ValidationTextField.scss"
import { TextField } from '@material-ui/core';

interface Props {
    value : any,
    name : string,
    type? : string,
    error? : string,
    onChange : (e : any) => void,
    onBlur : (e : any) => void,
    touched? : boolean,
    label? : string,
    helperText? : string
}

function HelperText({ text }: { text: string }) {
    return <span className="helperText">{text}</span>;
  }

function ValidationTextField ({
    value, name, type, error, onChange, onBlur, label, helperText, touched
} : Props) {
    return <TextField
    id={name}
    name={name}
    fullWidth
    label={label}
    type={type}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    error={touched && !!error}
    helperText={
      error && touched && helperText && (
        <HelperText text={helperText} />
      )
    }
  />
}

export default ValidationTextField