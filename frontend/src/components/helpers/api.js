import axios from 'axios';
const bp = require('../Path');

const formatQuery = (type, route, token, query) => {
  const id = {id: query};

  return {
    method: type,
      url: bp.buildPath(route),
      headers:
      {
          'Content-Type':'application/json',
          'Authorization': `bearer ${token}`
      },
      params: id
  }

}

export const deleteRoom = async (roomID, token) => {
  const config = formatQuery('delete', 'rooms/single', token, roomID)
  return axios(config)
      .then(function(response)
  {
      var res = response.data;
      if(res.error)
      {
          console.log(res.error);
      }

      return res;
  })
  .catch(function(error)
  {
    console.log(error.message);
    return false;
  })
}

export const getUserRooms = async (id, token) => {
  return axios(formatQuery('get', 'users/rooms', token, id))
    .then(function(response){

      var res = response.data;
      if(res.error)
      {
          return res
      }else{
          console.log('Response from API:',res)
          console.log('data:',res.data)
          return res
      }
    })
    .catch(function(err){
        console.log(err.message);
    });
}