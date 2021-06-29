import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
var bcrypt = require('bcryptjs');


function Register()
{
    var bp = require('./Path.js');

    var registerFirstName;
    var registerLastName;
    var registerEmail;
    var registerPassword; // hash password????


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

      var obj = {firstname:registerFirstName.value,lastname:registerLastName.value,email:registerEmail.value,passwordHash:registerEmail.value};
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

    // checks for matching passwords: remember to hash
    const checkValidation = (e) => {
      
      if(registerPassword.value !== e.target.value){
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
        <input type="text" id="registerFirstName" placeholder="First Name" ref={(c) => registerFirstName = c}  /><br />
        <input type="text" id="registerLastName" placeholder="Last Name" ref={(c) => registerLastName = c}  /><br />
        <input type="text" id="registerEmail" placeholder="Email" onChange={(e)=> validateEmail(e)} ref={(c) => registerEmail = c} />
        <span id="registerEmailResult" style={{color:emailErrorColor}}>{emailError}</span><br />
        <input type="password" id="registerPassword" placeholder="Password" ref={(c) => registerPassword = c} /><br />
        <input type="password" id="registerConfirmPassword" placeholder="Confirm Password" onChange={(e)=> checkValidation(e)} />
        <span id="registerPasswordResult" style={{color:passwordErrorColor}}>{passwordError}</span><br />
        <input type="submit" id="registerButton" className="buttons" value = "Complete Registration" onClick={doRegister} />
        <input type="submit" id="loginButton" className="buttons" value="Login" onClick={()=>{window.location.href = '/'}}/><br />
        <span id="registrationResult" style={{color:'green'}}>{message}</span>
        <br />
        
     </div>
    );
};

export default Register;
