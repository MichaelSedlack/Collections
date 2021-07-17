import React, { useEffect, useState, useContext} from 'react';
import axios from 'axios';
import RoomForm from './RoomForm.js';
import {ApiContext} from './ApiContext';
import { UserContext } from './UserContext';
import { deleteRoom, updateRoom } from './helpers/api';

function DisplayRooms(){
    var bp = require('./Path.js');

    const { user } = useContext(UserContext);

    // Initial States
    const [message,setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        (async() => {
            var id = {id:user.id};
            var config = 
            {
                method: 'get',
                url: bp.buildPath('users/rooms'),
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${user.accessToken}`
                },
                params: id
            };
            axios(config)
                .then(function(response)
            {
                var res = response.data;
                if(res.error)
                {
                    setError(true);
                    setMessage("There was an error");
                    setIsLoading(false);
                }
                else{
                    setError(false);
                    setIsLoading(false);
                    setData(res)
                    console.log('Response from API:',res)
                    console.log('data:',res.data)
                }
            })
            .catch(function(err)
            {
                setError(true);
                setIsLoading(false);
                console.log(err.message);
            });

        })()
    },[bp, user])

    const doDelete = (roomID) => {
      const res = deleteRoom(roomID, user.accessToken);
      
      console.log(res);
      
      if(res.error){
        return res;
      }

      setTimeout(function(){
          setData(data.filter(room => room.id !== roomID));
          return res;
      },1000)

      return true;
    }

    const doUpdate = ( roomID, newRoom ) => {
      const res = updateRoom(roomID, newRoom, user.accessToken);

      console.log("API RESPONSE TO UPDATE: " + res);
      if(res.error){
        return res.data;
      }

      setTimeout(function(){
        setData(data.map(room => {
          if(roomID === room.id){
            return {...room, ...newRoom}
          }

          return room;
        }))
      }, 500);
    }
    
    if(isLoading){
        return(<div><h4>Loading Rooms!</h4></div>);
    }
    else if(error){
        return(<h4>{message}</h4>);
    }
    else{
        return(
            <div>
              <ApiContext.Provider value={{doDelete, doUpdate}}>
                <RoomForm data={data}/>
              </ApiContext.Provider>
            </div>
        );
    }
}

export default DisplayRooms;