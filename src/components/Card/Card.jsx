import "./Card.css";

import { Link } from "react-router-dom";
import NoImage from "../../assets/no-image.png";
import React from "react";

export default function Card(props) {
  const multiverseid = props.character.multiverseid;
  const imageUrl = props.character.imageUrl;
  const name = props.character.name;
  const type = props.character.type;
  const toughness = props.character.toughness;
  const manaCost = props.character.manaCost;

  return (
    <div key={multiverseid} className="card-container">
      <div className="card-container-img">
        {imageUrl ? (
          <Link to={`${multiverseid}`}>
            <img src={imageUrl} alt="" />
          </Link>
        ) : (
          <div>
            <img src={NoImage} alt="" />
          </div>
        )}
      </div>
      <div className="card-container-text">
        <div>
          <h2>{name}</h2>
        </div>
        <div>
          <span className="bold">Type: </span>
          {type}
        </div>
        <div>
          <span className="bold">Toughness: </span>
          {toughness}
        </div>
        <div>
          <span className="bold">Mana Cost: </span>
          {manaCost}
        </div>
      </div>
    </div>
  );
}
