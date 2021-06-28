import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
//import bcrypt from 'bcrypt';

function Register()
{
    var bp = require('./Path.js');

    var registerFirstName;
    var registerLastName;
    var registerEmail;
    var registerPassword; // hash password????

    const [message,setMessage] = useState('');
    const [emailError, setEmailError] = useState('');

    // bcrypt.hash(registerPassword, 10, (err, hash) => {
    //   if(err){
    //     console.error(err);
    //     return;
    //   }
    //   console.log(hash);
    // })

    const doRegister = async event => 
    {
      event.preventDefault();

      var obj = {firstname:registerFirstName.value,lastname:registerLastName.value,email:registerEmail.value,passwordHash:registerPassword.value};
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
        setMessage("Passwords need to match");
      }
      else{
          setMessage("The passwords match!");
      }
    }

    // validates email
    const validateEmail = (e) => {
      var email = e.target.value
    
      if (validator.isEmail(email)) {
        setEmailError('Valid Email!')
      } else {
        setEmailError('Enter valid Email!')
      }
    } 


    return(
      <div id="registerDiv">
        <span id="inner-title">PLEASE REGISTER</span><br />
        <input type="text" id="registerFirstName" placeholder="First Name" ref={(c) => registerFirstName = c}  /><br />
        <input type="text" id="registerLastName" placeholder="Last Name" ref={(c) => registerLastName = c}  /><br />
        <input type="text" id="registerEmail" placeholder="Email" onChange={(e)=> validateEmail(e)}  /><span id="registerEmailResult">{emailError}</span><br />
        <input type="password" id="registerPassword" placeholder="Password" ref={(c) => registerPassword = c} /><br />
        <input type="password" id="registerConfirmPassword" placeholder="Confirm Password" onChange={(e)=> checkValidation(e)} /><span id="registerPasswordResult">{message}</span><br />
        <input type="submit" id="registerButton" className="buttons" value = "Complete Registration" onClick={doRegister} />
        <input type="submit" id="loginButton" className="buttons" value="Login" onClick={()=>{window.location.href = '/'}}/><br />
        <br />
        
     </div>
    );
};

export default Register;
