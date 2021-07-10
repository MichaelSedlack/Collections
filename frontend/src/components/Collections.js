import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DisplayCollections from './DisplayCollections';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CreateCollectionForm from './CreateCollectionForm'; 
import TextField from '@material-ui/core/TextField';

function Collections(){

    const searchCollectionName = useRef(null);

    const { userId } = useParams(); // grabs the id from the url

    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var token = ud.accessToken;

    const [createCollectionForm,setCreateCollectionForm] = useState();
    const [cancelButton, setCancelButton] = useState(false);
    const [message,setMessage] = useState('');
    const [display, setDisplay] = useState();
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
        // only fires at beginning
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

    // Renders the Create New Room Form 
    const createNewCollectionForm = () => {
        setCancelButton(true)  
        setCreateCollectionForm(<CreateCollectionForm />)
        
    };
    
    // Used to hide the Create New Room Form
    function cancelClicked() {
        setCancelButton(false)
        // {window.location.href = '/museum'}
    };
    
    
     // If UseEffect hasn't finished then show loading message
    if(isLoading){
        return(
            <h4>Loading Webpage</h4>
        );
    }
    else if(error){
        return(
            <h4>{message}</h4>
        );
    }
    else if(cancelButton){
        return(
            <div id="collectionDiv">
                <Grid container spacing={3}>
                    {/* Set up in to rows of length 12 */}
                    <Grid item xs={12}/>

                    {/* Begin Row (This row is split into 2+5+5=12)*/}
                    <Grid item xs={2}/>
                    <Grid item xs={5}>  
                        <TextField id="outlined-basic" label="Search Collections" variant="outlined" inputRef={searchCollectionName} />
                        <Button variant="contained" size="large" color="primary" type="submit" id="searchButton" className="buttons" value="Search" onClick={()=>{alert("search button clicked")}}>Search Collections</Button>
                    </Grid> 
                    <Grid item xs={5}>
                        <Button variant="contained" size="large" color="secondary" type="submit" id="loginButton" className="buttons" value="Sign Out" onClick={()=>{handleLogout()}}>Sign Out</Button> <br />
                        <Button  variant="contained" size="large" color="primary" type="submit" id="loginButton" className="buttons" value="Rooms" onClick={()=>{window.location.href=`/museum/${userId}`}}>Back to Rooms</Button> <br />
                    </Grid>
                    {/* End Row */}

                    {/* single row of nothing. Im using this to space things out */}
                    <Grid item xs={12}/> 

                    {/* Begin Row */}
                    <Grid item xs={1}/>
                    <Grid item xs={4}>
                        <span id="displayRoom"><h1>{display}'s Collections</h1></span>
                        <DisplayCollections/>
                    </Grid>
                    <Grid item xs={2}/>
                    <Grid item xs={5}>
                        <span id="createCollectionFormResult" >{createCollectionForm}</span><br />
                        {cancelButton ? <Button variant="contained" size="large" color="secondary" type="submit" id="cancelButton" className="buttons" value="Cancel" onClick={()=>{cancelClicked()}}>Cancel</Button> : null}
                    </Grid> 
                    {/* End Row */}
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
                                         
                           <TextField id="outlined-basic" label="Search Collections" variant="outlined" inputRef={searchCollectionName}/>
                           <Button variant="contained" size="large" color="primary" type="submit" id="searchButton" className="buttons" value="Search" onClick={()=>{alert("Search button clicked")}}>Search Collections</Button>
                       </Grid>
                       <Grid item xs={5}>
                           <Button  variant="contained" size="large" color="secondary" type="submit" id="loginButton" className="buttons" value="Sign Out" onClick={()=>{handleLogout()}}>Sign Out</Button> <br />
                           <Button  variant="contained" size="large" color="primary" type="submit" id="loginButton" className="buttons" value="Rooms" onClick={()=>{window.location.href=`/museum/${userId}`}}>Back to Rooms</Button> <br />
                       </Grid>
                       {/* End Row */}
                       
                       {/* single row of nothing. Im using this to space things out */}
                       <Grid item xs={12}/>
                       
                       {/* Begin Row */}
                       <Grid item xs={1}/>
                       <Grid item xs={4}>
                          <span id="displayRoom"><h1>{display}'s Collections</h1></span>  
                           <DisplayCollections/>
                       </Grid>
                       <Grid item xs={2}/>
                       <Grid item xs={5}>
                           <Button variant="contained" size="large" color="primary" type="submit" id="createCollectionFormButton" className="buttons" value="Create New Collection" onClick={() => createNewCollectionForm()}>Create New Collection</Button><br />
                       </Grid>
                       {/* End Row */}
                       
                       <Grid item xs={12}/>
                   </Grid>
            </div>
        );
        
    }
    
};

export default Collections;