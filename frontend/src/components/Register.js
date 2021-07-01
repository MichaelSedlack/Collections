import React, { useRef, useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
var bcrypt = require('bcryptjs');


function Register()
{
    var bp = require('./Path.js');


    const registerFirstName = useRef(null);
    const registerLastName = useRef(null);
    const registerEmail = useRef(null);
    const registerPassword = useRef(null);


    const [message,setMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailErrorColor, setEmailErrorColor] = useState('');
    const [passwordErrorColor, setPasswordErrorColor] = useState('');

    var hash;

    const doRegister = async event => 
    {
      event.preventDefault();

      // bcrypt.hash(registerPassword.value, 10, (err, hash) => {
      //   if(err){
      //     console.error("error");
      //   }
      //   alert(hash);
      //   console.log(hash);
      // })

      var obj = {firstname:registerFirstName.current.value,lastname:registerLastName.current.value,email:registerEmail.current.value,password:registerPassword.current.value};
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
              setMessage('User/Password combination incorrect');
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
            console.log(error);
        });
    };

    // checks for matching passwords
    const checkValidation = (e) => {
      
      if(registerPassword.current.value !== e.target.value){
        setPasswordError("Passwords need to match");
        setPasswordErrorColor('red');
      }
      else{
          setPasswordError("The passwords match!");
          setPasswordErrorColor('green');
      }
    }


    // validates email
    const validateEmail = (e) => {
      var email = e.target.value
    
      if (validator.isEmail(email)) {
        setEmailError('Valid Email!')
        setEmailErrorColor('green');
      } else {
        setEmailError('Enter valid Email!')
        setEmailErrorColor('red');
      }
    } 


    return(
      <div id="registerDiv">
        <span id="inner-title">PLEASE REGISTER</span><br />
        <TextField margin="dense" variant="outlined" type="text" id="registerFirstName" label="First Name" inputRef={registerFirstName}  /><br />
        <TextField margin="dense" variant="outlined"  type="text" id="registerLastName" label="Last Name" inputRef={registerLastName}  /><br />
        <TextField margin="dense" variant="outlined" required type="text" id="registerEmail" label="Email" onChange={(e)=> validateEmail(e)} inputRef={registerEmail} />
        <span id="registerEmailResult" style={{color:emailErrorColor}}>{emailError}</span><br />
        <TextField margin="dense" variant="outlined" required type="password" id="registerPassword" label="Password" inputRef={registerPassword} /><br />
        <TextField margin="dense" variant="outlined" required type="password" id="registerConfirmPassword" label="Confirm Password" onChange={(e)=> checkValidation(e)} />
        <span id="registerPasswordResult" style={{color:passwordErrorColor}}>{passwordError}</span><br />
        <Button variant="contained" size="large" color="primary" type="submit" id="registerButton" className="buttons" value = "Complete Registration" onClick={doRegister}>Complete Registration</Button>
        <Button variant="contained" size="large" color="secondary" type="submit" id="loginButton" className="buttons" value="Login" onClick={()=>{window.location.href = '/'}}>Back to Login</Button><br />
        <span id="registrationResult" style={{color:'green'}}>{message}</span>
        <br />
        
     </div>
    );
};

export default Register;
