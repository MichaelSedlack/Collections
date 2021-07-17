import axios from 'axios';
const bp = require('../Path');

// Used for any requests that contain a parameter only
const formatParams = (type, route, token, id) => {
  const parameters = {id: id};
  return {
    method: type,
      url: bp.buildPath(route),
      headers:
      {
          'Content-Type':'application/json',
          'Authorization': `bearer ${token}`
      },
      params: parameters
  }
}

// Used for any requests that contain a parameter and body
const formatBody = (type, route, token, id, body) => {
  const parameters = {id: id};
  return {
    method: type,
    url: bp.buildPath(route),
    headers:
      {
          'Content-Type':'application/json',
          'Authorization': `bearer ${token}`
      },
      params: parameters,
      data: body
  }
}

export const deleteRoom = async (roomID, token) => {
  const config = formatParams('delete', 'rooms/single', token, roomID)
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

// TODO ->>>>>>>>>> FIX ME BIG TIMEEEEE ALL ITS RETURNING IS A PROMISE
export const updateRoom = async (roomID, room, token) => {
  const config = formatBody('put', 'rooms/single', token, roomID, room);
  return await axios(config)
    .then((response) => {

      var res = response.data;
      if(res.error){
          console.log(res.error);
      }

      return res;
    })
    .catch(function(error){
      console.log(error.message);
      return false;
    })
}

export const getUserRooms = async (id, token) => {
  return axios(formatParams('get', 'users/rooms', token, id))
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