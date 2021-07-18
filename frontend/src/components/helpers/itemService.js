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

const deleteItem = async (itemID) => {
  const config = formatConfig(itemID);

  const response = await axios.delete(bp.buildPath('items/single'), config);

  return response.data;
}

const create = async (item) => {
  const config = {
    headers: {
      Authorization: token
    }
    
  }

  const response = await axios.post(bp.buildPath('items/create'), item, config);

  return response.data
}

const update = async (itemID, item) => {
  const config = formatConfig(itemID);

  const response = await axios.put(bp.buildPath('items/single'), item, config);

  console.log(response);
  return response.data;
}

const search = async (string, userID) => {
  const config = {
    headers: { Authorization: token },
    params: {
      uid: userID,
      search: string
    }
  }

  const response = await axios.get(bp.buildPath('items/search'), config);

  return response.data;
}

const getAll = async (id) => {
  const config = formatConfig(id);

  const response = await axios.get(bp.buildPath('collections/single'), config);

  return response.data;
}

export default { getAll, create, search, update, deleteItem, setToken };