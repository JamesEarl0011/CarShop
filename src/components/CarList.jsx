import React from "react";
import "./carList.css";

const CarList = ({ cars, onSelect }) => {
  return (
    <div className="container">
      <div className="car-list">
        {cars.map((car) => (
          <div className="card" key={car.id} onClick={() => onSelect(car)}>
            <div className="imgBox">
              <center>
                <img src={car.imagePath} alt={car.name} />
              </center>
            </div>
            <div className="contentBox">
              <center>
                <h5>{car.name}</h5>
              </center>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
