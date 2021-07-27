import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ApiContext } from '../ApiContext';
import { CollectionContext } from '../UserContext';


function UpdateItem({itemData, handleClose})
{
    const {collection} = useContext(CollectionContext);
    const {doUpdate} = useContext(ApiContext);
    
    // Initial states
    const [message,setMessage] = useState('');
    const [name,setName] = useState(itemData.item.name);
    const [error, setError] = useState(false);
    const [itemDescription, setItemDescription] = useState(itemData.item.description);
    const [item, setItem] = useState(itemData.item.item);
    const [itemId] = useState(itemData.item.id);
    

    const updateItem = event =>{
        event.preventDefault();
        const newitem = {
            name:name,
            description: itemDescription,
            item: item
        };

        const res = doUpdate(itemId, newitem);

        if(res.error){
            setError(true);
            setMessage(res.error);
          }else{
            setMessage("Successfully updated item!");
            setTimeout(function(){
              setMessage("");
              handleClose();
            },1000)
          }
    };

    const handleObjectChange = (e, key) => {
      let obj = JSON.parse(JSON.stringify(item));
      obj[key] = e.target.value;

      setItem(obj);
    };

    const handelDescriptionChange = (e) => {
      setItemDescription(e.target.value);
    }

    if(error){
      return(<h1>{message}</h1>);
    }
    else{
      return(
        <div>
            <TextField margin="dense" variant="outlined" type="text" id="itemName" defaultValue={name} label="item Name" onChange={(e) => setName(e.target.value)}/><br />
            <br />
            <TextField id="outlined-multiline-static" label="Description" multiline rows={4} defaultValue={itemDescription} variant="outlined" onChange={e=>handelDescriptionChange(e)} />

            <br />
            {collection.keys.map((key) => {
              return (
                <div key={key}>
                  <TextField
                    margin="dense"
                    variant="outlined"
                    type="text"
                    label={key}
                    value={item[key]}
                    onChange={(e) => handleObjectChange(e, key)}
                  />
                  <br />
                </div>
              );
            })}
            <br/>
            <Button variant="contained" size="large" color="primary" type="submit" id="createitemButton" value = "Update item" onClick={updateItem}>Update item</Button>
            <span id="createitemResult">{message}</span>
        </div>
      );
    }
    
}

export default UpdateItem;