import axios from 'axios';
const bp = require('../Path');

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const formatConfig = (id) => {
  return {
    headers: { Authorization: token },
    params: {id: id}
  }
}

const deleteCollection = async (collectionID) => {
  const config = formatConfig(collectionID);

  const response = await axios.delete(bp.buildPath('collections/single'), config);

  return response.data;
}

const create = async (collection) => {
  const config = {
    headers: {
      Authorization: token
    }
    
  }

  const response = await axios.post(bp.buildPath('collections/create'), collection, config);

  return response.data
}

const update = async (collectionID, collection) => {
  const config = formatConfig(collectionID);

  const response = await axios.put(bp.buildPath('collections/single'), collection, config);

  console.log(response);
  return response.data;
}

const search = async (string, roomID) => {
  const config = {
    headers: { Authorization: token },
    params: {
      roomID: roomID,
      search: string
    }
  }

  const response = await axios.get(bp.buildPath('collections/search'), config);

  return response.data;
}

const getAll = async (id) => {
  const config = formatConfig(id);

  const response = await axios.get(bp.buildPath('rooms/single'), config);

  return response.data;
}

export default { getAll, create, search, update, deleteCollection, setToken };