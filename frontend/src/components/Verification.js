import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const loading = {
    margin: 'lem',
    fontSize: '24px',
};

function Verification () 
{
    var bp = require('./Path.js');

    const [message,setMessage] = useState('');
    const [messageColor,setMessageColor] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams(); // grabs the id from the url

    useEffect(() => {
        (async () => {

            var validateToken = {validateToken:id};
            var config = 
            {
                method: 'get',
                url: bp.buildPath('users/validate'),	
                headers: 
                {
                    'Content-Type': 'application/json'
                },
                params: validateToken
            };

            axios(config)
                .then(function(response)
            {
                var res = response.data;
                if(res.error)
                {
                    setMessage("There was an error");
                    setMessageColor('red');
                    setError(true);
                    setIsLoading(false);
                }
                else
                {
                    setMessage('Email is verified. Navigating back to Log In');
                    setMessageColor('green');
                    setError(false);
                    setIsLoading(false);
                    setTimeout(
                        function(){
                            window.location.href = '/';
                        },1000)
                }
            })
            .catch(function(error)
            {
                setIsLoading(false);
                setError(true);
                console.log(error.message);
            });
        })()
        
    },[bp,id])


    // If the api responds with an error
    if(error){
        return(
            <div>
                <h4>There was a problem verifying your email. Please try again!</h4>
                <Button variant="contained" size="large" color="secondary" type="submit" id="loginButton" className="buttons" value="Login" onClick={()=>{window.location.href = '/'}}>Back to Home</Button><br />
            </div>
        );
        
    }
    // If useEffect hasn't finished
    else if(isLoading){
        return(
            <div>
                <div style={loading}>Loading User Data...</div>
            </div>
        );
    }
    else{
        return(
            <div>
                <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                    <h4>Email Verification</h4>
                    <span id="result" style={{color:messageColor}}>{message}</span>
                </Grid>
           </div>
        );
    }
    
};

export default Verification;