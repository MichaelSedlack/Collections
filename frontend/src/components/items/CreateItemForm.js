import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
  const [itemKeys, setItemKeys] = useState(keys);
  const [itemDescription, setItemDescription] = useState("");
  const [keyName, setKeyName] = useState([]);


  const createItem = async event =>
  {
    event.preventDefault();

    var item = {
      name:itemName,
      description: itemDescription,
      roomID:room.id,
      collectionID:collection.id
    };

    const res = doCreate(item);

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
    }, 500);
  };


    const handleNameChange = (e) => {
      setItemName(e.target.value);
    }

    const handelDescriptionChange = (e) => {
      setItemDescription(e.target.value);
    }

    const handleKeyName = (e) => {
      setKeyName(e.target.value);
      console.log(`Key PROPS: ${keyName}`)
    }
      
    if(open){
        return(
          <div>
              <span id="inner-title">Create New Item</span><br />
              
              <TextField margin="dense" variant="outlined" type="text" id="itemName" label="Item Name" value={itemName} onChange={e => handleNameChange(e)}/>
              <br /><br/>
              {/* Displays the Key Properties as text fields */}
              {itemKeys.map(key=>{return(
                <TextField margin="dense" variant="outlined" type="text" id={key} label={key} onChange={(e)=>{handleKeyName(e)}}/>
              )})}

              <br /><br/>
              <TextField id="outlined-multiline-static" label="Description" multiline rows={4}  variant="outlined" onChange={e=>handelDescriptionChange(e)} />
              <br/><br/>
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