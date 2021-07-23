import axios from "axios";
const bp = require("../Path");

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const formatConfig = (id) => {
  return {
    headers: { Authorization: token },
    params: { id: id },
  };
};

const deleteRoom = async (roomID) => {
  const config = formatConfig(roomID);

  const response = await axios.delete(bp.buildPath("rooms/single"), config);

  return response.data;
};

const create = async (room) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const response = await axios.post(bp.buildPath("rooms/create"), room, config);

  return response.data;
};

const update = async (roomID, room) => {
  const config = formatConfig(roomID);

  const response = await axios.put(bp.buildPath("rooms/single"), room, config);

  console.log(response);
  return response.data;
};

const search = async (string, userID) => {
  const config = {
    headers: { Authorization: token },
    params: {
      uid: userID,
      search: string,
    },
  };

  const response = await axios.get(bp.buildPath("rooms/search"), config);

  return response.data;
};

const getAll = async (id) => {
  const config = formatConfig(id);

  const response = await axios.get(bp.buildPath("users/rooms"), config);

  return response.data;
};

const getUser = async (id) => {
  const config = formatConfig(id);

  const response = await axios.get(bp.buildPath("users/"), config);

  return response.data;
};

const searchPublic = async (string) => {
  const config = {
    headers: { Authorization: token },
    params: {
      search: string,
    },
  };

  const response = await axios.get(bp.buildPath("rooms/search/public"), config);

  return response.data;
};

export default {
  getAll,
  getUser,
  create,
  search,
  update,
  deleteRoom,
  setToken,
  searchPublic,
};
