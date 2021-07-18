import React, { useState, forwardRef, useContext } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { UserContext,RoomContext } from './../UserContext';
import { useHistory } from 'react-router-dom';
import { ApiContext } from './../ApiContext';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteCollection({collectionData, closeDelete}) {
    const history = useHistory();
    var bp = require('./../Path.js');
    const {user} = useContext(UserContext)
    const {room} = useContext(RoomContext)
    // Initial States
    const [message, setMessage]=  useState("");
    const [open, setOpen] = useState(true);
    
    const handleClose = () => {
        setOpen(false);
        closeDelete();
    };

    const {doDelete} = useContext(ApiContext);

    const handleDelete = (collectionId) => {
        const res = doDelete(collectionId);
        if(res.error){
            setMessage(res.error);
            setTimeout(function(){
            handleClose();
            setMessage("");
        },500)
        return;
      }

      setMessage("Successfully deleted the collection!");
      setTimeout(function(){
        setMessage("");
        handleClose();
      },1000)
    }


    return(
        <div>
           <Dialog maxWidth="lg" open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
                <DialogTitle>{`This will DELETE the "${collectionData.name} Collection" and all items in the collection from the "${room.name} room"`}</DialogTitle>
                <DialogContent><span>{message}</span></DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDelete(collectionData.id)} color="secondary">DELETE PERMANENTLY</Button><br/>
                    <Button onClick={handleClose} color="primary">CANCEL</Button>
                 </DialogActions>
            </Dialog>
         </div>
    );
}

export default DeleteCollection;