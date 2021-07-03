import React, { useRef, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

function Login()
{

    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    
    const loginName = useRef(null);
    const loginPassword = useRef(null);

    const [message,setMessage] = useState('');

    const doLogin = async event => 
    {
        event.preventDefault();

        var obj = {email:loginName.current.value,password:loginPassword.current.value};
        var js = JSON.stringify(obj);

        var config = 
        {
            method: 'post',
            url: bp.buildPath('users/login'),	
            headers: 
            {
                'Content-Type': 'application/json'
            },
            data: js
        };

        axios(config)
            .then(function (response) 
        {
            var res = response.data;
            if (res.error) 
            {
                setMessage("User/Password combination incorrect");
            }
            else 
            {	
                storage.storeToken(res);
                var jwt = require('jsonwebtoken');
    
                var ud = jwt.decode(storage.retrieveToken(),{complete:true});
                var userId = ud.payload.userId;
                var firstName = ud.payload.firstName;
                var lastName = ud.payload.lastName;
                var email = res.email;

                var user = {firstName:firstName,lastName:lastName,id:userId,email:email}
                localStorage.setItem('user_data', JSON.stringify(user));
                
                setMessage("Logging In");
                setTimeout(
                    function(){
                            
                            window.location.href = '/';
                    },2000)
            }
        })
        .catch(function (error) 
        {
            console.log(error.response.data);
        });
    }


    return(
      <div id="loginDiv">
        <span id="inner-title">PLEASE LOG IN</span><br />
        <TextField  variant="outlined" required label="Email" type="text" id="loginName" inputRef={loginName}  /><br />
        <TextField  variant="outlined" required label="Password" type="password" id="loginPassword" inputRef={loginPassword} /><br />
        <Button variant="contained" size="large" color="primary" type="submit" id="loginButton" className="buttons" value = "Log In" onClick={doLogin}>Log In</Button>
        <span id="loginResult">{message}</span>
        <Button variant="contained" size="large" color="secondary" type="submit" id="registerButton" className="buttons" value="Register" onClick={()=>{window.location.href = '/register'}}>Register</Button>
        <Button size="large" onClick={()=>{window.location.href = '/forgotpassword'}}>Forgot Password?</Button>
     </div>
    );
};

export default Login;
