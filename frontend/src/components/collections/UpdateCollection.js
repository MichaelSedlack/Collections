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

function UpdateCollection({collectionData, handleClose})
{
    const classes = useStyles();

    const {doUpdate} = useContext(ApiContext);
    // Initial states
    const [message,setMessage] = useState('');
    const [option,setOption] = useState('Private');
    const [optionMessage,setOptionMessage] = useState('No one will be able to view your Room');
    const [checkOption, setCheckOption] = useState(true);
    const [name,setName] = useState(collectionData.collectionName);
    const [collectionId] = useState(collectionData.collectionId);
    
    // Displays to the user what the private/public options mean
    const displayChoice = (e) => {
        var choice = e.target.value;

        if(choice === "Private"){
            setOption("Private");
            setOptionMessage('No one will be able to view your collection');
            setCheckOption(true);
        }
        else{
            setOption("Public");
            setOptionMessage("Everyone will be able to view your collection");
            setCheckOption(false);
        }
    }

    const updateCollection = event =>
    {
        event.preventDefault();
        const newCollection = {
            name:name,
            private:checkOption
        };

        const res = doUpdate(collectionId, newCollection);

        if(res.error){
            setMessage(res.error);
          }else{
            setMessage("Successfully updated collection!");
            setTimeout(function(){
              setMessage("");
              handleClose();
            },1000)
          }
    };

    return(
        <div>
            <TextField margin="dense" variant="outlined" type="text" id="collectionName" defaultValue={name} label="Room Name" onChange={(e) => setName(e.target.value)}/><br />
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
            <Button variant="contained" size="large" color="primary" type="submit" id="createcollectionButton" className="buttons" value = "Update collection" onClick={updateCollection}>Update collection</Button>
            <span id="createcollectionResult">{message}</span>
        </div>
    );
}

export default UpdateCollection;