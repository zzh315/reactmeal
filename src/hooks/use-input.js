import { useState, useEffect } from "react";

const useInput = (validate) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isInvalidInput = validate(enteredValue);

  const hasError = isInvalidInput && isTouched;

  const onBlurHandler = () => {
    setIsTouched(true);
  };

  const onChangeHandler = (event) => {
    setEnteredValue(event.target.value); // becasue this is scheduled instead of executed immediatly, so it will not take effect immediately, so the state change will be delayed before the next one is fired
    // if (hasError) {
    //   //hasError depends on setEnteredValue(), so it will be delayed state as well.
    //   setIsValid(false);
    // } else {
    //   setIsValid(true);
    // }
  };

  const valueFormClassName = hasError ? "form-control invalid" : "form-control";

  return {
    value: enteredValue,
    isTouched,
    onBlurHandler,
    onChangeHandler,
    hasError,
    valueFormClassName,
  };
};

export default useInput;
