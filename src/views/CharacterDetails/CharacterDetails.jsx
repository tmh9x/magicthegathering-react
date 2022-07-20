import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./CharactersDetails.css";

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
            avatar={
              <Button color="error" variant="outlined" onClick={handleClick}>
                Back
              </Button>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={charactersDetails.name}
            subheader={charactersDetails.type}
          />
          <div>
            <CardMedia
              className="details-image"
              component="img"
              height="480"
              image={charactersDetails.imageUrl}
              alt="Paella dish"
            />
          </div>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {charactersDetails.text}
            </Typography>
          </CardContent>
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

export default CharacterDetails;

/* <>
    {charactersDetails && (
      <div className="details-container">
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
      </div>
    )}
  </> */
