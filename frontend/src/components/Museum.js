import React, { useEffect, useState } from 'react';
import CreateRoomForm from './CreateRoomForm';
import SearchRooms from './SearchRooms';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import bodyParser from 'body-parser';
import axios from 'axios';
import { useParams } from 'react-router-dom';




function Museum() {

    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    const [createRoomForm,setCreateRoomForm] = useState();
    const [cancelButton, setCancelButton] = useState(false);
    const [display, setDisplay] = useState();
    const [message,setMessage] = useState('');
    const { userId } = useParams(); // grabs the id from the url


    useEffect(() => {
        (async() => {
            var id = {id:userId};
            var config = 
            {
                method: 'get',
                url: bp.buildPath('users/:id'),
                headers:
                {
                    'Content-Type': 'application/json'
                },
                params: id
            };
            axios(config)
                .then(function(response)
            {
                var res = response.data;
                if(res.error)
                {
                    setMessage("There was an error");
                }
                else{
                    storage.storeToken(res);
                    var jwt = require('jsonwebtoken');
                    var ud = jwt.decode(storage.retrieveToken(),{complete:true});
                    var firstName = ud.payload.firstName;
                }
            })
            .catch(function(error)
            {
                console.log(error.message);
            });

        })()
    },[])




    const createNewRoomForm = () => {
        setCancelButton(true)  
        setCreateRoomForm(<CreateRoomForm />)
        
    };

    function cancelClicked() {
        setCancelButton(false)
        // {window.location.href = '/museum'}
    };


    const search = () => {
        setDisplay(<SearchRooms/>)
    };

    if(cancelButton){
        return(
            <div id="museumDiv">
                <Grid container spacing={3}>
                    <Grid item xs={12}/>
                    <Grid item xs={7} >
                        <TextField id="outlined-basic" label="Search Rooms" variant="outlined" />
                        <Button variant="contained" size="large" color="primary" type="submit" id="searchButton" className="buttons" value="Search" onClick={()=>{search()}}>Search Rooms</Button>
                    </Grid>
                    <Grid item xs={5}>
                        <Button variant="contained" size="large" color="secondary" type="submit" id="loginButton" className="buttons" value="Sign Out" onClick={()=>{window.location.href = '/'}}>Sign Out</Button> <br />
                    </Grid>
                    <Grid item xs={12}/>
                    <Grid item xs={7}>
                        <span id="displayRoom">{display}</span>
                        <h1>Rooms Here</h1>
                        <h1>Rooms Here</h1>
                        <h1>Rooms Here</h1>
                        <h1>Rooms Here</h1>
                        <h1>Rooms Here</h1>
                        <h1>Rooms Here</h1>
                        <h1>Rooms Here</h1>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                        <span id="createNewRoomFormResult" >{createRoomForm}</span><br />
                        {cancelButton ? <Button variant="contained" size="large" color="secondary" type="submit" id="cancelButton" className="buttons" value="Cancel" onClick={()=>{cancelClicked()}}>Cancel</Button> : null}
                    </Grid>
                </Grid>
            </div>
        )
    }
    else{
        return(
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12} />
                    <Grid item xs={7} >
                        <TextField id="outlined-basic" label="Search Rooms" variant="outlined" />
                        <Button variant="contained" size="large" color="primary" type="submit" id="searchButton" className="buttons" value="Search" onClick={()=>{search()}}>Search Rooms</Button>
                    </Grid>
                    <Grid item xs={5}>
                        <Button variant="contained" size="large" color="secondary" type="submit" id="loginButton" className="buttons" value="Sign Out" onClick={()=>{window.location.href = '/'}}>Sign Out</Button> <br />
                    </Grid>
                    <Grid item xs={12}/>
                    <Grid item xs={7}>
                    <span id="displayRoom">{display}</span>
                    <h1>Rooms Here</h1>
                    <h1>Rooms Here</h1>
                    <h1>Rooms Here</h1>
                    <h1>Rooms Here</h1>
                    <h1>Rooms Here</h1>
                    <h1>Rooms Here</h1>
                    <h1>Rooms Here</h1>
                    </Grid>
                    <Grid item xs={5}>
                        <Button variant="contained" size="large" color="primary" type="submit" id="createRoomFormButton" className="buttons" value="Create New Room" onClick={() => createNewRoomForm()}>Create New Room</Button><br />
                    </Grid>
                </Grid>  
            </div>
        )
    }
}

export default Museum;