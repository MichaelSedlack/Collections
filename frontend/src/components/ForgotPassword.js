import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';

function ForgotPassword()
{

    var bp = require('./Path.js');
    var newEmail;

    const [message,setMessage] = useState('');
    const [emailErrorColor, setEmailErrorColor] = useState('');
    const [emailError, setEmailError] = useState('');


    const sendEmail = async event =>
    {
        event.preventDefault();

        var obj = {email:newEmail.value};
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
            console.log(error);
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
          <input type="text" id="email" placeholder="Enter Email" onChange={(e)=> validateEmail(e)} ref={(c) => newEmail = c} />
          <span id="emailResult" style={{color:emailErrorColor}}>{emailError}</span><br />
          <input type="submit" id="sendEmailButton" className="buttons" value = "Send Email" onClick={sendEmail} />
          <span id="emailResult" style={{color:'green'}}>{message}</span>
        </div>
    );
};


export default ForgotPassword;