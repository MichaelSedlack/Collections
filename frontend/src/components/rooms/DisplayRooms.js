import React, { useEffect, useState, useContext} from 'react';
import RoomForm from './RoomForm.js';
import { ApiContext } from '../ApiContext';
import { UserContext } from '../UserContext';
import roomService from '../helpers/roomService';

function DisplayRooms(){
    const { user } = useContext(UserContext);

    // Initial States
    const [message,setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    
    useEffect(() => {
      (async () => {
        try{
          setIsLoading(true);
  
          const res = await roomService.getAll(user.id);
  
          if(res.error){
            setError(true);
            setMessage(res.error);
            return;
          }
  
          setData(res);
          setIsLoading(false);
        }catch(exception){
          setError(true);
          console.log(exception);
        }
      })()
    },[user])

    const doDelete = async (roomID) => {
      try{
        const res = await roomService.deleteRoom(roomID);

        if(res.error){
          return res;
        }

        setTimeout(function(){
          setData(data.filter(room => room.id !== roomID));
          return res;
        },1000)

        return true;
      }catch(exception){
        console.log(exception);
      }
    }

    const doUpdate = async ( roomID, newRoom ) => {
      try{
        const res = await roomService.update(roomID, newRoom);

        console.log("API RESPONSE TO UPDATE: " + res);
        if(res.error){
          return res;
        }

        setTimeout(function(){
          setData(data.map(room => {
            if(roomID === room.id){
              return {...room, ...newRoom}
            }

            return room;
          }))
        }, 500);
      }catch(exception){
        console.log(exception);
      }
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