import React, { useRef, useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function ForgotPassword()
{

    var bp = require('./Path.js');

    const newEmail = useRef(null);


    const [message,setMessage] = useState('');
    const [emailErrorColor, setEmailErrorColor] = useState('');
    const [emailError, setEmailError] = useState('');


    const sendEmail = async event =>
    {
        event.preventDefault();

        var obj = {email:newEmail.current.value};
        var js = JSON.stringify(obj);

        var config = 
      {
          method: 'post',
          url: bp.buildPath('users/forgotPassword'),	
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
              setMessage('Not valid email');
            }
            else 
            {
              setMessage('Email Sent');
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
    };


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
      };
      



    return (
        <div id="forgotPasswordDiv">
          <h3>Enter Your Email to Reset Your Password</h3>
          <TextField type="text" variant="outlined" id="email" label="Enter Email" onChange={(e)=> validateEmail(e)} inputRef={newEmail} />
          <span id="emailResult" style={{color:emailErrorColor}}>{emailError}</span><br />
          <Button variant="contained" size="small" color="primary" type="submit" id="sendEmailButton" className="buttons" value="Send Email" onClick={sendEmail}>Send Email</Button>
          <Button variant="contained" size="small" color="secondary" type="submit" id="loginButton" className="buttons" value="Return to Login" onClick={()=>{window.location.href = '/'}}>Return to Login</Button><br />
          <span id="emailResult" style={{color:'green'}}>{message}</span>
        </div>
    );
};


export default ForgotPassword;