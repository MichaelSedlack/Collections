import React, { useState } from 'react';

function Register()
{

    //var bp = require('./Path.js');
    
    var registerFirstName;
    var registerLastName;
    var registerEmail;
    var registerPassword;

    const [message,setMessage] = useState('');

    const doRegister = async event => 
    {
        // event.preventDefault();

        // var obj = {firstname:registerFirstName.value,lastname:registerLastName.value,email:registerEmail,password:registerPassword};
        // var js = JSON.stringify(obj);

        setTimeout(
            function(){
                    alert("Navigating back to log in");
                    window.location.href = 'http://localhost:3000';
            },500)
        // try
        // {    
        //     const response = await fetch(bp.buildPath('api/register'),
        //         {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

        //     var res = JSON.parse(await response.text());

        //     if( res.id <= 0 )
        //     {
        //         setMessage('User already exists');
        //     }
        //     else
        //     {
        //         var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
        //         localStorage.setItem('user_data', JSON.stringify(user));

        //         setTimeout(
        //             function(){
        //                 setMessage('Navigating back to Log in');

        //                 window.location.href = '/3001';
        //             },3000)
        //     }
        // }
        // catch(e)
        // {
        //     setMessage(e.toString());
        //     return;
        // }    
    };

    return(
      <div id="registerDiv">
        <span id="inner-title">PLEASE REGISTER</span><br />
        <input type="text" id="registerFirstName" placeholder="First Name" ref={(c) => registerFirstName = c}  /><br />
        <input type="text" id="registerLastName" placeholder="Last Name" ref={(c) => registerLastName = c}  /><br />
        <input type="text" id="registerEmail" placeholder="Email" ref={(c) => registerEmail = c}  /><br />
        <input type="password" id="registerPassword" placeholder="Password" ref={(c) => registerPassword = c} /><br />
        <input type="submit" id="registerButton" class="buttons" value = "Complete Registration"
          onClick={doRegister} />
        <span id="registerResult">{message}</span>
        <input type="submit" id="loginButton" class="buttons" value="Login" onClick={()=>{window.location.href = '/'}}/>
     </div>
    );
};

export default Register;
