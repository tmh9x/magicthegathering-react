import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function CharacterDetails() {
  const [charactersDetails, setCharactersDetails] = useState();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const params = useParams();
  const id = params.id;
  console.log("id", id);

  const getCharactersDetails = async () => {
    try {
      const response = await fetch(
        `https://api.magicthegathering.io/v1/cards/${id}`
      );
      console.log("response", response);
      const results = await response.json();
      console.log("RESULTS", results);
      setCharactersDetails(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCharactersDetails();
  }, []);

  console.log("charactersDetails", charactersDetails);

  return (
    <>
      {charactersDetails && (
        <>
          <div>
            <img src={charactersDetails.card.imageUrl} alt="" />
          </div>
          <div>
            <p>{charactersDetails.card.name}</p>
          </div>
          <div>
            <p>{charactersDetails.card.manaCost}</p>
          </div>
          <div>
            <p>{charactersDetails.card.power}</p>
          </div>
          <div>
            <p>{charactersDetails.card.rarity}</p>
          </div>
          <div>
            <p>{charactersDetails.card.text}</p>
          </div>
        </>
      )}
    </>
  );
}

export default CharacterDetails;
