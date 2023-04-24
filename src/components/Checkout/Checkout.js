import react from "react";

import useInput from "../../hooks/use-input";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const {
    value: enteredName,
    onBlurHandler: nameOnBlurHandler,
    onChangeHandler: nameOnChangeHandler,
    hasError: nameHasError,
  } = useInput((input) => {
    return input.trim() === "";
  });

  const {
    value: enteredEmail,
    onBlurHandler: emailOnBlurHandler,
    onChangeHandler: emailOnChangeHandler,
    hasError: emailHasError,
  } = useInput((input) => {
    return !input.includes("@");
  });

  const {
    value: enteredCity,
    onBlurHandler: cityOnBlurHandler,
    onChangeHandler: cityOnChangeHandler,
    hasError: cityHasError,
  } = useInput((input) => {
    return input.trim() === "";
  });

  const {
    value: enteredPostal,
    onBlurHandler: postalOnBlurHandler,
    onChangeHandler: postalOnChangeHandler,
    hasError: postalHasError,
  } = useInput((input) => {
    return input.trim() === "";
  });
  const {
    value: enteredStreet,
    onBlurHandler: streetOnBlurHandler,
    onChangeHandler: streetOnChangeHandler,
    hasError: streetHasError,
  } = useInput((input) => {
    return input.trim() === "";
  });

  const formSubmitHandler = (event) => {
    event.preventDefault();

    return;
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          onChange={nameOnChangeHandler}
          value={enteredName}
          onBlur={nameOnBlurHandler}
        />
        {nameHasError && <p>please enter valid name</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          onChange={emailOnChangeHandler}
          value={enteredEmail}
          onBlur={emailOnBlurHandler}
        />
        {emailHasError && <p>please enter valid email</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityOnChangeHandler}
          value={enteredCity}
          onBlur={cityOnBlurHandler}
        />
        {cityHasError && <p>please enter valid City</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetOnChangeHandler}
          value={enteredStreet}
          onBlur={streetOnBlurHandler}
        />
        {streetHasError && <p>please enter valid Street</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">Post Code</label>
        <input
          type="text"
          id="postal"
          onChange={postalOnChangeHandler}
          value={enteredPostal}
          onBlur={postalOnBlurHandler}
        />
        {postalHasError && <p>please enter valid Post Code</p>}
      </div>
      <div>
        <button type="button" onClick={props.onHideCheckout}>
          Close
        </button>
        <button>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
