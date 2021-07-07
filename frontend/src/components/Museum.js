import React, { useEffect, useState } from 'react';
import CreateRoomForm from './CreateRoomForm';
import SearchRooms from './SearchRooms';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import bodyParser from 'body-parser';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DisplayRooms from './DisplayRooms';




function Museum() {

    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var token = ud.accessToken;

    const [createRoomForm,setCreateRoomForm] = useState();
    const [cancelButton, setCancelButton] = useState(false);
    const [display, setDisplay] = useState();
    const [message,setMessage] = useState('');
    const { userId } = useParams(); // grabs the id from the url
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        (async() => {
            var id = {id:userId};
            var config = 
            {
                method: 'get',
                url: bp.buildPath(`users/`),
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                },
                params: id
            };
            axios(config)
                .then(function(response)
            {
                var res = response.data;
                if(res.error)
                {
                    setError(true);
                    setMessage("There was an error");
                    setIsLoading(false);
                }
                else{
                    setIsLoading(false);
                    setError(false);
                    storage.storeToken(res);
                    var firstName=res.firstName;
                    setDisplay(firstName);
                    // var jwt = require('jsonwebtoken');
                    // var ud = jwt.decode(storage.retrieveToken(),{complete:true});
                    // var firstName = ud.payload.firstName;
                }
            })
            .catch(function(error)
            {
                setIsLoading(false);
                setError(true);
               console.log(error.message);
            });

        })()
    },[])


    const handleLogout = () => {
      storage.clearTokens();
      return window.location.href = '/';
    }

    const createNewRoomForm = () => {
        setCancelButton(true)  
        setCreateRoomForm(<CreateRoomForm />)
        
    };

    function cancelClicked() {
        setCancelButton(false)
        // {window.location.href = '/museum'}
    };



    if(isLoading){
        return(
            <h4>Loading Webpage</h4>
        );
    }
    else if(error){
        return(
            <h4>There was an Error! Please try again!</h4>
        );
    }
    else if(cancelButton){
        return(
            <div id="museumDiv">
                <Grid container spacing={3}>
                    {/* Set up in to rows of length 12 */}
                    <Grid item xs={12}/>

                    {/* Begin Row (This row is split into 2+5+5=12)*/}
                    <Grid item xs={2}/>
                    <Grid item xs={5}>  
                        {/* <SearchRooms/> */}
                        <TextField id="outlined-basic" label="Search Rooms" variant="outlined" />
                        <Button variant="contained" size="large" color="primary" type="submit" id="searchButton" className="buttons" value="Search" onClick={()=>{alert("search button clicked")}}>Search Rooms</Button>
                    </Grid> 
                    <Grid item xs={5}>
                        <Button variant="contained" size="large" color="secondary" type="submit" id="loginButton" className="buttons" value="Sign Out" onClick={()=>{handleLogout()}}>Sign Out</Button> <br />
                    </Grid>
                    {/* End Row */}

                    <Grid item xs={12}/>

                    <Grid item xs={1}/>
                    <Grid item xs={4}>
                        <span id="displayRoom"><h1>{display}'s Rooms</h1></span>
                        <DisplayRooms/>
                    </Grid>
                    <Grid item xs={2}/>
                    <Grid item xs={5}>
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
                    {/* Set up in to rows of length 12 */}
                    <Grid item xs={12}/>

                    {/* Begin Row (This row is split into 2+5+5=12)*/}
                    <Grid item xs={2}/>
                    <Grid item xs={5}>    
                        {/* <SearchRooms/> */}                    
                        <TextField id="outlined-basic" label="Search Rooms" variant="outlined" />
                        <Button variant="contained" size="large" color="primary" type="submit" id="searchButton" className="buttons" value="Search" onClick={()=>{alert("Search button clicked")}}>Search Rooms</Button>
                    </Grid>
                    <Grid item xs={5}>
                        <Button variant="contained" size="large" color="secondary" type="submit" id="loginButton" className="buttons" value="Sign Out" onClick={()=>{handleLogout()}}>Sign Out</Button> <br />
                    </Grid>
                    {/* End Row */}

                    <Grid item xs={12}/>

                    <Grid item xs={1}/>
                    <Grid item xs={4}>
                       <span id="displayRoom"><h1>{display}'s Rooms</h1></span>  
                        <DisplayRooms/>
                    </Grid>
                    <Grid item xs={2}/>
                    <Grid item xs={5}>
                        <Button variant="contained" size="large" color="primary" type="submit" id="createRoomFormButton" className="buttons" value="Create New Room" onClick={() => createNewRoomForm()}>Create New Room</Button><br />
                    </Grid>

                    <Grid item xs={12}/>
                </Grid>
            </div>
        )
    }
}

export default Museum;