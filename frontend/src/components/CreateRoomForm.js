import React, { useRef, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function CreateRoomForm()
{
    const classes = useStyles();
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    var jwt = require('jsonwebtoken');
    
    const newRoomName = useRef(null);
    var choice;

    const [message,setMessage] = useState('');
    const [option,setOption] = useState('Private');
    const [optionMessage,setOptionMessage] = useState('No one will be able to view your Room');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var firstName = ud.firstName;
    var lastName = ud.lastName;
    var email = ud.email;
    
    const createRoom = async event =>
    {
        event.preventDefault();
        var tok = storage.retrieveToken();
        var obj = {name:newRoomName.value,private:choice.value,token:tok};
        var js = JSON.stringify(obj);

        var config = 
      {
          method: 'post',
          url: bp.buildPath('rooms/create'),	
          headers: 
          {
              'Content-Type': 'application/json'
          },
          data: js
      };
      
        axios(config)
            .then(function (response) 
        {
            var res = response.data;
            if (res.error) 
            {
              setMessage('There was an error');
            }
            else 
            {
                
                setMessage('New Room Created');
                setTimeout(
                function(){
                        window.location.href = '/museum';
                },2000)
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });
    };

    const displayChoice = (e) => {
        var choice = e.target.value;

        if(choice === "Private"){
            setOption("Private");
            setOptionMessage('No one will be able to view your Room');
        }
        else{
            setOption("Public");
            setOptionMessage("Everyone will be able to view your Room");
        }
    }

    return(
        <div>
            <span id="inner-title">Create New Room</span><br />
            <TextField margin="dense" variant="outlined" type="text" id="roomName" label="Room Name" inputRef={newRoomName}/><br />


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
            <Button variant="contained" size="large" color="primary" type="submit" id="createRoomButton" className="buttons" value = "Set Up New Room" onClick={createRoom}>Set Up New Room</Button><br />
            <span id="createRoomResult">{message}</span>
        </div>
    );


};

export default CreateRoomForm;