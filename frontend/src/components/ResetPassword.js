import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const loading = {
    margin: 'lem',
    fontSize: '24px',
};

function ResetPassword () 
{
    var bp = require('./Path.js');

    const password = useRef(null);

    const [message,setMessage] = useState('');
    const [messageColor,setMessageColor] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordErrorColor, setPasswordErrorColor] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams(); // grabs the id from the url

    // once the page loads this fires
    useEffect(() => {
        (async () => {

            var obj = {resetToken:id};
            var js = JSON.stringify(obj);
            var config = 
            {
                method: 'get',
                url: bp.buildPath('users/reset'),	
                headers: 
                {
                    'Content-Type': 'application/json'
                },
                data: js
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
                    setMessage('Reset Link is verified');
                    setMessageColor('green');
                    setError(false);
                    setIsLoading(false);
                }
            })
            .catch(function(error)
            {
                setIsLoading(false);
                setError(true);
                console.log(error.response.data);
            });
        })()
        
    },[])

    
    const updatePassword = async event => {
        event.preventDefault();

        var _ud = localStorage.getItem('user_data');
        var ud = JSON.parse(_ud);
        var email = ud.email;

        var obj = {email:email,password:password.current.value};
        var js = JSON.stringify(obj);

        var config = 
      {
          method: 'put',
          url: bp.buildPath('users/updatePasswordByEmail'),	
          headers: 
          {
              'Content-Type': 'application/json'
          },
          data: js
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
            }
            else
            {
                setMessage('Password Successfully Reset');
                setError(false);
                setMessageColor('green');
                setTimeout(
                    function(){
                            window.location.href = '/';
                    },2000)
            }
        })
        .catch(function(error)
        {
            setError(true);
            console.log(error.response.data);
        });
    };

    // checks for matching passwords
    const checkValidation = (e) => {
      
        if(password.current.value !== e.target.value){
          setPasswordError("Passwords need to match");
          setPasswordErrorColor('red');
        }
        else{
            setPasswordError("The passwords match!");
            setPasswordErrorColor('green');
        }
    }
    
    if(error){
        return(
            <div>
                <h4>There was a problem resetting password. Please send another reset link</h4>
                <Button variant="contained" size="large" color="secondary" type="submit" id="loginButton" className="buttons" value="Login" onClick={()=>{window.location.href = '/'}}>Back to Home</Button><br />
            </div>
        );
        
    }
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
                <h4>Reset Your Password</h4>
                <TextField  variant="outlined" required label="Password" type="password" id="password" inputRef={password} /><br />
                <TextField margin="dense" variant="outlined" required type="password" id="confirmPassword" label="Confirm Password" onChange={(e)=> checkValidation(e)} />
                <span id="passwordResult" style={{color:passwordErrorColor}}>{passwordError}</span><br />
    
                <Button variant="contained" size="large" color="primary" type="submit" id="updateButton" className="buttons" value = "Update" onClick={updatePassword}>Update Password</Button>
                <Button variant="contained" size="large" color="secondary" type="submit" id="loginButton" className="buttons" value="Login" onClick={()=>{window.location.href = '/'}}>Cancel</Button><br />
    
                <span id="result" style={{color:messageColor}}>{message}</span>
           </div>
        );
    }
    
};

export default ResetPassword;