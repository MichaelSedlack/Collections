import React, { useEffect, useState, useContext} from 'react';
import axios from 'axios';
import CollectionForm from './CollectionForm.js';
import {ApiContext} from './ApiContext';
import { UserContext, RoomContext } from './UserContext';
// import {deleteCollection} from './helpers/api';

function DisplayCollections(){
    var bp = require('./Path.js');

    const { user } = useContext(UserContext);
    const { room } = useContext(RoomContext);

    // Initial States
    const [message,setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        (async() => {
            var id = {id:room.id};
            var config = 
            {
                method: 'get',
                url: bp.buildPath('rooms/single'),
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
                    setData(res.collections)
                    console.log('Response from API Collections:',res.collections)
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

    // const doDelete = (CollectionID) => {
    //   const res = deleteCollection(CollectionID, user.accessToken);
      
    //   if(res.error){
    //     return res;
    //   }

    //   setTimeout(function(){
    //       setData(data.filter(Collection => Collection.id !== CollectionID));
    //       return res;
    //   },1000)

    //   return true;
    // }
    
    if(isLoading){
        return(<div><h4>Loading Collections!</h4></div>);
    }
    else if(error){
        return(<h4>{message}</h4>);
    }
    else{
        return(
            <div>
              {/* <ApiContext.Provider value={{doDelete}}> */}
                <CollectionForm data={data}/>
              {/* </ApiContext.Provider> */}
            </div>
        );
    }
}

export default DisplayCollections;