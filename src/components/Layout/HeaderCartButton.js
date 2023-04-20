import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  // this headerCartButton component will be rerendered whenever context changes
  const [isBumpped, setIsBumpped] = useState(false);

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.amount;
  }, 0);

  const btnClasses = `${classes.button} ${isBumpped ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsBumpped(true);

    const timerId = setTimeout(() => {
      setIsBumpped(false);
    }, 300);
    // return () => {
    //   clearTimeout(timerId);
    // };
  }, [items]);

  return (
    <button onClick={props.onClick} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
