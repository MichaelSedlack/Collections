// IMPORTS/DECLARATIONS
const config = require('../utils/config');
const itemsRouter = require('express').Router();
const Item = require('../models/item');
//room may not be required, can only access item through collection and nothing else
const Room = require('../models/room');
const Collection = require('../models/collection');
const User = require('../models/user');
const token = require('../utils/token');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');

// Helper functions
const containsKeys = (keys, item) => {
  const result = keys.map(key => {
    return (item[key] != null);
  })

  return result.includes(false) ? false : true;
}

// MULTER SETUP
const storage = new GridFsStorage({
  url: config.MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({storage});

// Create Item
itemsRouter.post('/create', upload.single("image"), async (req, res) => {
  const body = JSON.parse(req.body.item);
  const verifiedToken = token.isExpired(token.getToken(req));

  // If verified token is null return
  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  // CHECK IF KEYS VALID
  const collectionKeys = await Collection.findById(body.collectionID, 'keys');

  if(!containsKeys(collectionKeys.keys, body.item)){
    return res.status(400).json({error: "Item does not conform to collection keys."});
  }
  //-----

  // Item uniqueness across collection validation.
  const itemExists = await Item.find({
    uid: verifiedToken.id, 
    name: body.name,
    collectionID: body.collectionID, 
    item: body.item,
  });
  
  if(itemExists.length > 0){
    return res.status(409).json({error: "Item already in collection."});
  }
  // TODO: Update rather than add new item.
  //-------

  let img = 'images/'

  if(request.file){
    img = img + req.file.filename
  }

  // Create item object
  const newItem = new Item({
    name: body.name,
    description: body.description,
    item: body.item,
    img,
    collectionID: body.collectionID,
    roomID: body.roomID,
    uid: verifiedToken.id
  })

  const savedItem = await newItem.save(); // Save item

  return res.send(savedItem);
})

itemsRouter.get('/search', async (req, res) => {
  const search = req.query.search;
  const collectionID = req.query.collectionID;
  const verifiedToken = token.isExpired(token.getToken(req));

  // If verified token is null return
  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  const collection = await Collection.findById(collectionID);

  if(collection.private && (collection.uid != verifiedToken.id)){
    return res.status(403).json({error: "Collection is private."});
  }

  const items = await Item.find({
    name: { $regex: search, $options: 'i' },
    collectionID: collectionID
  })

  return res.send(items);
})

// GET Item
//TODO: Figure out how to search by given tags
//'/:id'
itemsRouter.get('/single', async (req, res) => {
  const itemID = req.query.id;
  const verifiedToken = token.isExpired(token.getToken(req));

  // If verified token is null return
  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  const item = await Item.findById(itemID);
  //find collection here to check if its private?

  if(!item){ // Item doesn't exist.
    return res.status(404).json({error: "Item does not exist."});
  }else if(item.uid != verifiedToken.id){
    const collection = await Collection.findById(item.collectionID);
    if(collection.private)
      return res.status(403).json({error: "Item is in a private collection."});
  }

  return res.json(item);
})

// Update Item
//'/:id'
itemsRouter.put('/single', async (req, res) => {
  const body = req.body;
  const itemID = req.query.id;
  const verifiedToken = token.isExpired(token.getToken(req));

  // If verified token is null return
  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  // Validate that item doesn't already exist.
  const itemExists = await Item.find({
    name: body.name,
    roomID: body.roomID,
    item: body.item,
    collectionID: body.collectionID,
    uid: verifiedToken.id,
    _id: { $ne: itemID }
  })

  if(itemExists.length > 0){
    return res.status(409).json({error: "Item already exists."});
  }

  const item = await Item.findById(itemID);

  if(item.uid != verifiedToken.id){
    return res.status(403).json({error: "Cannot modify an item that is not yours."});
  }

  item.name = body.name;
  item.description = body.description;
  item.item = body.item;

  console.log(await Item.findByIdAndUpdate(itemID, item))
  return res.status(200).json({success: "Item updated."});
})

// Delete Item
//'/:id'
itemsRouter.delete('/single', async (req, res) => {
  const itemID = req.query.id;
  const verifiedToken = token.isExpired(token.getToken(req));

  if(!verifiedToken){
    return res.status(401).json({error: "JSON WebToken NULL"});
  }

  const item = await Item.findById(itemID);

  if(!item){ // ITEM DOES NOT EXIST
    return res.status(404).json({error: "Item does not exist."});
  }else if(item.uid != verifiedToken.id){ // ITEMS OWNER IS NOT USER MAKING REQUEST
    return res.status(403).json({error: "Cannot delete an item that is not yours."});
  }

  await item.deleteOne(); // Delete item.

  return res.status(200).json({success: "Successfully deleted item."});
})

// EXPORTS
module.exports = itemsRouter;
