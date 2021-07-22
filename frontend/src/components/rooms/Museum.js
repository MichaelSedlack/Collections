import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import CreateRoomForm from './CreateRoomForm';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import RoomForm from './RoomForm';
import SearchRooms from './SearchRooms';
import { UserContext } from '../UserContext';
import { ApiContext } from '../ApiContext';
import roomService from '../helpers/roomService';


function Museum() {

  const {user, setUser} = useContext(UserContext)
  const history = useHistory();
  const { userID } = useParams();

  // Initial States
  const [museumUser, setMuseumUser] = useState(null);
  const [message,setMessage] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  // GETS INITIAL DATA
  useEffect(() => {
    (async () => {
      try{
        setIsLoading(true);

        const id = (!userID) ? user.id : userID;

        const res = await roomService.getAll(id);
        const currUser = await roomService.getUser(id);

        if(res.error){
          setError(true);
          setMessage(res.error);
          return;
        }

        setRooms(res);
        setMuseumUser(currUser);
        setIsLoading(false);
      }catch(exception){
        setError(true);
        console.log(exception);
      }
    })()
  },[userID, user])

  const doCreate = async (room) => {
    try{
      const res = await roomService.create(room);

      if(res.error){
        return res;
      }

      const newRooms = [...rooms, res];
      setRooms(newRooms);
    }catch(exception){
      console.log(exception);
    }
  }

  const doSearch = async (search) => {
    try{
      const res = await roomService.search(search, user.id);

      if(res.error){
        setError(true);
        setMessage(res.error);
        return res;
      }

      setRooms(res);
    }catch(exception){
      console.log(exception);
    }
  }

  const doDelete = async (roomID) => {
    try{
      const res = await roomService.deleteRoom(roomID);

      if(res.error){
        return res;
      }

      setTimeout(function(){
        setRooms(rooms.filter(room => room.id !== roomID));
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

      if(res.error){
        return res;
      }

      setTimeout(function(){
        setRooms(rooms.map(room => {
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

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
    history.push('/');
  }

  if(isLoading){
    return(
        <h4>Loading Webpage</h4>
    );
  }
  else{
    return(
      <div>
        <ApiContext.Provider value={{doUpdate, doDelete, doSearch, doCreate}}>
          <Grid container spacing={3}>
            {/* Set up in to rows of length 12 */}
            <Grid item xs={12}/>

            {/* Begin Row (This row is split into 2+5+5=12)*/}
            <Grid item xs={2}/>
            <Grid item xs={5}>    
                <SearchRooms/>                    
            </Grid>
            <Grid item xs={5}/>
            {/* End Row */}

            {/* single row of nothing. Im using this to space things out */}
            <Grid item xs={12}/>

            {/* Begin Row  DISPLAYS ROOMS*/}
            <Grid item xs={1}/>
            <Grid item xs={4}>
                <span id="displayRoom"><h1>{museumUser.firstName}'s Rooms</h1></span>
                {error && <div>{message}</div>}
                <RoomForm rooms={rooms}/>
            </Grid>
            <Grid item xs={2}/>
            <Grid item xs={5}>
                <CreateRoomForm/>
            </Grid>
            {/* End Row */}

            <Grid item xs={12}/>
          </Grid>
        </ApiContext.Provider>
      </div>
    )
  }
}

export default Museum;