import React, { useState, useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import IconButton from '@material-ui/core/IconButton';
import UpdateRoom from './UpdateRoom';
import DeleteRoom from './DeleteRoom';
import { useHistory } from 'react-router-dom';
import { RoomContext } from './../UserContext';

function RoomCard({room}){
  // Initial States
  const history = useHistory();
  const context = useContext(RoomContext);

  const [message, setMessage]=  useState("");
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [cancelButton, setCancelButton] = useState(false);
  const [showDialog, setShowDialog] = useState();

  const editRoom = (roomId, roomName) => {
    setCancelButton(true);
    setEdit(true);
  }

  const closeDelete = () => {
    setOpen(false);
    setShowDialog("");
  }

  const openDelete = (id,name) => {
      setOpen(true);
      setShowDialog(<DeleteRoom roomData={{id,name}} closeDelete={()=> closeDelete()}/>)
  }

  // Used to hide the Create New Room Form
  function cancelClicked() {
    setCancelButton(false);
    setEdit(false);
  }

  const enterRoom = (roomId, roomName) => {
    context.setRoom({name:roomName,id:roomId});
    history.push("/collections")
  }

    if(edit){
      return (
        <div key={room.id}>
          {/* Displays the content as editable */}
          <Card >                            
            <CardContent>
                <UpdateRoom roomData={{roomId: room.id, roomName: room.name}}/>
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
              <p>Room: {room.name}</p>
              <p>Private: {room.private.toString()}</p>
              <p>Collections: {room.collections}</p>
            </div>
              </CardContent>
              <CardActions>
                {/* Enter/Update/Delete Room Buttons */}
                <IconButton size="medium" color="primary" onClick={()=>{enterRoom(room.id,room.name)}}><MeetingRoomIcon/></IconButton>
                <IconButton size="medium" color="primary" onClick={()=>{editRoom(room.id,room.name)}}><EditIcon/></IconButton>
                {/* <IconButton size="small" color="secondary" onClick={doDelete(room.id,room.name)}><DeleteIcon/></IconButton> */}
                <span>{message}</span>
                {/* If user clicks on the delete room button a dialog box will pop up for confirmation */}
                <IconButton color="secondary" size ="small" onClick={()=>{openDelete(room.id,room.name)}}><DeleteIcon/></IconButton>
                <span id="createDialog">{showDialog}</span>
              </CardActions>
          </Card>
          <br />
        </div>
      )
    }
}

export default RoomCard;