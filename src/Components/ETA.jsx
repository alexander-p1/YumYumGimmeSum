import React from 'react'
import "/src/styling/ETA.scss"
import group from '../assets/Group 6.svg'
import boxtop from '../assets/boxtop 1.png'
import { Navigate, useNavigate } from 'react-router-dom'

const ETA = () => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
  }


  return (
    <div className='containerEta'>
      <header><img src={group} alt="" className='headerEta'/></header>
      <section className='etaSection'>
        <img src={boxtop} alt="" className='boxtopEta' />
      </section>

      <section className='etaSection'>
      <h1>Dina wontons tillagas!</h1>
      </section>

      <footer className='footerBtn'>
        <button className='newOrderBtn' onClick={handleClick}>GÖR EN NY BESTÄLLNING</button>
        <button className='receiptBtn'>SE KVITTO</button>
      </footer>
    </div>
  )
}

export default ETA