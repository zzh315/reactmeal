import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});
// //Setting defaults inside createContext()
// is recommended but not always required.
// The defaults improves IDE intellisense (code hinting).
export default CartContext;
