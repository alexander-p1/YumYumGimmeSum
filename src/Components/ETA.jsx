import React from "react";
import "/src/styling/ETA.scss";
import group from "../assets/Group 6.svg";
import boxtop from "../assets/boxtop 1.png";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/orderSlice";

const ETA = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderData } = useSelector((state) => state.api);

  const eta = orderData ? new Date(orderData.eta).toLocaleString("sv-SE", {
    hour: '2-digit',
    minute: '2-digit',
  })  : "";

  const orderValue = orderData ? orderData.id : "";

  const handleClick = () => {
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="containerEta">
      <header>
        <img src={group} alt="" className="headerEta" />
      </header>
      <section className="etaSection">
        <img src={boxtop} alt="" className="boxtopEta" />
      </section>

      <header className="etaSection">
        <h1>Dina wontons tillagas!</h1>
      </header>
      <br />
      <section className="etaSection">
        <span>
          <h2>Redo: {eta} </h2>
          <br />
          <h3>Ordernummer: {'#' + orderValue} </h3>
        </span>
      </section>

      <footer className="footerBtn">
        <button className="newOrderBtn" onClick={handleClick}>
          GÖR EN NY BESTÄLLNING
        </button>
        <button className="receiptBtn">SE KVITTO</button>
      </footer>
    </div>
  );
};

export default ETA;
