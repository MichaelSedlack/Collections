import React, { useState, useContext } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { UserContext} from './../UserContext';
import { useHistory } from 'react-router-dom';


function SearchCollections()
{
    const history = useHistory();
    const { user } = useContext(UserContext);


    var bp = require('./../Path.js');

    
    // Initial states
    const [message,setMessage] = useState('');


    // PLACEHOLDER NEEDS TO BE CHANGED
    
    // const searchCollections = async event =>
    // {
    //     event.preventDefault();
    //     var obj = {
    //       name: name,
    //       private:checkOption,
    //       id:collectionId
          
    //     };
    //     var js = JSON.stringify(obj);

    //     var config = 
    //   {
    //       method: 'put',
    //       url: bp.buildPath('collections/single'),	
    //       headers: 
    //       {
    //           'Content-Type': 'application/json',
    //           'Authorization': `bearer ${user.accessToken}`
    //       },
    //       params: {id: collectionId},
    //       data: js
    //   };
      
    //     axios(config)
    //         .then(function (response) 
    //     {
    //         var res = response.data;
    //         if (res.error) 
    //         {
    //             console.log(res.message);
    //             setMessage('There was an error');
    //         }
    //         else 
    //         {
    //             setMessage('Collection Updated');
    //             setTimeout(
    //                 function(){
    //                     history.push('/museum');
    //                     setMessage('');
    //                 },1000)
                
    //         }
    //     })
    //     .catch(function (error) 
    //     {
    //         setMessage(error.message);
    //         console.log(error.message);
    //     });
    //};

    return(
        <div>
            <TextField id="outlined-basic" label="Search Collections" variant="outlined" />
            <Button variant="contained" size="large" color="primary" type="submit" id="searchButton" className="buttons" value="Search" onClick={()=>{alert("button clicked")}}>Search Collections</Button>

        </div>
    );
}

export default SearchCollections;