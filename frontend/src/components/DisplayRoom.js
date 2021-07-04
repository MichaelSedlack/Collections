import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function DisplayRoom()
{
    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var token = ud.accessToken;

    var _ud = localStorage.getItem('room_data');
    var ud = JSON.parse(_ud);
    var roomId = ud.roomId;
  

    const displayRoom = async event =>
    {
        event.preventDefault();

        var id = {roomID:roomId};
            var config = 
            {
                method: 'get',
                url: bp.buildPath(`rooms/${roomId}`),	
                headers: 
                {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                },
                params: id
            };

            axios(config)
                .then(function(response)
            {
                var res = response.data;
                if(res.error)
                {
                    <h1>There was an error</h1>
      
                }
                else
                {
                    storage.storeToken(res);
                    var roomId = res.uid;
                    alert(roomId);

  
                }
            })
            .catch(function(error)
            {
                console.log(error.message);
            });
    }


            
        


    
    return(
        <div>
            <Button variant="contained" size="large" color="primary" type="submit" id="createRoomButton" className="buttons" value = "Set Up New Room" onClick={displayRoom}>Show Room</Button><br />

        </div>
        
        
    );
};

export default DisplayRoom;