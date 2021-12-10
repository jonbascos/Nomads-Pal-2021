import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onSnapshot, collection } from "firebase/firestore";
import { Card } from "react-bootstrap";
import CardItem from "./CardItem";
import db from "../static/scripts/firebase";

// Styles
import "../styles/Cards.css";

function Cards() {
  const [locations, setLocations] = useState([]);
  const [specificCity, setSpecificCity] = useState("All Around Portland");
  const [specificLocations, setSpecificLocations] = useState([]);
  const cities = [];

  useEffect(
    () =>
      onSnapshot(collection(db, "Locations"), (snapshot) => {
        setLocations(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }),
    []
  );

  //Creates an array of the different cities
  const singleCities = locations.map((location) => {
    if (!cities.includes(location.city)) {
      cities.push(location.city);
    }
  });

  useEffect(() => singleCities, [singleCities]);

  const listCities = cities.map((city) => {
    return <option value={city}>{city}</option>;
  });

  const handleChange = (e) => {
    setSpecificCity(e.target.value);
  };

  // Filter the cards by the city
  useEffect(() => {
    const result = locations.filter(
      (location) => location.city === specificCity
    );
    setSpecificLocations(result);
  }, [specificCity, locations]);

  const singleCard = locations.map((location) => {
    return (
      <div>
        <li>
          <Card className="bootstrap-card" key={location.id}>
            <Card.Img variant="top" src="https://via.placeholder.com/286x200" />
            <Card.Body>
              <Card.Title className="bootstrap-title">
                <h2>{location.name}</h2>
              </Card.Title>
              <Card.Text>
                {location.address}
                <br />
                {location.city}, {location.state} {location.zipcode}
              </Card.Text>
              <Card.Footer>
                Download (Mbps): {location.download}
                <br />
                Upload (Mbps): {location.upload}
              </Card.Footer>
            </Card.Body>
          </Card>
        </li>
      </div>
    );
  });

  const specificCard = specificLocations.map((specificLocation) => {
    return (
      <div>
        <li>
          <Card className="bootstrap-card" key={specificLocation.id}>
            <Card.Img
              className="bootstrap-image"
              variant="top"
              src="https://via.placeholder.com/286x200"
            />
            <Card.Body>
              <Card.Title>
                <h2>{specificLocation.name}</h2>
              </Card.Title>
              <Card.Text>
                {specificLocation.address}
                <br />
                {specificLocation.city}, {specificLocation.state}{" "}
                {specificLocation.zipcode}
              </Card.Text>
              <Card.Footer>
                Download (Mbps): {specificLocation.download}
                <br />
                Upload (Mbps): {specificLocation.upload}
              </Card.Footer>
            </Card.Body>
          </Card>
        </li>
      </div>
    );
  });

  return (
    <div className="cards">
      <h1>
        Check Out These Locations:
        <br />
        <select className="city-drop-down" onChange={handleChange}>
          <option selected value="All Around Portland">
            All Around Portland
          </option>
          {listCities}
        </select>
      </h1>
      <div className="cards-container">
        <div className="cards-wrapper">
          <ul className="cards-location">
            {specificCity === "All Around Portland" ? (
              <>{singleCard}</>
            ) : (
              <>{specificCard}</>
            )}
          </ul>
        </div>
      </div>
      <p className="add-location-container">
        <button>
          <Link to="/contact">Suggest a New Location</Link>
        </button>
      </p>
    </div>
  );
}

export default Cards;
