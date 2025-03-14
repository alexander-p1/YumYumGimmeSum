import React, { useEffect } from "react";
import "/src/styling/Menu.scss";
import group from "../assets/Group 6.svg";
import union from "../assets/Union.svg";
import { Navigate, useNavigate } from "react-router-dom";
import { postKey, fetchMenu, createTenant } from "../features/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/orderSlice";

const Menu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { menu } = useSelector((state) => state.api);

  const wontons = menu.wontons || [];
  const drinks = menu.drinks || [];
  const dips = menu.dips || [];

  useEffect(() => {
    const runApiCalls = async () => {
      const keyResult = await dispatch(postKey("apiKey"));

      if (postKey.fulfilled.match(keyResult)) {
        const uniqueName = `${Math.random().toString(36)}`;
        const tenantResult = await dispatch(createTenant({ "name": uniqueName }))

        if (createTenant.fulfilled.match(tenantResult)) {
          dispatch(fetchMenu("wonton"));
          dispatch(fetchMenu("drink"));
          dispatch(fetchMenu("dip"));
        }
    }
  }
    runApiCalls();
  }, [dispatch]);

  const handleClick = () => {
    navigate("/Order");
  };

  return (
    <div className="container">
      <section className="menu">
        <nav className="nav">
          <span>
            <img src={group} alt="" />
          </span>
          <span className="union">
            <img src={union} alt="" onClick={handleClick} />
          </span>
        </nav>
      </section>

      <dialog open className="modal">
        <header>
          <h1>MENY</h1>
        </header>

        {/* Wontons Section */}
        <>
          <h2 className="menuTitle">Wontons</h2>
          <ul className="menuList">
            {wontons.map((food) => (
              <React.Fragment key={food.id}>
                <li className="menuItem">
                  <div className="menuItemHeader">
                    <span className="foodName">{food.name} </span>
                    <span className="dots">..............................</span>
                    <span className="foodPrice"> {food.price} kr</span>
                  </div>
                  <span>{food.description}</span>
                  <div className="ingredients">{food.ingredients + ","}</div>
                  <button
                    className="addToCart"
                    onClick={() => dispatch(addToCart(food))}
                  >
                    Lägg till
                  </button>
                </li>
                <hr />
              </React.Fragment>
            ))}
          </ul>
        </>

        {/* Drinks Section */}
        <>
          <h2 className="menuTitle">Drinks</h2>
          <ul className="menuList">
            {drinks.map((drink) => (
              <React.Fragment key={drink.id}>
                <li className="menuItem">
                  <div className="menuItemHeader">
                    <span className="foodName">{drink.name} </span>
                    <span className="dots">..............................</span>
                    <span className="foodPrice"> {drink.price} kr</span>
                  </div>
                  <span> {drink.description} </span>
                  <div>
                  <button
                    className="addToCart"
                    onClick={() => dispatch(addToCart(drink))}
                  >
                    Lägg till
                  </button>
                  </div>
                </li>
                <hr />
              </React.Fragment>
            ))}
          </ul>
        </>

        {/* Dips Section */}
        <>
          <h2 className="menuTitle">Dip</h2>
          <ul className="menuList">
            {dips.map((dip) => (
              <React.Fragment key={dip.id}>
                <li className="menuItem">
                  <div className="menuItemHeader">
                    <span className="foodName">{dip.name} </span>
                    <span className="dots">..............................</span>
                    <span className="foodPrice"> {dip.price} kr</span>
                  </div>
                  <span> {dip.description} </span>
                  <div>
                  <button
                    className="addToCart"
                    onClick={() => dispatch(addToCart(dip))}
                  >
                    Lägg till
                  </button>
                  </div>
                </li>
                <hr />
              </React.Fragment>
            ))}
          </ul>
        </>
      </dialog>
    </div>
  );
};

export default Menu;
