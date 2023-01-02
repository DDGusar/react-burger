import React, { useState } from "react";
export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const onChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return { values, onChange, setValues, onSubmit };
}
