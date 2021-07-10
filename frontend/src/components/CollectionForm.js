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
import Slide from '@material-ui/core/Slide';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function CollectionForm({data}){

    var bp = require('./Path.js');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var token = ud.accessToken;

    const { userId } = useParams(); // grabs the id from the url
    
    // Initial States
    const [message, setMessage]=  useState("");
    const [open, setOpen] = React.useState(false);

    
    
    return(
        <div>
            {data.map(collection=>{
                return(
                    <div key={collection.id}>
                        {/* Displays the content from the rooms array from /users/rooms */}
                        <Card >                            
                            <CardContent>
                            <div>
                                <p>Collection: {collection.name}</p>
                                <p>Private: {collection.private.toString()}</p>
                                <p>Items: {collection.items}</p>
                            </div>
                            </CardContent>
                            <CardActions>
                                {/* Enter/Update/Delete Room Buttons */}
                                <IconButton size="medium" color="primary" onClick={()=>{alert("Enter Collection Button was clicked!")}}><MeetingRoomIcon/></IconButton>
                                <IconButton size="medium" color="primary" onClick={()=>{alert("button was clicked")}}><EditIcon/></IconButton>
                                {/* <IconButton size="small" color="secondary" onClick={doDelete(room.id,room.name)}><DeleteIcon/></IconButton> */}
                                <span>{message}</span>
                                {/* If user clicks on the delete room button a dialog box will pop up for confirmation */}
                                <IconButton color="secondary" size ="small" onClick={()=>{alert("button was clicked")}}><DeleteIcon/></IconButton>
                            </CardActions>
                        </Card>
                        <br />
                    </div>
                );
            })}
        </div>
    );
    
}

export default CollectionForm;