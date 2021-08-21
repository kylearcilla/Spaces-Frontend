import { useState } from "react";

const useForm = (callback: any, initialState: any): any => {
  const [values, setValues] = useState({ ...initialState });

  const onChangeHandler = (event: any): void => {
    let value = event.target.value ?? event.target.innerText;
    if (event.target.className.includes("new-session")) {
      value = +value;
    }
    setValues((prevValues: any) => ({
      ...prevValues,
      [event.target.classList[2]]: value,
    }));
  };

  const onSubmitHandler = (event: any): void => {
    event.preventDefault();
    setValues({ ...initialState });
    callback();
  };

  const resetValues = (): void => {
    setValues({ ...initialState });
  };

  return {
    values,
    onChangeHandler,
    onSubmitHandler,
    resetValues,
  };
};

export default useForm;
