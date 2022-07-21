import React from "react";
import { Link } from "react-router-dom";
import NoImage from "../../assets/no-image.png";
import "./Card.css";

function Card(character) {
  return (
    <div key={character.props.multiverseid} className="card-container">
      <div className="card-container-img">
        {character.props.imageUrl ? (
          <Link to={`${character.props.multiverseid}`}>
            <img src={character.props.imageUrl} alt="" />
          </Link>
        ) : (
          <div>
            <img src={NoImage} alt="" />
          </div>
        )}
      </div>
      <div className="card-container-text">
        <div>
          <h2>{character.props.name}</h2>
        </div>
        <div>
          <span className="bold">Type: </span>
          {character.props.type}
        </div>
        <div>
          <span className="bold">Toughness: </span>
          {character.props.toughness}
        </div>
        <div>
          <span className="bold">Mana Cost: </span>
          {character.props.manaCost}
        </div>
      </div>
    </div>
  );
}

export default Card;
