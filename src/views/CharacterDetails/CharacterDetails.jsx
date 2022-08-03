import "./CharactersDetails.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import React from "react";
import ShareIcon from "@mui/icons-material/Share";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

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

export default function CharacterDetails() {
  const [charactersDetails, setCharactersDetails] = useState();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const params = useParams();
  const id = params.id;
  console.log("id", id);

  let navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  const getCharactersDetails = async () => {
    try {
      const response = await fetch(
        `https://api.magicthegathering.io/v1/cards/${id}`
      );
      console.log("response", response);
      const results = await response.json();
      console.log("RESULTS", results);
      setCharactersDetails(results.card);
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
        <Card className="details-container" sx={{ maxWidth: 345 }}>
          <CardHeader
            title={charactersDetails.name}
            subheader={charactersDetails.type}
          />
          <div>
            <CardMedia
              className="details-image"
              component="img"
              height="480"
              image={charactersDetails.imageUrl}
            />
          </div>

          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <a
              href="whatsapp://send?text=GFG Example for whatsapp sharing"
              data-action="share/whatsapp/share"
              target="_blank"
            >
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </a>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse
            className="details-collapse-container"
            in={expanded}
            timeout="auto"
            unmountOnExit
          >
            <CardContent>
              <div className="details-text">
                <Typography variant="body2" color="text.secondary">
                  {charactersDetails.text}
                </Typography>
              </div>

              <Typography paragraph>
                <span className="uppercase">Power: </span>
                {charactersDetails.power}
              </Typography>
              <Typography paragraph>
                <span className="uppercase">Rarity: </span>
                {charactersDetails.rarity}
              </Typography>
              <Typography paragraph>
                <span className="uppercase">Artist: </span>
                {charactersDetails.artist}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      )}
    </>
  );
}
