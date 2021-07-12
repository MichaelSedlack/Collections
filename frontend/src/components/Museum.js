import React, { useEffect, useState, useContext } from 'react';
import CreateRoomForm from './CreateRoomForm';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import DisplayRooms from './DisplayRooms';
import SearchRooms from './SearchRooms';
import { UserContext } from './UserContext';
const { deleteRoom } = require('./helpers/api');




function Museum() {

  const {user, setUser} = useContext(UserContext)
  const history = useHistory();

  var bp = require('./Path.js');
  var storage = require('../tokenStorage.js');

  // Initial States
  const [createRoomForm,setCreateRoomForm] = useState();
  const [cancelButton, setCancelButton] = useState(false);
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
              url: bp.buildPath(`users/`),
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
                        <SearchRooms/>                    
                        {/* <TextField id="outlined-basic" label="Search Rooms" variant="outlined" />
                        <Button variant="contained" size="large" color="primary" type="submit" id="searchButton" className="buttons" value="Search" onClick={()=>{alert("Search button clicked")}}>Search Rooms</Button> */}
                    </Grid>
                    <Grid item xs={5}>
                        <Button variant="contained" size="large" color="secondary" type="submit" id="loginButton" className="buttons" value="Sign Out" onClick={()=>{handleLogout()}}>Sign Out</Button> <br />
                    </Grid>
                    {/* End Row */}

                    {/* single row of nothing. Im using this to space things out */}
                    <Grid item xs={12}/>

                    {/* Begin Row */}
                    <Grid item xs={1}/>
                    <Grid item xs={4}>
                       <span id="displayRoom"><h1>{user.firstName}'s Rooms</h1></span>  
                        <DisplayRooms/>
                    </Grid>
                    <Grid item xs={2}/>
                    <Grid item xs={5}>
                        <CreateRoomForm/>
                    </Grid>
                    {/* End Row */}

                    <Grid item xs={12}/>
                </Grid>
            </div>
        )
    }
}

export default Museum;