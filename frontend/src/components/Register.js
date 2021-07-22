import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';


function Register()
{
    var bp = require('./Path.js');
    const history = useHistory();


    const registerFirstName = useRef(null);
    const registerLastName = useRef(null);
    const registerEmail = useRef(null);
    const registerPassword = useRef(null);


  // Initial States
  const [message,setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageColor, setMessageColor] = useState('green');
  const [passwordError, setPasswordError] = useState('');
  const [emailErrorColor, setEmailErrorColor] = useState('');
  const [passwordErrorColor, setPasswordErrorColor] = useState('');
  const [checkEmailError, setCheckEmailError] = useState(false);
  const [checkPasswordError, setCheckPasswordError] = useState(false);
  const [visibility, setVisibility] = useState(<VisibilityOffIcon/>);
  const [type, setType] = useState("password");
    

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
            setMessage(res.error);
            setMessageColor('red');
          }
          else 
          {
            setMessageColor('green');
            setMessage('New Account Created. Verification Email Sent!');
            setTimeout(
              function(){
                      history.push('/');
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


  // validates email; only checks syntax
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
    <div id="registerDiv">
        <Grid container spacing={0} direction="column" alignItems="center" justify="center">
          <h4 id="inner-title">PLEASE REGISTER</h4><br />
          <TextField margin="dense" variant="outlined" type="text" id="registerFirstName" label="First Name" inputRef={registerFirstName}  /><br />
          <TextField margin="dense" variant="outlined"  type="text" id="registerLastName" label="Last Name" inputRef={registerLastName}  /><br />
          <TextField margin="dense" variant="outlined" required type="text" id="registerEmail" label="Email" onChange={(e)=> validateEmail(e)} inputRef={registerEmail} />
          <span id="registerEmailResult" style={{color:emailErrorColor}}>{emailError}</span><br />
          <TextField InputProps={{endAdornment:<Button endIcon={visibility} onClick={()=>{changeVisibility()}}/>}} margin="dense" variant="outlined" required type={type} id="registerPassword" label="Password" inputRef={registerPassword} /><br />
          <TextField InputProps={{endAdornment:<Button endIcon={visibility} onClick={()=>{changeVisibility()}}/>}} margin="dense" variant="outlined" required type={type} id="registerConfirmPassword" label="Confirm Password" onChange={(e)=> checkValidation(e)} />
          <span id="registerPasswordResult" style={{color:passwordErrorColor}}>{passwordError}</span><br />
          <Button disabled={(checkEmailError || checkPasswordError) ? true : false} style={{marginBottom: "2em"}} variant="contained" size="large" color="primary" type="submit" id="registerButton" className="buttons" value = "Complete Registration" onClick={doRegister}>Complete Registration</Button>
          <Button style={{marginBottom: "2em"}} variant="contained" size="large" color="secondary" type="submit" id="loginButton" className="buttons" value="Login" onClick={()=>{history.push('/')}}>Back to Login</Button><br />
          <span id="registrationResult" style={{color:messageColor}}>{<h1>{message}</h1>}</span>
          <br />
        </Grid>
    </div>
  );
};

export default Register;
