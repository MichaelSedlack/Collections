import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import UpdateRoom from './UpdateRoom.js';
import Room from './Room.js';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function RoomForm({data}){

    var bp = require('./Path.js');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var token = ud.accessToken;

    const { userId } = useParams(); // grabs the id from the url
    
    // Initial States
    const [message, setMessage]=  useState("");
    const [open, setOpen] = React.useState(false);
    const [cancelButton, setCancelButton] = useState(false);
    const [showEdit, setShowEdit] = useState();
    const [showDialog, setShowDialog] = useState();

    

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const editRoom = (roomId, roomName) => {
        setCancelButton(true);
        setShowEdit(<UpdateRoom roomData={{roomId, roomName}}/>);
        
    }

    const doDelete = (roomId,roomName) => {
        setOpen(true);
        setShowDialog(<Room roomData={{roomId,roomName}}/>)
    }

    // Used to hide the Create New Room Form
    function cancelClicked() {
        setCancelButton(false)
        // {window.location.href = '/museum'}
    };

    if(cancelButton){
        return(
            <div>
                {data.map(room=>{
                    return(
                        <div key={room.id}>
                            {/* Displays the content as editable */}
                            <Card >                            
                                <CardContent>
                                    <span>{showEdit}</span><br />
                                    {cancelButton ? <Button variant="contained" size="large" color="secondary" type="submit" id="cancelButton" className="buttons" value="Cancel" onClick={()=>{cancelClicked()}}>Cancel</Button> : null}
                                </CardContent>
                            </Card>
                            <br />
                        </div>
                    );
                })}
            </div>
        );
    }
    else{
        return(
            <div>
                {data.map(room=>{
                    return(
                        <div key={room.id}>
                            {/* Displays the content from the rooms array from /users/rooms */}
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
                                    <IconButton size="medium" color="primary" onClick={()=>{alert("Enter Room Button was clicked!")}}><MeetingRoomIcon/></IconButton>
                                    <IconButton size="medium" color="primary" onClick={()=>{editRoom(room.id,room.name)}}><EditIcon/></IconButton>
                                    {/* <IconButton size="small" color="secondary" onClick={doDelete(room.id,room.name)}><DeleteIcon/></IconButton> */}
                                    <span>{message}</span>
                                    {/* If user clicks on the delete room button a dialog box will pop up for confirmation */}
                                    <IconButton color="secondary" size ="small" onClick={()=>{doDelete(room.id,room.name)}}><DeleteIcon/></IconButton>
                                    <span id="createDialog">{showDialog}</span>
                                </CardActions>
                            </Card>
                            <br />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default RoomForm;