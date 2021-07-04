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

// Update single room.
roomRouter.put('/:id', async (req, res) => {
  const newName = req.body.name;
  const private = req.body.private;
  const roomID = req.params.id;
  const verifiedToken = token.isExpired(token.getToken(req));

  // If verified token is null return
  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  // User already has room with name
  const nameExists = await Room.find({
    name: newName, 
    uid: verifiedToken.id, 
    _id: { $ne: roomID }
  });

  if(nameExists.length > 0){
    return res.status(409).json({error: "Room name already exists."});
  }

  const room = await Room.findOne({_id: roomID, uid: verifiedToken.id});

  console.log(room);
  // Room does not exist.
  if(!room){
    return res.status(404).json({error: "Room does not exist."});
  }

  room.name = newName;
  room.private = private;

  await room.save();

  return res.status(200).json({success: "Room updated."});
})

// Delete Room
roomRouter.delete('/:id', async (req, res) => {
  const roomID = req.params.id;
  const verifiedToken = token.isExpired(token.getToken(req));

  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  const room = await Room.findById(roomID);

  if(!room){ // ROOM DOES NOT EXIST
    return res.status(404).json({error: "Room does not exist."});
  }else if(room.uid != verifiedToken.id){ // ROOMS OWNER IS NOT OWNER MAKING REQUEST
    return res.status(403).json({error: "Cannot delete a room that is not yours."});
  }

  await Room.deleteOne({_id: room.id}); // Delete room.
  await User.updateOne({uid: verifiedToken.id}, {rooms: {$nin: [roomID.id]}});
  //await Collection.deleteMany({roomID: room.id}); // Delete any Collections that are part of room
  //await Item.deleteMany({roomID: room.id}); // Delete any Items that are part of room.

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

  console.log("UID: " + room.uid + "  Token: " + verifiedToken.id);

  // If room private and not owner don't return room
  if((room.uid !== verifiedToken.id) && room.private){
    return res.status(401).json({error: "Room is private."})
  }

  return res.json(room);
})

// EXPORTS
module.exports = roomRouter;