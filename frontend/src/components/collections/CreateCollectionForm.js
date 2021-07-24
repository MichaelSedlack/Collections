import React, { useRef, useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import PublishIcon from "@material-ui/icons/Publish";
import { makeStyles } from "@material-ui/core/styles";
import { RoomContext, UserContext } from "./../UserContext";
import { ApiContext } from "./../ApiContext";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function CreateCollectionForm() {
  const { doCreate } = useContext(ApiContext);
  const { room } = useContext(RoomContext);
  const { user } = useContext(UserContext);
  const keyName = useRef(null);

  const classes = useStyles();

  // Initial States
  const [message, setMessage] = useState("");
  const [option, setOption] = useState("Private");
  const [error, setError] = useState(false);
  const [optionMessage, setOptionMessage] = useState(
    "No one will be able to view your Collection"
  );
  const [checkOption, setCheckOption] = useState(true);
  const [open, setOpen] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const [collectionKeys, setCollectionKeys] = useState([]);
  const [keyMessage, setKeyMessage] = useState("");
  const [showKeyMessage, setShowKeyMessage] = useState(false);
  const [template, setTemplate] = useState(false);
  const [radio, setRadio] = useState("Custom");

  const createCollection = async (event) => {
    event.preventDefault();

    var collection = {
      name: collectionName,
      private: checkOption,
      roomID: room.id,
      keys: collectionKeys,
    };

    const res = doCreate(collection);

    if (res.error) {
      setError(true);
      setMessage(res.error);
      return;
    }

    setMessage("Successfully created collection!");
    setTimeout(() => {
      setMessage("");
      setOpen(false);
      setCollectionName("");
      setOpen(false);
    }, 500);
  };

  const displayChoice = (e) => {
    var choice = e.target.value;

    if (choice === "Private") {
      setOption("Private");
      setOptionMessage("No one will be able to view your Collection");
      setCheckOption(true);
    } else {
      setOption("Public");
      setOptionMessage("Everyone will be able to view your Collection");
      setCheckOption(false);
    }
  };

  const handleNameChange = (e) => {
    setCollectionName(e.target.value);
  };

  // Adds new key elements to the collectionKeys array
  function handleKeys() {
    setCollectionKeys((collectionKeys) => [
      ...collectionKeys,
      keyName.current.value,
    ]);
    console.log(collectionKeys);
    keyName.current.value = "";
    setShowKeyMessage(true);
    setKeyMessage("Added Key");
    setTimeout(function () {
      setShowKeyMessage(false);
    }, 700);
  }

  const handleRadioChange = (event) => {
    setTemplate(true);
    switch (event.target.value) {
      case "Books":
        setRadio("Books");
        setCollectionKeys(["Author", "Genre", "Year", "Edition"]);
        break;
      case "Movies":
        setRadio("Movies");
        setCollectionKeys(["Author", "Genre", "Year", "Platform"]);
        break;
      case "Trading Cards":
        setRadio("Trading Cards");
        setCollectionKeys(["Set", "Condition", "Year", "Rarity"]);
        break;
      case "Art":
        setRadio("Art");
        setCollectionKeys(["Artist", "Condition", "Year", "Style"]);
        break;
      case "Custom":
        setTemplate(false);
        setCollectionKeys([]);
        break;
      default:
        console.log("error");
        break;
    }
  };

  if (user.id != room.uid) {
    return (
      <div>
        <br />
      </div>
    );
  } else if (open) {
    return (
      <div>
        <span id="inner-title">Create New Collection</span>
        <br />
        <TextField
          margin="dense"
          variant="outlined"
          type="text"
          id="collectionName"
          label="Collection Name"
          value={collectionName}
          onChange={(e) => handleNameChange(e)}
        />
        <br />
        {template ? (
          <h4>Use a Template for a {radio} Collection</h4>
        ) : (
          <div>
            <h4>Use a Custom Collection</h4>
            <TextField
              disabled={template ? true : false}
              margin="dense"
              variant="outlined"
              type="text"
              id="collectionKeys"
              label="Collection Properties"
              inputRef={keyName}
            />
            <Button
              disabled={template ? true : false}
              variant="contained"
              size="medium"
              color="primary"
              type="submit"
              id="addKeyButton"
              className="buttons"
              value="Add Key"
              onClick={() => {
                handleKeys();
              }}
            >
              Add Key
            </Button>
            {/* {showKeyMessage ? <span>{keyMessage}</span> : null} */}
            <br />
            <br />
          </div>
        )}
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="Custom"
          onChange={(e) => handleRadioChange(e)}
        >
          <FormControlLabel
            value="Custom"
            control={<Radio color="primary" />}
            label="Custom"
            labelPlacement="top"
          />
          <FormControlLabel
            value="Books"
            control={<Radio color="primary" />}
            label="Books"
            labelPlacement="top"
          />
          <FormControlLabel
            value="Movies"
            control={<Radio color="primary" />}
            label="Movies"
            labelPlacement="top"
          />
          <FormControlLabel
            value="Trading Cards"
            control={<Radio color="primary" />}
            label="Trading Cards"
            labelPlacement="top"
          />
          <FormControlLabel
            value="Art"
            control={<Radio color="primary" />}
            label="Art"
            labelPlacement="top"
          />
        </RadioGroup>
        <h4>Properties</h4>
        {collectionKeys.length ? (
          collectionKeys.map((key) => {
            return (
              <div>
                <p>{key}</p>
              </div>
            );
          })
        ) : (
          <div>
            <p>No Properties Created</p>
          </div>
        )}
        <br />
        <hr align="left" width="60%" />
        <br />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Choose</InputLabel>
          <Select
            labelId="option"
            id="option"
            value={option}
            onChange={(e) => displayChoice(e)}
            label="option"
          >
            <MenuItem value="Private">Private</MenuItem>
            <MenuItem value="Public">Public</MenuItem>
          </Select>
        </FormControl>
        <span id="result">{optionMessage}</span>
        <br />
        <br />
        <Button
          startIcon={<PublishIcon />}
          variant="contained"
          size="large"
          color="primary"
          type="submit"
          id="CreateCollectionButton"
          value="Store New Collection"
          onClick={createCollection}
        >
          Store New Collection
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          startIcon={<ExpandLessIcon />}
          variant="contained"
          size="large"
          color="secondary"
          type="submit"
          id="cancelButton"
          value="Cancel"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <br />
        <span id="CreateCollectionResult">{message}</span>
      </div>
    );
  } else if (error) {
    return <h1>{message}</h1>;
  } else {
    return (
      <div>
        <Button
          startIcon={<ExpandMoreIcon />}
          variant="contained"
          size="large"
          color="primary"
          type="submit"
          id="CreateCollectionFormButton"
          value="Create New Collection"
          onClick={() => setOpen(true)}
        >
          Create New Collection
        </Button>
        <br />
      </div>
    );
  }
}

export default CreateCollectionForm;
