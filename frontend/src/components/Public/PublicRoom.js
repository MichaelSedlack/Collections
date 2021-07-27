import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import RoomForm from "../rooms/RoomForm";
import SearchRooms from "../rooms/SearchRooms";
import { ApiContext } from "../ApiContext";
import roomService from "../helpers/roomService";

function PublicRoom() {
  // Initial States
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  const doSearch = async (search) => {
    try {
      setIsLoading(true);
      const res = await roomService.searchPublic(search);

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

  return (
    <div>
      <ApiContext.Provider value={{ doSearch }}>
        <Grid container spacing={3}>
          {/* Set up in to rows of length 12 */}
          <Grid item xs={12} md={12} lg={12} />

          {/* Begin Row (This row is split into 2+5+5=12)*/}
          <Grid item xs={4} sm={2} md={2} lg={2} />
          <Grid item xs={7} sm={5} md={5} lg={5}>
            <SearchRooms />
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <Button color="secondary">Public Rooms</Button>
          </Grid>
          {/* End Row */}

          {/* single row of nothing. Im using this to space things out */}
          <Grid item xs={12} md={12} lg={12} />

          {/* Begin Row  DISPLAYS ROOMS*/}
          <Grid item xs={1} md={1} lg={1} />
          <Grid item xs={10} sm={9} md={5} lg={4}>
            <span id="displayRoom">
              <h1>Public Rooms</h1>
            </span>
            {error && <div>{message}</div>}
            {isLoading ? <span>Searching...</span> : <RoomForm rooms={rooms} />}
          </Grid>
          <Grid item xs={2} sm={3} md={1} lg={2} />

          <Grid item xs={10} sm={9} md={4} lg={5} />
          {/* End Row */}

          <Grid item xs={12} md={12} lg={12} />
        </Grid>
      </ApiContext.Provider>
    </div>
  );
}

export default PublicRoom;
