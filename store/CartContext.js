import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    const orderToAdd = orders.find((obj) => {
      return obj.productID === order;
    });

    if (orderToAdd) {
      const index = orders.indexOf(orderToAdd);
      console.log(index);
      orders[index] = { ...orderToAdd, quantity: orders[index].quantity + 1 };
      setOrders([...orders]);
      return;
    }

    setOrders([...orders, { productID: order, quantity: 1 }]);
  };

  const deleteOrder = (order) => {
    const orderToDelete = orders.find((obj) => {
      return obj.productID === order;
    });

    if (orderToDelete) {
      const index = orders.indexOf(orderToDelete);
      if (orderToDelete.quantity === 1) {
        orders.splice(index, 1);
        setOrders([...orders]);
        return;
      }
      orders[index] = {
        ...orderToDelete,
        quantity: orders[index].quantity - 1,
      };
      setOrders([...orders]);
    }
  };

  const value = { orders, addOrder, deleteOrder };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};

export default CartContextProvider;
