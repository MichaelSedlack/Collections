import React, { useRef, useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


function Register()
{
    var bp = require('./Path.js');


    const registerFirstName = useRef(null);
    const registerLastName = useRef(null);
    const registerEmail = useRef(null);
    const registerPassword = useRef(null);


    const [message,setMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [messageColor, setMessageColor] = useState('green');
    const [passwordError, setPasswordError] = useState('');
    const [emailErrorColor, setEmailErrorColor] = useState('');
    const [passwordErrorColor, setPasswordErrorColor] = useState('');
    const [checkEmailError, setCheckEmailError] = useState(false);
    const [checkPasswordError, setCheckPasswordError] = useState(false);
    

    const doRegister = async event => 
    {
      event.preventDefault();

      var obj = {firstName:registerFirstName.current.value,lastName:registerLastName.current.value,email:registerEmail.current.value,password:registerPassword.current.value};
      var js = JSON.stringify(obj);

      var config = 
      {
          method: 'post',
          url: bp.buildPath('users/register'),	
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
              setMessage('There was an Error');
              setMessageColor('red');
            }
            else 
            {
              setMessage('New Account Created');
              setTimeout(
                function(){
                        window.location.href = '/';
                },2000)
            }
        })
        .catch(function (error) 
        {
          setMessage('There was an Error');
          setMessageColor('red');
          console.log(error.response.data);
        });
    };

    // checks for matching passwords
    const checkValidation = (e) => {
      
      if(registerPassword.current.value !== e.target.value){
        setPasswordError("Passwords need to match");
        setPasswordErrorColor('red');
        setCheckPasswordError(true);
      }
      else{
          setPasswordError("The passwords match!");
          setPasswordErrorColor('green');
          setCheckPasswordError(false);
      }
    }


    // validates email
    const validateEmail = (e) => {
      var email = e.target.value
    
      if (validator.isEmail(email)) {
        setEmailError('Valid Email!')
        setEmailErrorColor('green');
        setCheckEmailError(false);
      } else {
        setEmailError('Enter valid Email!')
        setEmailErrorColor('red');
        setCheckEmailError(true);
      }
    } 

    if(checkEmailError || checkPasswordError){
      return(
        <div id="registerDiv">
            <Grid container spacing={0} direction="column" alignItems="center" justify="center">
              <h4 id="inner-title">PLEASE REGISTER</h4><br />
              <TextField margin="dense" variant="outlined" type="text" id="registerFirstName" label="First Name" inputRef={registerFirstName}  /><br />
              <TextField margin="dense" variant="outlined"  type="text" id="registerLastName" label="Last Name" inputRef={registerLastName}  /><br />
              <TextField margin="dense" variant="outlined" required type="text" id="registerEmail" label="Email" onChange={(e)=> validateEmail(e)} inputRef={registerEmail} />
              <span id="registerEmailResult" style={{color:emailErrorColor}}>{emailError}</span><br />
              <TextField margin="dense" variant="outlined" required type="password" id="registerPassword" label="Password" inputRef={registerPassword} /><br />
              <TextField margin="dense" variant="outlined" required type="password" id="registerConfirmPassword" label="Confirm Password" onChange={(e)=> checkValidation(e)} />
              <span id="registerPasswordResult" style={{color:passwordErrorColor}}>{passwordError}</span><br />
              <Button disabled style={{marginBottom: "2em"}} variant="contained" size="large" color="primary" type="submit" id="registerButton" className="buttons" value = "Complete Registration" onClick={doRegister}>Complete Registration</Button>
              <Button style={{marginBottom: "2em"}} variant="contained" size="large" color="secondary" type="submit" id="loginButton" className="buttons" value="Login" onClick={()=>{window.location.href = '/'}}>Back to Login</Button><br />
              <span id="registrationResult" style={{color:messageColor}}>{<h1>{message}</h1>}</span>
              <br />
            </Grid>
       </div>
      );
    }
    else{
      return(
        <div id="registerDiv">
            <Grid container spacing={0} direction="column" alignItems="center" justify="center">
              <h4 id="inner-title">PLEASE REGISTER</h4><br />
              <TextField margin="dense" variant="outlined" type="text" id="registerFirstName" label="First Name" inputRef={registerFirstName}  /><br />
              <TextField margin="dense" variant="outlined"  type="text" id="registerLastName" label="Last Name" inputRef={registerLastName}  /><br />
              <TextField margin="dense" variant="outlined" required type="text" id="registerEmail" label="Email" onChange={(e)=> validateEmail(e)} inputRef={registerEmail} />
              <span id="registerEmailResult" style={{color:emailErrorColor}}>{emailError}</span><br />
              <TextField margin="dense" variant="outlined" required type="password" id="registerPassword" label="Password" inputRef={registerPassword} /><br />
              <TextField margin="dense" variant="outlined" required type="password" id="registerConfirmPassword" label="Confirm Password" onChange={(e)=> checkValidation(e)} />
              <span id="registerPasswordResult" style={{color:passwordErrorColor}}>{passwordError}</span><br />
              <Button style={{marginBottom: "2em"}} variant="contained" size="large" color="primary" type="submit" id="registerButton" className="buttons" value = "Complete Registration" onClick={doRegister}>Complete Registration</Button>
              <Button style={{marginBottom: "2em"}} variant="contained" size="large" color="secondary" type="submit" id="loginButton" className="buttons" value="Login" onClick={()=>{window.location.href = '/'}}>Back to Login</Button><br />
              <span id="registrationResult" style={{color:messageColor}}>{<h1>{message}</h1>}</span>
              <br />
            </Grid>
       </div>
      );
    }
    
};

export default Register;
