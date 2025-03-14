import React from "react";
import "/src/styling/Order.scss";
import union from "../assets/Union.svg";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../features/orderSlice";
import { placeOrder } from "../features/apiSlice";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, totalAmount } = useSelector((state) => state.order);

  const orderData = {
    items: cartItems.map((items) => items.id)}

  const handleClick = () => {
    dispatch(
      placeOrder({
        orderData
      })
    ).then((result) => {
      if (!result.error) {
        navigate("/eta");
      } else {
        confirm('Beställ gärna först!');
        navigate('/')
      }
    });
  
  };

  return (
    <div className="orderContainer">
      <nav className="cart">
        <img src={union} alt="" />
      </nav>
      <section className="orderSection">
        <hr />
          <ul className="menuOrderList">
            {cartItems.map((items) => (
              <div key={items.id}>
                <li className="menuItem">
                  <div className="menuItemHeader">
                    <span className="foodName">
                      {items.name} x {items.quantity}
                    </span>
                    <span className="dots">..............................</span>
                    <span className="foodPrice">
                      {items.price * items.quantity}{"kr"}
                    </span>
                  </div>
                  <button onClick={() => dispatch(removeFromCart(items.id))}>
                    Ta bort
                  </button>
                </li>
              </div>
            ))}
          </ul>
        <hr />
        <footer className="orderFooter">
          <p className="totalAmount">Totalt <span>{totalAmount} kr</span> </p>
          <button className="takeMyMoney" onClick={handleClick}>
            Take my money!
          </button>
        </footer>
      </section>
    </div>
  );
};

export default Order;
