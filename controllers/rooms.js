// IMPORTS/DECLARATIONS
const roomRouter = require('express').Router();
const { Collection } = require('mongoose');
const Room = require('../models/room');
const User = require('../models/user');
const token = require('../utils/token');

// ROUTES
// Create Room
roomRouter.post('/create', async (req, res) => {
  const body = req.body;
  const verifiedToken = token.isExpired(token.getToken(req));

  // If verified token is null return
  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  // Room uniqueness across user validation.
  const nameInUse = await Room.find({uid: verifiedToken.id, name: body.name});
  if(nameInUse.length > 0){
    return res.status(409).json({error: "Room name already in use."});
  }

  // Create room object
  const newRoom = new Room({
    name: body.name,
    private: body.private,
    collections: [],
    uid: verifiedToken.id
  })

  const savedRoom = await newRoom.save(); // Save room

  // Push RoomID to Users rooms array.
  const user = await User.findById(verifiedToken.id);
  user.rooms.push(savedRoom.id);
  await user.save();

  return res.send(savedRoom);
})

// Delete Room
roomRouter.delete('/:id', async (req, res) => {
  const roomID = req.params.id;
  const verifiedToken = token.isExiprired(token.getToken(req));

  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  const room = await Room.findById(roomID);

  if(room.uid !== verifiedToken.id){
    return res.status(403).json({error: "Cannot delete a room that is not yours."});
  }

  await Room.deleteOne({id: room.id}); // Delete room.
  await Collection.deleteMany({roomID: room.id}); // Delete any Collections that are part of room
  await Item.deleteMany({roomID: room.id}); // Delete any Items that are part of room.

  return res.status(204).json({success: "Successfully deleted room and all associated Collections and Items."});
})

// GET Room by ID
roomRouter.get('/:id', async (req, res) => {
  const roomID = req.params.id;
  const verifiedToken = token.isExpired(token.getToken(req));

  // If verified token is null return
  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  const room = await Room.findById(roomID);

  // If room private and not owner don't return room
  if((room.uid != verifiedToken.id) && room.private){
    return res.status(401).json({error: "Room is private."})
  }

  return res.send(room);
})

// EXPORTS
module.exports = roomRouter;