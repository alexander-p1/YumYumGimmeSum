import React from 'react'
import "/src/styling/Order.scss"
import union from '../assets/Union.svg'
import Menu from './Menu'

const Order = () => {

  return (
    <div className='orderContainer'>
      <nav className="cart"><img src={union} alt="" /></nav>
      <section className='orderSection'>
        <hr />
          <ul className="menuOrderList">
            {foods.map((food) => (
              <React.Fragment key={food.id}>
                <li className="menuItem">
                  <div className="menuItemHeader">
                    <span className="foodName">{food.name} </span>
                      <span className="dots">..............................</span>
                      <span className="foodPrice"> {food.price} </span>
                  </div>
                </li>
              </React.Fragment>
            ))}
          </ul>
        <hr />
      </section>

      <section>
            <footer className='orderFooter'>
              <p className='totalAmount'></p>
              <button className='takeMyMoney'>Take my money!</button>
            </footer>
      </section>
    </div>
  )
}

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

export default Order