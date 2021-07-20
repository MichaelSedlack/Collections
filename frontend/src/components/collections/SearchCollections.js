import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { ApiContext } from '../ApiContext';

function SearchCollections(){
  const { doSearch } = useContext(ApiContext);
  const [search, setSearch] = useState('');
    
  const searchCollection = async e => {
    setSearch(e.target.value);
    doSearch(e.target.value);
  }

  return(
      <div>
          <TextField id="outlined-basic" label="Search Collections" variant="outlined" value={search} onChange={(e) => searchCollection(e)} />
      </div>
  );
}

export default SearchCollections;