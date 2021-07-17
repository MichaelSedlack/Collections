import React, { useRef, useState, useContext } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { RoomContext } from './../UserContext';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function CreateCollectionForm()
{
    const keyName = useRef(null);
    const {room} = useContext(RoomContext);

    const classes = useStyles();
    var bp = require('./../Path.js');
    var storage = require('../../tokenStorage.js');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var token = ud.accessToken;

    // Initial States
    const [message,setMessage] = useState('');
    const [option,setOption] = useState('Private');
    const [optionMessage,setOptionMessage] = useState('No one will be able to view your Collection');
    const [checkOption, setCheckOption] = useState(true);
    const [open, setOpen] = useState(false);
    const [collectionName, setCollectionName] = useState("");
    const [collectionKeys, setCollectionKeys] = useState([]);
    const [keyMessage, setKeyMessage] = useState("");
    const [showKeyMessage, setShowKeyMessage] = useState(false);
    const [template, setTemplate] = useState(false);

    const createCollection = async event =>
    {
        event.preventDefault();

        var obj = {name:collectionName,private:checkOption, roomID:room.id, keys:collectionKeys};
        var js = JSON.stringify(obj);

        var config = 
      {
          method: 'post',
          url: bp.buildPath('collections/create'),	
          headers: 
          {
              'Content-Type': 'application/json',
              'Authorization': `bearer ${token}`
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
                storage.storeToken(res);

                setMessage('New Collection Created');
                setTimeout(
                function(){
                        setCollectionName("");
                        setOpen(false);
                },2000)
            }
        })
        .catch(function (error) 
        {
            setMessage(error.message);
        });
    };

    const displayChoice = (e) => {
        var choice = e.target.value;

        if(choice === "Private"){
            setOption("Private");
            setOptionMessage('No one will be able to view your Collection');
            setCheckOption(true);
        }
        else{
            setOption("Public");
            setOptionMessage("Everyone will be able to view your Collection");
            setCheckOption(false);
        }
    }

    const handleNameChange = (e) => {
      setCollectionName(e.target.value);
    }

    // Adds new key elements to the collectionKeys array
    function handleKeys() {
      setCollectionKeys(collectionKeys => [...collectionKeys, keyName.current.value]);
      console.log(collectionKeys);
      keyName.current.value="";
      setShowKeyMessage(true);
      setKeyMessage("Added Key");
      setTimeout(
        function(){
          setShowKeyMessage(false);
        },700)
    }

    const handleRadioChange = (event) => {
      setTemplate(true);
      switch(event.target.value){
        case "Books":
          setCollectionKeys(["Author", "Genre", "Year", "Edition"]);
          break;
        case "Movies":
          setCollectionKeys(["Author", "Genre", "Year", "Platform"]);
          break;  
        case "Trading Cards":
          setCollectionKeys(["Set", "Condition", "Year", "Rarity"]);
          break;  
        case "Art":
          setCollectionKeys(["Artist", "Condition", "Year", "Style"]);
          break;  
        default:
          setTemplate(false);
          setCollectionKeys([]);
          break;
      }
    };

    if(open){
        return(
          <div>
              <span id="inner-title">Create New Collection</span><br />
              
              <TextField margin="dense" variant="outlined" type="text" id="collectionName" label="Collection Name" value={collectionName} onChange={e => handleNameChange(e)}/><br />
              <h4>Custom Properties</h4>
              <TextField disabled={template ? true : false} margin="dense" variant="outlined" type="text" id="collectionKeys" label="Collection Properties"  inputRef={keyName}/>
              <Button disabled={template ? true : false} variant="contained" size="medium" color="primary" type="submit" id="addKeyButton" className="buttons" value = "Add Key" onClick={()=>{handleKeys()}}>Add Key</Button>
              {showKeyMessage ? <span>{keyMessage}</span> : null}
              <br/>
              <h4>OR Choose a Template</h4>
              <RadioGroup row aria-label="position" name="position" defaultValue="top" onChange={e=>handleRadioChange(e)}>
                <FormControlLabel
                  value="None"
                  control={<Radio color="primary" />}
                  label="None"
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

              <br/>
              <hr align="left" width="60%"/> 
              <br/>

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
              <Button variant="contained" size="large" color="primary" type="submit" id="CreateCollectionButton" className="buttons" value = "Set Up New Collection" onClick={createCollection}>Set Up New Collection</Button>
              <Button variant="contained" size="large" color="secondary" type="submit" id="cancelButton" className="buttons" value="Cancel" onClick={()=>{setOpen(false)}}>Cancel</Button><br />
              <span id="CreateCollectionResult">{message}</span>
          </div>
      );
    }else{
      return(
        <div>
          <Button variant="contained" size="large" color="primary" type="submit" id="CreateCollectionFormButton" className="buttons" value="Create New Collection" onClick={() => setOpen(true)}>Create New Collection</Button><br />
        </div>
      )
    }
}

export default CreateCollectionForm;