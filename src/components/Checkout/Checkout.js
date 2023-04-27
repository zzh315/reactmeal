import React, { useRef, useState } from "react";

import useInput from "../../hooks/use-input";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const [error, setError] = useState(null);
  const [id, setId] = useState(null);

  const fetchPOST = async (orderData) => {
    setError(null);
    setId(null);
    try {
      const response = await fetch(
        "https://react-movie-cbd13-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
        {
          method: "POST",
          body: JSON.stringify(orderData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      setId(data.name);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  };

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const cityInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();

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

  let orderData;
  const formSubmitHandler = (event) => {
    event.preventDefault();

    const formName = nameInputRef.current.value;
    const formEmail = emailInputRef.current.value;
    const formCity = cityInputRef.current.value;
    const formStreet = streetInputRef.current.value;
    const formPostal = postalInputRef.current.value;

    orderData = {
      formName,
      formEmail,
      formCity,
      formStreet,
      formPostal,
      meals: props.cartItems,
    };

    if (formIsInvalid) {
      setError("for is not valid");
    }

    fetchPOST(orderData);
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
          ref={nameInputRef}
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
          ref={emailInputRef}
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
          ref={cityInputRef}
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
          ref={streetInputRef}
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
          type="number"
          id="postal"
          onChange={postalOnChangeHandler}
          value={enteredPostal}
          onBlur={postalOnBlurHandler}
          ref={postalInputRef}
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
      {error && <p>{error.message}</p>}
      {id && <p>Your Order Id is {id}</p>}
    </form>
  );
};

export default Checkout;
