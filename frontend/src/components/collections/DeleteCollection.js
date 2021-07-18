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

    const deleteCollection = async (collectionId) =>
    {

        var config = 
      {
          method: 'delete',
          url: bp.buildPath('collections/single'),	
          headers: 
          {
              'Content-Type': 'application/json',
              'Authorization': `bearer ${user.accessToken}`
          },
          params: {id: collectionId}
      };
      
        axios(config)
            .then(function (response) 
        {
            var res = response.data;
            if (res.error) 
            {
              setMessage('There was an error');
              handleClose();
            }
            else 
            {
                setMessage('Collection Deleted');
                setTimeout(
                function(){
                    history.push('/museum');
                    setMessage('');
                    handleClose();
                },1000)
            }
        })
        .catch(function (error) 
        {
            setMessage(error.message);
            handleClose();
        });
    };


    return(
        <div>
           <Dialog maxWidth="lg" open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
                <DialogTitle>{`This will DELETE the "${collectionData.name} Collection" and all items in the collection from the "${room.name} room"`}</DialogTitle>
                <DialogContent><span>{message}</span></DialogContent>
                <DialogActions>
                    <Button onClick={() => deleteCollection(collectionData.id)} color="secondary">DELETE PERMANENTLY</Button><br/>
                    <Button onClick={handleClose} color="primary">CANCEL</Button>
                 </DialogActions>
            </Dialog>
         </div>
    );
}

export default DeleteCollection;