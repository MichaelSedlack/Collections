import React, { useEffect, useState, useContext } from 'react';
import CreateCollectionForm from './CreateCollectionForm';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import DisplayCollections from './DisplayCollections';
// import SearchCollections from './SearchCollections';
import { UserContext, RoomContext } from './UserContext';


function Museum() {

  const {user, setUser} = useContext(UserContext)
  const {room} = useContext(RoomContext);

  const history = useHistory();

  var bp = require('./Path.js');
  var storage = require('../tokenStorage.js');

  // Initial States
  const [message,setMessage] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // only fires at beginning
  useEffect(() => {
      (async() => {
          var id = {id: user.id};
          var config = 
          {
              method: 'get',
              url: bp.buildPath(`users/collections`),
              headers:
              {
                  'Content-Type': 'application/json',
                  'Authorization': `bearer ${user.accessToken}`
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
              }
          })
          .catch(function(err)
          {
              setIsLoading(false);
              setError(true);
              console.log(err.message);
          });

      })()
  },[user, bp])
    
    const handleLogout = () => {
      storage.clearTokens();
      setUser(null);
      history.push('/');
    }

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
    }else{
        return(
            <div>
                <Grid container spacing={3}>
                    {/* Set up in to rows of length 12 */}
                    <Grid item xs={12}/>

                    {/* Begin Row (This row is split into 2+5+5=12)*/}
                    <Grid item xs={2}/>
                    <Grid item xs={5}>    
                        {/* <SearchCollections/>                     */}
                        {/* <TextField id="outlined-basic" label="Search Rooms" variant="outlined" />
                        <Button variant="contained" size="large" color="primary" type="submit" id="searchButton" className="buttons" value="Search" onClick={()=>{alert("Search button clicked")}}>Search Rooms</Button> */}
                    </Grid>
                    <Grid item xs={5}>
                        <Button variant="contained" size="large" color="secondary" type="submit" id="loginButton" className="buttons" value="Sign Out" onClick={()=>{handleLogout()}}>Sign Out</Button>
                        <Button variant="contained" size="large" color="primary" type="submit" id="roomButton" className="buttons" value="Back to Rooms" onClick={()=>{history.push("/museum")}}>Back to Rooms</Button> <br />
                    </Grid>
                    {/* End Row */}

                    {/* single row of nothing. Im using this to space things out */}
                    <Grid item xs={12}/>

                    {/* Begin Row */}
                    <Grid item xs={1}/>
                    <Grid item xs={4}>
                       <span id="displayCollection"><h1>{room.name} Collections</h1></span>  
                        {/* <DisplayCollections/> */}
                    </Grid>
                    <Grid item xs={2}/>
                    <Grid item xs={5}>
                        <CreateCollectionForm/>
                    </Grid>
                    {/* End Row */}

                    <Grid item xs={12}/>
                </Grid>
            </div>
        )
    }
}

export default Museum;