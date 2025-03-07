import React from "react";
import "/src/styling/Menu.scss"
import group from '../assets/Group 6.svg'
import union from '../assets/Union.svg'

const Menu = () => {

  return <div className="container">
    <section className="menu">
      <nav className="nav">
        <span><img src={group} alt="" /></span>
        <span className="union"><img src={union} alt="" /></span>
      </nav>
    </section>

    <dialog open className="modal">
      <header><h1>MENY</h1></header>
      <ul className="menuList">
        {foods.map((food, index) => (
          <React.Fragment key={food.id}>
          <li className="menuItem">
            <div className="menuItemHeader">
              <span className="foodName">{food.name} </span>
              <span className="dots">..............................</span>
              <span className="foodPrice"> {food.price} </span>
            </div>
            <div className="ingredients">{food.ingredients}</div>
          </li>
          {index !== foods.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </ul>

      <div className="dipSection">
        <div className="dipButtons">
          {dipSauces.map((dip) => (
            <button key={dip.id} className="dipButton">
              {dip.name}
            </button>
          ))}
        </div>
      </div>
    </dialog>

  </div>;
};

export default Menu;


const foods = [
  {
    id: 1,
    name: "KARLSTAD",
    price: "9 SEK",
    ingredients: "kantarell, scharlottenlök, morot, bladpersilja",
  },
  {
    id: 2,
    name: "BANGKOK",
    price: "9 SEK",
    ingredients: "morot, salladslök, chili, kokos, lime, koriander",
  },
  {
    id: 3,
    name: "HO CHI MINH",
    price: "9 SEK",
    ingredients: "kål, salladslök, chili, vitlök, ingefära, tofu",
  },
  {
    id: 4,
    name: "PARIS",
    price: "9 SEK",
    ingredients: "kål, chevré, honung, basilika, valnötspasta",
  },
  {
    id: 5,
    name: "OAXACA",
    price: "9 SEK",
    ingredients: "majs, tomat, rostade ärtor, vitlök, lime",
  },
  {
    id: 6,
    name: "DIPSÅS",
    price: "19 SEK",
  },
];

const dipSauces = [
  { id: 1, name: "sweet chili" },
  { id: 2, name: "sweet & sour" },
  { id: 3, name: "guacamole" },
  { id: 4, name: "wonton std" },
  { id: 5, name: "hot mango" },
  { id: 6, name: "chili mayo" },
];
