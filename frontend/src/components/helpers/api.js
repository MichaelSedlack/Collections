import axios from 'axios';
const bp = require('../Path');

export const deleteRoom = async (roomID, token) => {
  var id = { id: roomID };
  var config = 
  {
      method: 'delete',
      url: bp.buildPath('rooms/single'),
      headers:
      {
          'Content-Type':'application/json',
          'Authorization': `bearer ${token}`
      },
      params: id
  };
  axios(config)
      .then(function(response)
  {
      var res = response.data;
      if(res.error)
      {
          console.log(res.error);
      }
  })
  .catch(function(error)
  {
    console.log(error.message);
    return false;
  })

  return true;
}
