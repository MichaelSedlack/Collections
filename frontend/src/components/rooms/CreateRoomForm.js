import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { ApiContext } from '../ApiContext';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function CreateRoomForm(){
    const { doCreate } = useContext(ApiContext);

    const classes = useStyles();

    // Initial States
    const [message,setMessage] = useState('');
    const [option,setOption] = useState('Private');
    const [optionMessage,setOptionMessage] = useState('No one will be able to view your Room');
    const [checkOption, setCheckOption] = useState(true);
    const [open, setOpen] = useState(false);
    const [roomName, setRoomName] = useState("");


    const createRoom = async event =>
    {
        event.preventDefault();

        var room = {
          name: roomName,
          private: checkOption
        };

        const res = doCreate(room);

        if(res.error){
          setMessage(res.error);
          return;
        }

        setMessage("Successfully created room!");
        setTimeout(() => {
          setMessage("");
          setOpen(false);
          setRoomName("");
          setOpen(false);
        }, 500);
    };

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

    const handleNameChange = (e) => {
      setRoomName(e.target.value);
    }

    if(open){
        return(
          <div>
              <span id="inner-title">Create New Room</span><br />
              <TextField margin="dense" variant="outlined" type="text" id="roomName" label="Room Name" value={roomName} onChange={e => handleNameChange(e)}/><br />

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

              <span id="result">{optionMessage}</span>
              <br /><br />
              <Button variant="contained" size="large" color="primary" type="submit" id="createRoomButton" className="buttons" value = "Set Up New Room" onClick={createRoom}>Set Up New Room</Button>
              <Button variant="contained" size="large" color="secondary" type="submit" id="cancelButton" className="buttons" value="Cancel" onClick={()=>{setOpen(false)}}>Cancel</Button><br />
              <span id="createRoomResult">{message}</span>
          </div>
      );
    }else{
      return(
        <div>
          <Button variant="contained" size="large" color="primary" type="submit" id="createRoomFormButton" className="buttons" value="Create New Room" onClick={() => setOpen(true)}>Create New Room</Button><br />
        </div>
      )
    }
}

export default CreateRoomForm;