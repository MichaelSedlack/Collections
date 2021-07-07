import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    title: {
      fontSize: 14,
    },
  });

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


function RoomForm({data}){

    var bp = require('./Path.js');
    var storage = require('../tokenStorage.js');

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var token = ud.accessToken;

    const { userId } = useParams(); // grabs the id from the url
    const [message, setMessage]=  useState("");
    const [open, setOpen] = React.useState(false);


    const doDelete = roomId => async event =>
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
                setMessage("Room Successfully Deleted");
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

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    return(
        <div>
            <Card>
                {data.map((detail,room)=>{
                    return(
                        <div>
                            {/* Displays the content from the rooms array from /users/rooms */}
                            <Card>                            
                                <CardContent>
                                    <p key={room.id}>Room: {detail.name}</p>
                                    <p key={room.id}>Private: {detail.private.toString()}</p>
                                    <p key={room.id}>Collections: {detail.collections}</p>
                                   
                                </CardContent>
                                <CardActions>
                                    <IconButton size="medium" onClick={()=>{alert("Enter Room Button was clicked!")}}><MeetingRoomIcon/></IconButton>
                                    <IconButton size="medium" onClick={()=>{alert("Edit Room Button was clicked!")}}><EditIcon/></IconButton>

                                    {/* If user clicks on the delete room button a dialog box will pop up for confirmation */}
                                    <IconButton size ="small" onClick={handleClickOpen}><DeleteIcon/></IconButton>
                                    <Dialog open={open}
                                            TransitionComponent={Transition}
                                            keepMounted
                                            onClose={handleClose}>
                                            <DialogTitle>{`Are you sure you want to DELETE the "${detail.name}" room?`}</DialogTitle>
                                            <DialogContent><span>{message}</span></DialogContent>
                                            <DialogActions>
                                                <Button onClick={doDelete(detail.id)} color="secondary">DELETE PERMANENTLY</Button><br/>
                                                <Button onClick={handleClose} color="primary">CANCEL</Button>
                                            </DialogActions>
                                    </Dialog>

                                </CardActions>
                            </Card>
                            <br />
                        </div>
                    );
                })}
            </Card>
        </div>
    );
}

export default RoomForm;