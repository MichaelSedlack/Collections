import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import { ApiContext } from '../ApiContext';

function SearchRooms(){
  const { doSearch } = useContext(ApiContext);
  const [search, setSearch] = useState('');
    
  const searchRoom = async e => {
    setSearch(e.target.value);
    doSearch(e.target.value);
  }

  return(
      <div>
          <TextField id="outlined-basic" label="Search Rooms" variant="outlined" value={search} onChange={(e) => searchRoom(e)} />
          {/*Button variant="contained" size="large" color="primary" type="submit" id="searchButton" className="buttons" value="Search" onClick={searchRoom}>Search Rooms</Button>*/}
      </div>
  );
}

export default SearchRooms;