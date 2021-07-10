import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CollectionForm from './CollectionForm';


function DisplayCollections(){
    var bp = require('./Path.js');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var token = ud.accessToken;

    const { userId } = useParams(); // grabs the id from the url

    // Initial States
    const [message,setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        (async() => {
            var id = {id:userId};
            var config = 
            {
                method: 'get',
                url: bp.buildPath('users/collections'),
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
        return(<h4>{message}</h4>);
    }
    else{
        return(
            <div>
                <CollectionForm data={data}/>
            </div>
        );
    }
};

export default DisplayCollections;