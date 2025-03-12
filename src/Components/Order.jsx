import React from 'react'
import "/src/styling/Order.scss"
import union from '../assets/Union.svg'
import Menu from './Menu'
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../features/orderSlice';

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, totalAmount } = useSelector(state => state.order);

    const handleClick = () => {
      navigate('/eta')
    }

  return (
    <div className='orderContainer'>
      <nav className="cart"><img src={union} alt="" /></nav>
      <section className='orderSection'>
        <hr />
        {cartItems.length > 0 ? (
          <ul className="menuOrderList">
            {cartItems.map((item) => (
              <React.Fragment key={item.id}>
                <li className="menuItem">
                  <div className="menuItemHeader">
                    <span className="foodName">{item.name} x {item.quantity}</span>
                      <span className="dots">..............................</span>
                      <span className="foodPrice"> {item.price * item.quantity} </span>
                  </div>
                  <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
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
            <footer className='orderFooter'>
              <p className='totalAmount'></p>
              <button className='takeMyMoney' 
              onClick={handleClick} 
              >
                Take my money!
                </button>
            </footer>
      </section>
    </div>
  )
}

export default Order