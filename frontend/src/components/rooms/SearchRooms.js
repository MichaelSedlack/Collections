import React, { useRef, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

function SearchRooms(){
    var bp = require('./../Path.js');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var token = ud.accessToken;

    const searchName = useRef(null);

    const [message,setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    
    const searchRoom = async event =>
    {
        event.preventDefault();

        setIsLoading(true);

        var obj = {search:searchName.current.value};
        var js = JSON.stringify(obj);

        var config = 
        {
            method: 'get',
            url: bp.buildPath('rooms/search'),	
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
              setError(true);
            }
            else 
            {
                console.log("Response from API:",res)
                setIsLoading(false);
            }
        })
        .catch(function (err) 
        {
            console.log(err.message);
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
          <div>
            <h4>There was an error! Please Try Again!</h4>
            <p>{message}</p>
          </div>
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

    
}

export default SearchRooms;