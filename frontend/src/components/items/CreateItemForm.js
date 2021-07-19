import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import { RoomContext, CollectionContext } from './../UserContext';
import { ApiContext } from './../ApiContext';


function CreateItemForm({keys})
{
  const { doCreate } = useContext(ApiContext);
  const {room} = useContext(RoomContext);
  const {collection} = useContext(CollectionContext);

  // Initial States
  const [message,setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemKeys, setItemKeys] = useState({});
  const [image, setImage] = useState();
  const [itemDescription, setItemDescription] = useState("");
  const [keyName, setKeyName] = useState([]);


  const createItem = async event =>
  {
    event.preventDefault();

    var item = {
      name:itemName,
      description: itemDescription,
      item: itemKeys,
      roomID:room.id,
      collectionID:collection.id
    };

    const formData = new FormData();
    formData.append('image', image);
    formData.append('item', JSON.stringify(item));

    const res = doCreate(formData);

    if(res.error){
      setMessage(res.error);
      return;
    }

    setMessage("Successfully created item!");
    setTimeout(() => {
      setMessage("");
      setOpen(false);
      setItemName("");
      setItemDescription("");
      collection.keys.map(key=>{
        itemKeys[key]="";
      })
    }, 500);
  };


    const handleNameChange = (e) => {
      setItemName(e.target.value);
    }

    const handleObjectChange = (e, key) => {
      let obj = itemKeys;
      obj[key] = e.target.value;

      setItemKeys(obj);
    }

    const handlePhoto = (e) => {
      setImage(e.target.files[0]);
    }

    const handelDescriptionChange = (e) => {
      setItemDescription(e.target.value);
    }
      
    if(open){
        return(
          <div>
              <span id="inner-title">Create New Item</span><br />
              
              <TextField margin="dense" variant="outlined" type="text" id="itemName" label="Item Name" value={itemName} onChange={e => handleNameChange(e)}/>
              <br /><br/>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={(e) => handlePhoto(e)}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" size="small" component="span">
                  <CloudUploadOutlinedIcon color="primary">Upload</CloudUploadOutlinedIcon>&nbsp;<h5>Upload a photo</h5>
                </Button>
              </label> 

              <br /><br/>
              <TextField id="outlined-multiline-static" label="Description" multiline rows={4}  variant="outlined" onChange={e=>handelDescriptionChange(e)} />
              <br/><br/>
              {collection.keys.map(key => {
                return (
                  <div>
                    <TextField margin="dense" variant="outlined" type="text" label={key} value={itemKeys[key]} onChange={e => handleObjectChange(e, key)}/> <br/><br/>
                  </div>)
              })}

              <br/>
              <Button variant="contained" size="large" color="primary" type="submit" id="CreateItemButton" className="buttons" value = "Set Up New Item" onClick={createItem}>Set Up New Item</Button>
              <Button variant="contained" size="large" color="secondary" type="submit" id="cancelButton" className="buttons" value="Cancel" onClick={()=>{setOpen(false)}}>Cancel</Button><br />
              <span id="CreateItemResult">{message}</span>
          </div>
      );
    }else{
      return(
        <div>
          <Button variant="contained" size="large" color="primary" type="submit" id="CreateItemFormButton" className="buttons" value="Create New Item" onClick={() => setOpen(true)}>Create New Item</Button><br />
        </div>
      )
    }
}

export default CreateItemForm;