// IMPORTS/DECLARATIONS
const roomRouter = require('express').Router();
const Room = require('../models/room');
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

  return res.send(savedRoom);
})

// Update single room.
roomRouter.put('/single', async (req, res) => {
  const newName = req.body.name;
  const isPrivate = req.body.private;
  const roomID = req.query.id;
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

  // Room does not exist.
  if(!room){
    return res.status(404).json({error: "Room does not exist."});
  }

  room.name = newName;
  room.private = isPrivate;

  await Room.findByIdAndUpdate(roomID, room);

  return res.status(200).json({success: "Room updated."});
})

// Delete Room
roomRouter.delete('/single', async (req, res) => {
  const roomID = req.query.id;
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

  await room.deleteOne(); // Delete room.

  return res.status(200).json({success: "Successfully deleted room and all associated Collections and Items."});
})

// GET Room by ID
roomRouter.get('/single', async (req, res) => {
  const roomID = req.query.id;
  const verifiedToken = token.isExpired(token.getToken(req));

  // If verified token is null return
  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  var room = await Room.findById(roomID);

  if(!room){ // Room already doesn't exist.
    return res.status(404).json({error: "Room does not exist."});
  }else if((room.uid != verifiedToken.id) && room.private){ // If room private and not owner don't return room
    return res.status(403).json({error: "Room is private."})
  }

  if(room.uid != verifiedToken.id){
    return res.json(await Room.findById(roomID).populate('collections', null, { private: false }));
  }

  return res.json(await Room.findById(roomID).populate('collections'));
})

// EXPORTS
module.exports = roomRouter;

//60f21149eb0a907a4cab608a