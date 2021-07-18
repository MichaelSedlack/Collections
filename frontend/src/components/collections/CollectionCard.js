import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import IconButton from '@material-ui/core/IconButton';
import UpdateCollection from './UpdateCollection';
import DeleteCollection from './DeleteCollection';
import { RoomContext } from './../UserContext';

function CollectionCard({collection}){
  // Initial States
  const history = useHistory();
  const context = useContext(RoomContext);

  const [message, setMessage]=  useState("");
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [cancelButton, setCancelButton] = useState(false);
  const [showDialog, setShowDialog] = useState();

  const editCollection = (collectionId, collectionName) => {
    setCancelButton(true);
    setEdit(true);
  }

  const closeDelete = () => {
    setOpen(false);
    setShowDialog("");
  }

  const openDelete = (id,name) => {
      setOpen(true);
      setShowDialog(<DeleteCollection collectionData={{id,name}} closeDelete={()=> closeDelete()}/>)
  }

  // Used to hide the Create New Collection Form
  function cancelClicked() {
    setCancelButton(false);
    setEdit(false);
  }

  const enterCollection = (collectionId, collectionName) => {
    alert("clicked")
    // context.setCollection({name:collectionName,id:collectionId});
    // history.push("/collections")
  }

    if(edit){
      return (
        <div key={collection.id}>
          {/* Displays the content as editable */}
          <Card >                            
            <CardContent>
                <UpdateCollection collectionData={{collectionId: collection.id, collectionName: collection.name}} handleClose={cancelClicked}/>
                {cancelButton ? <Button variant="contained" size="large" color="secondary" type="submit" id="cancelButton" className="buttons" value="Cancel" onClick={()=>{cancelClicked()}}>Cancel</Button> : null}
              </CardContent>
          </Card>
          <br />
        </div>

      )
    }else{
      return(
        <div>
          <Card >                            
            <CardContent>
            <div>
              <p>Collection: {collection.name}</p>
              <p>Private: {collection.private.toString()}</p>
              <p>Items: {collection.items}</p>
            </div>
              </CardContent>
              <CardActions>
                {/* Enter/Update/Delete collection Buttons */}
                <IconButton size="medium" color="primary" onClick={()=>{enterCollection(collection.id,collection.name)}}><MeetingRoomIcon/></IconButton>
                <IconButton size="medium" color="primary" onClick={()=>{editCollection(collection.id,collection.name)}}><EditIcon/></IconButton>
                {/* <IconButton size="small" color="secondary" onClick={doDelete(collection.id,collection.name)}><DeleteIcon/></IconButton> */}
                <span>{message}</span>
                {/* If user clicks on the delete room button a dialog box will pop up for confirmation */}
                <IconButton color="secondary" size ="small" onClick={()=>{openDelete(collection.id,collection.name)}}><DeleteIcon/></IconButton>
                <span id="createDialog">{showDialog}</span>
              </CardActions>
          </Card>
          <br />
        </div>
      )
    }
}

export default CollectionCard;