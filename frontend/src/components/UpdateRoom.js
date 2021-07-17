import React, { useState, useContext } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { ApiContext } from './ApiContext';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

function UpdateRoom({roomData})
{
  const { doUpdate } = useContext(ApiContext);
  const classes = useStyles();

    
    // Initial states
    const [message,setMessage] = useState('');
    const [option,setOption] = useState('Private');
    const [optionMessage,setOptionMessage] = useState('No one will be able to view your Room');
    const [checkOption, setCheckOption] = useState(true);
    const [name,setName] = useState(roomData.roomName);
    const [roomId] = useState(roomData.roomId);
    
    // Displays to the user what the private/public options mean
    const displayChoice = (e) => {
        var choice = e.target.value;

        if(choice === "Private"){
            setOption("Private");
            setOptionMessage('No one will be able to view your Room');
            setCheckOption(true);
        }
        else{
            setOption("Public");
            setOptionMessage("Everyone will be able to view your Room");
            setCheckOption(false);
        }
    }

    const updateRoom = async event =>
    {
        event.preventDefault();
        const newRoom = {
          name: name,
          private:checkOption,
        };

        const res = doUpdate(roomId, newRoom);

        if(res.error){
          setMessage(res.error);
        }else{
          setMessage("Successfully updated room!");
        }
    };

    return(
        <div>
            <TextField margin="dense" variant="outlined" type="text" id="roomName" defaultValue={name} label="Room Name" onChange={(e) => setName(e.target.value)}/><br />
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Choose</InputLabel>
                <Select
                    labelId="option"
                    id="option"
                    value={option}
                    onChange={(e)=>displayChoice(e)}
                    label="option"
                >
                    <MenuItem value="Private">Private</MenuItem>
                    <MenuItem value="Public">Public</MenuItem>
                </Select>
            </FormControl>

            <p id="result">{optionMessage}</p>
            <br /><br />
            <Button variant="contained" size="large" color="primary" type="submit" id="createRoomButton" className="buttons" value = "Update Room" onClick={updateRoom}>Update Room</Button>
            <span id="createRoomResult">{message}</span>
        </div>
    );
}

export default UpdateRoom;