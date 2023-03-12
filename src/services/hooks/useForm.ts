import { ChangeEvent, useState } from "react";

export function useForm(inputValues: { [key: string]: string }) {
  const [values, setValues] = useState(inputValues);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  return { values, onChange, setValues };
}
