import "./Characters.css";

import React, { useContext } from "react";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Card from "../../components/Card/Card";
import { Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import { charactersContext } from "../../contexts/charactersContext";
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

export default function Characters() {
  const { characters, getCharacters } = useContext(charactersContext);

  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [toughness, setToughness] = useState("");

  const handleColor = (e) => {
    setColor(e.target.value);
  };

  const handleType = (e) => {
    setType(e.target.value);
  };

  const handleToughness = (e) => {
    setToughness(e.target.value);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    getCharacters(page);
  }, [page]);

  return (
    <div className="characters-container">
      <div>
        <Pagination
          className="pagination"
          count={10}
          onChange={(event, page) => handleChange(page)}
          page={page}
          size="normal"
        />
      </div>

      <div className="search-container">
        <div>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </div>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <div className="search-container-collapsed">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Colors</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={color}
                  label="Color"
                  onChange={handleColor}
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"White"}>White</MenuItem>
                  <MenuItem value={"Blue"}>Blue</MenuItem>
                  <MenuItem value={"Black"}>Black</MenuItem>
                  <MenuItem value={"Red"}>Red</MenuItem>
                  <MenuItem value={"Green"}>Green</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Type"
                  onChange={handleType}
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"Artifact"}>Artifact</MenuItem>
                  <MenuItem value={"Conspiracy"}>Conspiracy</MenuItem>
                  <MenuItem value={"Creature"}>Creature</MenuItem>
                  <MenuItem value={"Enchantment"}>Enchantment</MenuItem>
                  <MenuItem value={"Instant"}>Instant</MenuItem>
                  <MenuItem value={"Land"}>Land</MenuItem>
                  <MenuItem value={"Phenomenon"}>Phenomenon</MenuItem>
                  <MenuItem value={"Planeswalker"}>Planeswalker</MenuItem>
                  <MenuItem value={"Scheme"}>Scheme</MenuItem>
                  <MenuItem value={"Sorcery"}>Sorcery</MenuItem>
                  <MenuItem value={"Tribal"}>Tribal</MenuItem>
                  <MenuItem value={"Vanguard"}>Vanguard</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Toughness</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={toughness}
                  label="Toughness"
                  onChange={handleToughness}
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"1"}>1</MenuItem>
                  <MenuItem value={"2"}>2</MenuItem>
                  <MenuItem value={"3"}>3</MenuItem>
                  <MenuItem value={"4"}>4</MenuItem>
                  <MenuItem value={"5"}>5</MenuItem>
                  <MenuItem value={"6"}>6</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </Collapse>
      </div>

      <div>
        {characters &&
          characters
            .filter((character) => {
              return (
                ((color !== "" &&
                  character.colors[0].toLowerCase() === color.toLowerCase()) ||
                  (color === "" && character)) &&
                ((type !== "" &&
                  character.type.toLowerCase().includes(type.toLowerCase())) ||
                  (type === "" && character)) &&
                ((toughness !== "" && character.toughness === toughness) ||
                  (toughness === "" && character))
              );
            })
            .map((character) => (
              <Card key={character.multiverseid} character={character} />
            ))}
      </div>
    </div>
  );
}
