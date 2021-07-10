import React, { useState, forwardRef } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import IconButton from '@material-ui/core/IconButton';
import { useParams } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';
import RoomForm from './RoomForm.js';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Room({roomData}) {

    var bp = require('./Path.js');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var token = ud.accessToken;

    const { userId } = useParams(); // grabs the id from the url

    // Initial States
    const [message, setMessage]=  useState("");
    const [open, setOpen] = useState(true);
    const [name,setName] = useState(roomData.roomName);
    const [roomId,setRoomId] = useState(roomData.roomId);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
        // window.location.href = `/museum/${userId}`;
    };

    const doDelete = (roomId,roomName) => async event =>
    {
        event.preventDefault();
        var id = {id:roomId};
        var config = 
        {
            method: 'delete',
            url: bp.buildPath('rooms/single'),
            headers:
            {
                'Content-Type':'application/json',
                'Authorization': `bearer ${token}`
            },
            params: id
        };
        axios(config)
            .then(function(response)
        {
            var res = response.data;
            if(res.error)
            {
                console.log(res.error);
            }
            else{
                setMessage(`${roomName} room Successfully Deleted`);
                setTimeout(
                    function(){
                            window.location.href = `/museum/${userId}`;
                    },2000)
            }
        })
        .catch(function(error)
        {
            console.log(error.message);
        })
    }

    return(
        <div>
           <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
                <DialogTitle>{`Are you sure you want to DELETE the "${name}" room?`}</DialogTitle>
                <DialogContent><span>{message}</span></DialogContent>
                <DialogActions>
                    <Button onClick={doDelete(roomId,name)} color="secondary">DELETE PERMANENTLY</Button><br/>
                    <Button onClick={handleClose} color="primary">CANCEL</Button>
                 </DialogActions>
            </Dialog>
         </div>
    );
    



};

export default Room;