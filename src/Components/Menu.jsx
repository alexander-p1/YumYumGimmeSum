import React, { useEffect } from "react";
import "/src/styling/Menu.scss"
import group from '../assets/Group 6.svg'
import union from '../assets/Union.svg'
import { Navigate, useNavigate } from "react-router-dom";
import { postKey, createTenant, fetchMenu } from '../features/apiSlice';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../features/orderSlice';

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { menu, loading } = useSelector(state => state.api);

  const wontons = menu.wontons || [];
  const drinks = menu.drinks || [];
  const dips = menu.dips || [];

  useEffect(() => {
    const runApiCalls = async () => {
      const keyResult = await dispatch (postKey('apiKey'));

      if (postKey.fulfilled.match(keyResult)) {

        const uniqueName = `tenant-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
        const tenantResult = await dispatch(createTenant({ "name": uniqueName }));
        // console.log("createTenant result:", tenantResult);

        if (createTenant.fulfilled.match(tenantResult)) {

          const wontonResult = await dispatch(fetchMenu('wonton'));
          const drinkResult = await dispatch(fetchMenu('drink'));
          const dipResult = await dispatch(fetchMenu('dip'));

          
          if (fetchMenu.fulfilled.match(wontonResult)) {
            console.log("Wonton menu items:", wontonResult.payload.items);
          }
          if (fetchMenu.fulfilled.match(drinkResult)) {
            console.log("Drink menu items:", drinkResult.payload.items);
          }
          if (fetchMenu.fulfilled.match(dipResult)) {
            console.log("Dip menu items:", dipResult.payload.items);
          }
        }
      
      

      }
    }
    runApiCalls();
  }, [dispatch]);

  
  
  const handleClick = () => {
    navigate('/Order')
  }

  return (
    <div className="container">
      <section className="menu">
        <nav className="nav">
          <span><img src={group} alt="" /></span>
          <span className="union"><img src={union} alt="" onClick={handleClick} /></span>
        </nav>
      </section>

      <dialog open className="modal">
        <header><h1>MENY</h1></header>
         {/* Wontons Section */}
      {wontons.length > 0 && (
        <>
          <h2>Wontons</h2>
          <ul className="menuList">
            {wontons.map((food, index) => (
              <React.Fragment key={food.id}>
                <li className="menuItem">
                  <div className="menuItemHeader">
                    <span className="foodName">{food.name} </span>
                    <span className="dots">..............................</span>
                    <span className="foodPrice"> {food.price} kr</span>
                  </div>
                  <span>{food.description}</span>
                  <div className="ingredients">{Array.isArray(food.ingredients) ? food.ingredients.join(', ') : food.ingredients}</div>
                  <button onClick={() => dispatch(addToCart(food))}>Add to Cart</button>
                </li>
                {index !== wontons.length - 1 && <hr />}
              </React.Fragment>
            ))}
          </ul>
        </>
      )}

      {/* Drinks Section */}
      {drinks.length > 0 && (
        <>
          <h2>Drinks</h2>
          <ul className="menuList">
            {drinks.map((drink, index) => (
              <React.Fragment key={drink.id}>
                <li className="menuItem">
                  <div className="menuItemHeader">
                    <span className="foodName">{drink.name} </span>
                    <span className="dots">..............................</span>
                    <span className="foodPrice"> {drink.price} kr</span>
                  </div>
                  <span> {drink.description} </span>
                  <div className="ingredients">{Array.isArray(drink.ingredients) ? drink.ingredients.join(', ') : drink.ingredients}</div>
                  <button onClick={() => dispatch(addToCart(drink))}>Add to Cart</button>
                </li>
                {index !== drinks.length - 1 && <hr />}
              </React.Fragment>
            ))}
          </ul>
        </>
      )}

      {/* Dips Section */}
      {dips.length > 0 && (
        <>
          <h2>Dips</h2>
          <ul className="menuList">
            {dips.map((dip, index) => (
              <React.Fragment key={dip.id}>
                <li className="menuItem">
                  <div className="menuItemHeader">
                    <span className="foodName">{dip.name} </span>
                    <span className="dots">..............................</span>
                    <span className="foodPrice"> {dip.price} kr</span>
                  </div>
                  <span> {dip.description} </span>
                  <div className="ingredients">{Array.isArray(dip.ingredients) ? dip.ingredients.join(', ') : dip.ingredients}</div>
                  <button onClick={() => dispatch(addToCart(dip))}>Add to Cart</button>
                </li>
                {index !== dips.length - 1 && <hr />}
              </React.Fragment>
            ))}
          </ul>
        </>
      )}
      
      {wontons.length === 0 && drinks.length === 0 && dips.length === 0 && (
        <p>No menu items available.</p>
      )}

        
      </dialog>

    </div>
  )
};

export default Menu;

{/* <div className="dipSection">
          <div className="dipButtons">
            {dipSauces.map((dip) => (
              <button key={dip.id} className="dipButton">
                {dip.name}
              </button>
            ))}
          </div>
        </div> */}


