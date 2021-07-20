import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import { ApiContext } from '../ApiContext';

function SearchItems(){
  const { doSearch } = useContext(ApiContext);
  const [search, setSearch] = useState('');
    
  const searchItem = async e => {
    setSearch(e.target.value);
    doSearch(e.target.value);
  }

  return(
      <div>
          <TextField id="outlined-basic" label="Search Collections" variant="outlined" value={search} onChange={(e) => searchItem(e)} />
      </div>
  );
}

export default SearchItems;