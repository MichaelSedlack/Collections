import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';

function SearchRooms(){
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var token = ud.accessToken;

    const searchName = useRef(null);

    const [message,setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    // const { userId } = useParams(); // grabs the id from the url
    
    const searchRoom = async event =>
    {
        event.preventDefault();

        var obj = {search:searchName.current.value};
        var js = JSON.stringify(obj);

        var config = 
        {
            method: 'get',
            url: bp.buildPath('rooms/create'),	
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
                console.log("Response from API:",res)
            }
        })
        .catch(function (error) 
        {
            console.log(error.message);
        });
    }


   // If useEffect hasn't finished
    if(isLoading){
        return(
            <div>
                <h4>Loading Search Results!</h4>
            </div>
        );
    }
    // If API returns an error
    else if(error){
        return(
            <h4>There was an error! Please Try Again!</h4>
        );
    }
    else{
        return(
            <div>
                <TextField id="outlined-basic" label="Search Rooms" variant="outlined" inputRef={searchName} />
                <Button variant="contained" size="large" color="primary" type="submit" id="searchButton" className="buttons" value="Search" onClick={searchRoom}>Search Rooms</Button>

            </div>
        );
    }

    
};

export default SearchRooms;