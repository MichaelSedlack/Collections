import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

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
    // var roomName = ud.roomName;
    // var priv = ud.priv;
    // var collections = ud.collections;

    const [show,setShow] = useState();

    useEffect(() => {
        (async () => {
            var roomID = {roomID:roomId};
            var config = 
            {
                method: 'get',
                url: bp.buildPath(`rooms/${roomId}`),	
                headers: 
                {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${token}`
                },
                params: roomID
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
                    var roomIdx = res.id;
                    var priv = res.private;
                    var userId = res.uid;
                    var roomName = res.roomName;
                    var collections = res.collections;

                    var room = {roomName:roomName,roomId:roomIdx,id:userId,collections:collections,priv:priv}
                    localStorage.setItem('room_data', JSON.stringify(room));

                }
            })
            .catch(function(error)
            {
                console.log(error.message);
            });
        })()
    },[])


    const display = () =>{
        var _ud = localStorage.getItem('room_data');
        var ud = JSON.parse(_ud);
        var roomIdx = ud.roomId;
        var roomName = ud.roomName;
        var priv = ud.priv;
        var collections = ud.collections;
        setShow(
            <div>
                <Card>
                    <CardContent>
                        {roomName}<br />
                        {roomIdx}<br />
                        {priv.toString()}<br />
                    </CardContent>
                </Card>
            </div>
        )
 
    };


    return(
        <div>
            <Button variant="contained" size="large" color="primary" type="submit" id="createRoomButton" className="buttons" value = "Display Room" onClick={()=>{display()}}>Show Room</Button><br />
            <span>{show}</span>
        </div>
        
        
    );
};

export default DisplayRoom;