import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "../Checkout/Checkout";

const Cart = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitId, setSubmitId] = useState(null);
  const cartCtx = useContext(CartContext);

  const [checkoutIsShown, setCheckoutIsShown] = useState(false);

  const totalAmount = `$${Math.abs(cartCtx.totalAmount.toFixed(2))}`;

  const hasItem = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const showCheckoutHandler = () => {
    setCheckoutIsShown(true);
  };

  const hideCheckoutHandler = () => {
    setCheckoutIsShown(false);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );
  //bind(null, item.id) preconfig function for future excecution, allows to preconfigure argument
  //when it's excecuted
  // onRemove={cartItemRemoveHandler(item.id)} would call the function immediately
  // we can either use bind (the first param is not used here, so we can write anything in this place) ...
  // onRemove={cartItemRemoveHandler.bind(null, item.id)}
  //  or we can create an anonymous function:
  // onRemove={() => cartItemRemoveHandler(item.id)};  Both options are equivalent.

  const modalAction = (
    <div className={classes.actions}>
      <button onClick={props.onHideCart} className={classes["button--alt"]}>
        Close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={showCheckoutHandler}>
          Order
        </button>
      )}
    </div>
  );

  const grabSubmitHandler = (loadStatus, id) => {
    setIsLoading(loadStatus);
    setSubmitId(id);
    console.log("cart", loadStatus);
  };

  const cartJSX = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkoutIsShown && (
        <Checkout
          onHideCheckout={hideCheckoutHandler}
          cartItems={cartCtx.items}
          onGrab={grabSubmitHandler}
        />
      )}
      {!checkoutIsShown && modalAction}
    </React.Fragment>
  );

  return (
    <Modal onClick={props.onHideCart}>
      {!isLoading && !submitId && cartJSX}
      {isLoading && <p>Loading...</p>}
      {submitId && <p>Order Success! Order ID: {submitId}</p>}
    </Modal>
  );
};

export default Cart;
