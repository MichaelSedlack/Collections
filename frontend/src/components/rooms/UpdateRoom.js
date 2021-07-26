import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { ApiContext } from "../ApiContext";
import { buttonStyles, formStyles } from "./../Styles.js";

function UpdateRoom({ roomData, handleClose }) {
  const { doUpdate } = useContext(ApiContext);
  const buttonStyle = buttonStyles();
  const formStyle = formStyles();

  // Initial states
  const [message, setMessage] = useState("");
  const [option, setOption] = useState("Private");
  const [error, setError] = useState(false);
  const [optionMessage, setOptionMessage] = useState(
    "No one will be able to view your Room"
  );
  const [checkOption, setCheckOption] = useState(true);
  const [name, setName] = useState(roomData.roomName);
  const [roomId] = useState(roomData.roomId);

  // Displays to the user what the private/public options mean
  const displayChoice = (e) => {
    var choice = e.target.value;

    if (choice === "Private") {
      setOption("Private");
      setOptionMessage("No one will be able to view your Room");
      setCheckOption(true);
    } else {
      setOption("Public");
      setOptionMessage("Everyone will be able to view your Room");
      setCheckOption(false);
    }
  };

  const updateRoom = (event) => {
    event.preventDefault();
    const newRoom = {
      name: name,
      private: checkOption,
    };

    const res = doUpdate(roomId, newRoom);

    if (res.error) {
      setError(true);
      setMessage(res.error);
    } else {
      setMessage("Successfully updated room!");
      setTimeout(function () {
        setMessage("");
        handleClose();
      }, 1000);
    }
  };
  if (error) {
    return <h1>{message}</h1>;
  } else {
    return (
      <div>
        <TextField
          margin="dense"
          variant="outlined"
          type="text"
          id="roomName"
          defaultValue={name}
          label="Room Name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <FormControl variant="outlined" className={formStyles.formControl}>
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

        <p id="result">{optionMessage}</p>
        <br />
        <br />
        <Button
          variant="contained"
          size="large"
          color="primary"
          type="submit"
          className={buttonStyle.accept}
          id="createRoomButton"
          value="Update Room"
          onClick={updateRoom}
        >
          Update
        </Button>
        <span id="createRoomResult">{message}</span>
      </div>
    );
  }
}

export default UpdateRoom;
