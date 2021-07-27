import React, { useEffect, useState, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import CreateRoomForm from "./CreateRoomForm";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import RoomForm from "./RoomForm";
import SearchRooms from "./SearchRooms";
import { UserContext } from "../UserContext";
import { ApiContext } from "../ApiContext";
import roomService from "../helpers/roomService";

function Museum() {
  const { user } = useContext(UserContext);
  const { userID } = useParams();

  // Initial States
  const [museumUser, setMuseumUser] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  // GETS INITIAL DATA
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const id = !userID ? user.id : userID;

        const res = await roomService.getAll(id);
        const currUser = await roomService.getUser(id);

        if (res.error || currUser.error) {
          if(currUser.error === "JSON Webtoken NULL"){
            return <Redirect to="/"/>
          }
          setIsLoading(false);
          setError(true);
          setMessage(res.error);
          return;
        }

        setRooms(res);
        setMuseumUser(currUser);
        setIsLoading(false);
      } catch (exception) {
        setIsLoading(false);
        setError(true);
        setMessage(exception.message);
        console.log(exception);
      }
    })();
  }, [userID, user]);

  const doCreate = async (room) => {
    try {
      const res = await roomService.create(room);

      if (res.error) {
        setIsLoading(false);
        setError(true);
        setMessage(res.error);
        return res;
      }
      setIsLoading(false);
      const newRooms = [...rooms, res];
      setRooms(newRooms);
    } catch (exception) {
      setIsLoading(false);
      setError(true);
      setMessage(exception.message);
      console.log(exception);
    }
  };

  const doSearch = async (search) => {
    try {
      const res = await roomService.search(search, user.id);

      if (res.error) {
        setIsLoading(false);
        setError(true);
        setMessage(res.error);
        return res;
      }
      setIsLoading(false);
      setRooms(res);
    } catch (exception) {
      setIsLoading(false);
      setError(true);
      setMessage(exception.message);
      console.log(exception);
    }
  };

  const doDelete = async (roomID) => {
    try {
      const res = await roomService.deleteRoom(roomID);

      if (res.error) {
        setIsLoading(false);
        setError(true);
        setMessage(res.error);
        return res;
      }
      setIsLoading(false);
      setTimeout(function () {
        setRooms(rooms.filter((room) => room.id !== roomID));
        return res;
      }, 1000);

      return true;
    } catch (exception) {
      setIsLoading(false);
      setError(true);
      setMessage(exception.message);
      console.log(exception);
    }
  };

  const doUpdate = async (roomID, newRoom) => {
    try {
      const res = await roomService.update(roomID, newRoom);

      if (res.error) {
        setIsLoading(false);
        setError(true);
        setMessage(res.error);
        return res;
      }
      setIsLoading(false);
      setTimeout(function () {
        setRooms(
          rooms.map((room) => {
            if (roomID === room.id) {
              return { ...room, ...newRoom };
            }

            return room;
          })
        );
      }, 500);
    } catch (exception) {
      setIsLoading(false);
      setError(true);
      setMessage(exception.message);
      console.log(exception);
    }
  };

  if (isLoading) {
    return <h4>Loading Webpage</h4>;
  } else if (error) {
    return <h1>{message}</h1>;
  } else {
    return (
      <div>
        <ApiContext.Provider value={{ doUpdate, doDelete, doSearch, doCreate }}>
          <Grid container spacing={3}>
            {/* Set up in to rows of length 12 */}
            <Grid item xs={12} md={12} lg={12} />

            {/* Begin Row (This row is split into 2+5+5=12)*/}
            <Grid item xs={4} sm={2} md={2} lg={2} />
            <Grid item xs={7} sm={5} md={5} lg={5}>
              <SearchRooms />
            </Grid>

            <Grid item xs={12} sm={12} md={5} lg={5}>
              <Button color="secondary">Rooms</Button>
            </Grid>
            {/* End Row */}

            {/* single row of nothing. Im using this to space things out */}
            <Grid item xs={12} md={12} lg={12} />

            {/* Begin Row  DISPLAYS ROOMS*/}
            <Grid item xs={1} md={1} lg={1} />
            <Grid item xs={10} sm={9} md={5} lg={4}>
              <span id="displayRoom">
                <h1>{museumUser.firstName}'s Rooms</h1>
              </span>
              <RoomForm rooms={rooms} />
            </Grid>
            <Grid item xs={2} sm={3} md={1} lg={2} />

            <Grid item xs={10} sm={9} md={4} lg={5}>
              <CreateRoomForm />
            </Grid>
            {/* End Row */}

            <Grid item xs={12} md={12} lg={12} />
          </Grid>
        </ApiContext.Provider>
      </div>
    );
  }
}

export default Museum;
