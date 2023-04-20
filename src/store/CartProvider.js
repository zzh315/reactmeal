import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });

    const existingCartItem = state.items[existingCartItemIndex];

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.id;
    });
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem.amount > 1) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = [...state.items];
      updatedItems.splice(existingCartItemIndex, 1);
    }

    const updatedTotalAmount = state.totalAmount - existingCartItem.price;

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  }; // whatever is set here will be passed down in value and accessible
  //to children components wrapped by CartProvider componennt

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
