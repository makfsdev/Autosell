import React from "react";
import price from "../image marque voiture/cars-pic/icon2.jpg";
import { Link } from "react-router-dom";

const Icons = () => {
  return (
    <div className="row icons mt-3 p-5 ">
      <div className="col-md-4 pass">
        <Link to="/formauto">
          <h6 className="Pt-2">Estimer</h6>
          <img src={price} alt="" className="icon " />
        </Link>
      </div>

      <div style={{ transform: "scale(2)" }} className="col-md-4 mt-5 pass1">
        <Link to="/formauto">
          <h6 className="Pt-2">Vendre</h6>
          <img src={price} alt="" className="icon " />{" "}
        </Link>
      </div>
      <div style={{ transform: "scale(1.5)" }} className="col-md-4 mt-3 pass2">
        <Link to="/shop">
          <h6 className="Pt-2">Acheter</h6>
          <img src={price} alt="" className="icon " />{" "}
        </Link>
      </div>
    </div>
  );
};

export default Icons;
