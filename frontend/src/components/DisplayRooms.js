import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useParams } from 'react-router-dom';
import Data from './Data.js';

function DisplayRooms(){
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var token = ud.accessToken;

    const searchName = useRef(null);

    const [message,setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const { userId } = useParams(); // grabs the id from the url
    const [data, setData] = useState([]);
    
    useEffect(() => {
        (async() => {
            var id = {id:userId};
            var config = 
            {
                method: 'get',
                url: bp.buildPath('users/rooms'),
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
                    setData(res)
                    console.log('Response from API:',res)
                    console.log('data:',res.data)
                    // storage.storeToken(res);
                    // var jwt = require('jsonwebtoken');
                    // var ud = jwt.decode(storage.retrieveToken(),{complete:true});
                    // var results = ud.results;
                    // alert(results)
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
        return(<div><h4>Loading Rooms!</h4></div>);
    }
    else if(error){
        return(<h4>There was an error display rooms!</h4>);
    }
    else{
        return(
            <div>
                <Data data={data}/>
            </div>
        

            );
    }
};

export default DisplayRooms;