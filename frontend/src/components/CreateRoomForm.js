import React, { useState } from 'react';
import axios from 'axios';

function CreateRoomForm()
{
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');
    var jwt = require('jsonwebtoken');
    

    var newRoomName;
    var choice;

    const [message,setMessage] = useState('');
    const [option,setOption] = useState('Private');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.userId;
    
    const createRoom = async event =>
    {
        event.preventDefault();
        var tok = storage.retrieveToken();
        var obj = {name:newRoomName.value,private:choice.value,token:tok};
        var js = JSON.stringify(obj);

        var config = 
      {
          method: 'post',
          url: bp.buildPath('rooms/create'),	
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
              setMessage('There was an error');
            }
            else 
            {
                
                setMessage('New Room Created');
                setTimeout(
                function(){
                        window.location.href = '/museum';
                },2000)
            }
        })
        .catch(function (error) 
        {
            console.log(error);
        });
    };

    const displayChoice = (e) => {
        var choice = e.target.value;

        if(choice === "Private"){
            setOption("Private");
        }
        else{
            setOption("Public")
        }
    }

    return(
        <div>
            <span id="inner-title">Create New Room</span><br />
            <input type="text" id="roomName" placeholder="Enter Room Name" ref={(c) => newRoomName = c}/><br />
            <select className="privateable" onChange={(e)=>displayChoice(e)}>
                <option value="Private"  ref={(c) => choice = c}>Private</option>
                <option value="Public" ref={(c) => choice = c}>Public</option>
            </select> 
            <span id="result">{option}</span>
            <br /><br />
            <input type="submit" id="createRoomButton" className="buttons" value = "Set Up New Room" onClick={createRoom} /><br />
            <span id="createRoomResult">{message}</span>
        </div>
    );


};

export default CreateRoomForm;