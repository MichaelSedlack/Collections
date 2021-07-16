import React, { useState, forwardRef, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { ApiContext } from './../ApiContext';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteRoom({roomData, closeDelete}) {

  const {doDelete} = useContext(ApiContext);

    // Initial States
    const [message, setMessage]=  useState("");
    const [open, setOpen] = useState(true);
    
    const handleClose = () => {
        setOpen(false);
        closeDelete();
    };

    const handleDelete = (roomId) => {
      console.log(roomData);
      const res = doDelete(roomId);
      if(res.error){
        setMessage(res.error);
        setTimeout(function(){
          handleClose();
          setMessage("");
        },500)
        return;
      }

      setMessage("Successfully deleted the room!");
      setTimeout(function(){
        handleClose();
      },1000)
    }

    return(
        <div>
           <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
                <DialogTitle>{`Are you sure you want to DELETE the "${roomData.name}" room?`}</DialogTitle>
                <DialogContent><span>{message}</span></DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDelete(roomData.id)} color="secondary">DELETE PERMANENTLY</Button><br/>
                    <Button onClick={handleClose} color="primary">CANCEL</Button>
                 </DialogActions>
            </Dialog>
         </div>
    );
}

export default DeleteRoom;