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

    const [message,setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const { userId } = useParams(); // grabs the id from the url
    
    useEffect(() => {
        (async() => {
            var id = {id:userId};
            var config = 
            {
                method: 'get',
                url: bp.buildPath('users/:id/rooms'),
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
                    setError(false);
                    setIsLoading(false);
                    storage.storeToken(res);
                    var jwt = require('jsonwebtoken');
                    var ud = jwt.decode(storage.retrieveToken(),{complete:true});
                    var name = res.name;
                    alert(name)
                }
            })
            .catch(function(error)
            {
                setError(true);
                setIsLoading(false);
                console.log(error.message);
            });

        })()
    },[])


   
    if(isLoading){
        return(
            <div>
                <h4>Loading Search Results!</h4>
            </div>
        );
    }
    else if(error){
        return(
            <h4>There was an error! Please Try Again!</h4>
        );
    }
    else{
        return(
            <div>
                <h4>Search Results!</h4>
            </div>
        );
    }

    
};

export default SearchRooms;