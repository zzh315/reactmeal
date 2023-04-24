import react from "react";

import useInput from "../../hooks/use-input";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const {
    value: enteredName,
    onBlurHandler: nameOnBlurHandler,
    onChangeHandler: nameOnChangeHandler,
    hasError: nameHasError,
    isInvalidInput: nameIsInvalid,
  } = useInput((input) => {
    return input.trim() === "";
  });

  const {
    value: enteredEmail,
    onBlurHandler: emailOnBlurHandler,
    onChangeHandler: emailOnChangeHandler,
    hasError: emailHasError,
    isInvalidInput: emailIsInvalid,
  } = useInput((input) => {
    return !input.includes("@");
  });

  const {
    value: enteredCity,
    onBlurHandler: cityOnBlurHandler,
    onChangeHandler: cityOnChangeHandler,
    hasError: cityHasError,
    isInvalidInput: cityIsInvalid,
  } = useInput((input) => {
    return input.trim() === "";
  });

  const {
    value: enteredPostal,
    onBlurHandler: postalOnBlurHandler,
    onChangeHandler: postalOnChangeHandler,
    hasError: postalHasError,
    isInvalidInput: postalIsInvalid,
  } = useInput((input) => {
    return input.trim() === "";
  });
  const {
    value: enteredStreet,
    onBlurHandler: streetOnBlurHandler,
    onChangeHandler: streetOnChangeHandler,
    hasError: streetHasError,
    isInvalidInput: streetIsInvalid,
  } = useInput((input) => {
    return input.trim() === "";
  });

  const formIsInvalid =
    nameIsInvalid ||
    emailIsInvalid ||
    streetIsInvalid ||
    cityIsInvalid ||
    postalIsInvalid;

  const formSubmitHandler = (event) => {
    event.preventDefault();

    return;
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div
        className={
          nameHasError
            ? `${classes.control} ${classes.invalid}`
            : `${classes.control}`
        }
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          onChange={nameOnChangeHandler}
          value={enteredName}
          onBlur={nameOnBlurHandler}
        />
        {nameHasError && (
          <p className={classes.warning}>please enter valid name</p>
        )}
      </div>
      <div
        className={
          emailHasError
            ? `${classes.control} ${classes.invalid}`
            : `${classes.control}`
        }
      >
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          onChange={emailOnChangeHandler}
          value={enteredEmail}
          onBlur={emailOnBlurHandler}
        />
        {emailHasError && (
          <p className={classes.warning}>please enter valid email</p>
        )}
      </div>
      <div
        className={
          cityHasError
            ? `${classes.control} ${classes.invalid}`
            : `${classes.control}`
        }
      >
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityOnChangeHandler}
          value={enteredCity}
          onBlur={cityOnBlurHandler}
        />
        {cityHasError && (
          <p className={classes.warning}>please enter valid City</p>
        )}
      </div>
      <div
        className={
          streetHasError
            ? `${classes.control} ${classes.invalid}`
            : `${classes.control}`
        }
      >
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetOnChangeHandler}
          value={enteredStreet}
          onBlur={streetOnBlurHandler}
        />
        {streetHasError && (
          <p className={classes.warning}>please enter valid Street</p>
        )}
      </div>
      <div
        className={
          postalHasError
            ? `${classes.control} ${classes.invalid}`
            : `${classes.control}`
        }
      >
        <label htmlFor="city">Post Code</label>
        <input
          type="text"
          id="postal"
          onChange={postalOnChangeHandler}
          value={enteredPostal}
          onBlur={postalOnBlurHandler}
        />
        {postalHasError && (
          <p className={classes.warning}>please enter valid Post Code</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onHideCheckout}>
          Cancle
        </button>
        <button className={classes.submit} disabled={formIsInvalid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
