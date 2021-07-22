import React, { useRef, useState, useContext } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { UserContext } from './UserContext';
import { useHistory } from 'react-router-dom';
import roomService from './helpers/roomService';
import collectionService from './helpers/collectionService';
import itemService from './helpers/itemService';

function Login()
{

    const context = useContext(UserContext);
    const history = useHistory();

    var bp = require('./Path.js');
    
    const loginName = useRef(null);
    const loginPassword = useRef(null);

    // Initial States
    const [message,setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');
    const [visibility, setVisibility] = useState(<VisibilityOffIcon/>);
    const [type, setType] = useState("password");


    const doLogin = event => 
    {
        event.preventDefault();

        var obj = {
          email: loginName.current.value,
          password: loginPassword.current.value
        };

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
                setMessageColor('red');
            }
            else 
            {	
                var user = {...res}
                window.localStorage.setItem('user_data', JSON.stringify(user));
                
                setMessage("Logging In");
                setMessageColor('green');
                context.setUser(user);
                roomService.setToken(res.accessToken);
                collectionService.setToken(res.accessToken);
                itemService.setToken(res.accessToken);
                setTimeout(
                    function(){
                            history.push('/museum/');
                    },2000)
            }
        })
        .catch(function (error) 
        {
            console.log(error.response.data);
        });
    }

    // Reveals or hides password
    function changeVisibility(){
        if(type === "text"){
          setVisibility(<VisibilityOffIcon/>)
          setType("password")
        }
        else{
          setVisibility(<VisibilityIcon/>)
          setType("text")
        }
      }

    return(
        <div id="loginDiv">
            <Grid container spacing={0} direction="column" alignItems="center" justify="center">
                <h4 id="inner-title">Please Sign In</h4><br />
                <TextField  style={{marginBottom: "2em"}} variant="outlined" required label="Email" type="text" id="loginName" inputRef={loginName}  />
                <TextField InputProps={{endAdornment:<Button endIcon={visibility} onClick={()=>{changeVisibility()}}/>}} style={{marginBottom: "2em"}} variant="outlined" required label="Password" type={type} id="loginPassword" inputRef={loginPassword} />
                <Button variant="contained" size="large" color="primary" type="submit" id="loginButton" className="buttons" value = "Log In" onClick={doLogin}>Log In</Button>
                <span style={{color:messageColor}}>{message}</span><br />
                <span>Don't have an account?</span>
                <Button variant="contained" size="large" color="secondary" type="submit" id="registerButton" className="buttons" value="Register" onClick={()=>{window.location.href = '/register'}}>Register</Button><br />
                <Button size="large" onClick={()=>{history.push('/forgotpassword')}}>Forgot Password?</Button>
          </Grid>
     </div>
    );
}

export default Login;