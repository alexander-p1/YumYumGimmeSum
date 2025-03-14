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
  const { tenantData } = useSelector((state) => state.api);

  const orderData = {
    items: cartItems.map((items) => items.id)}
  console.log("Order items:", orderData);

  const handleClick = () => {
    dispatch(
      placeOrder({
        tenant: tenantData.tenant,
        orderData
      })
    ).then((result) => {
      console.log('order result', result);
      if (!result.error) {
        navigate("/eta");
      } else {
        alert(`Failed to place order: ${result.payload}`);
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
        {cartItems.length > 0 ? (
          <ul className="menuOrderList">
            {cartItems.map((items) => (
              <React.Fragment key={items.id}>
                <li className="menuItem">
                  <div className="menuItemHeader">
                    <span className="foodName">
                      {items.name} x {items.quantity}
                    </span>
                    <span className="dots">..............................</span>
                    <span className="foodPrice">
                      {" "}
                      {items.price * items.quantity}{" "}
                    </span>
                  </div>
                  <button onClick={() => dispatch(removeFromCart(items.id))}>
                    Remove
                  </button>
                </li>
              </React.Fragment>
            ))}
          </ul>
        ) : (
          <p className="emptyCart">Your cart is empty</p>
        )}
        <hr />
      </section>

      <section>
        <footer className="orderFooter">
          <p className="totalAmount">Totalt {totalAmount}</p>
          <button className="takeMyMoney" onClick={handleClick}>
            Take my money!
          </button>
        </footer>
      </section>
    </div>
  );
};

export default Order;
