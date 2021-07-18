import React, { useState, forwardRef, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { CollectionContext } from './../UserContext';
import { ApiContext } from './../ApiContext';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteItem({itemData, closeDelete}) {
    const {collection} = useContext(CollectionContext)
    const {doDelete} = useContext(ApiContext);

    // Initial States
    const [message, setMessage]=  useState("");
    const [open, setOpen] = useState(true);
    
    const handleClose = () => {
        setOpen(false);
        closeDelete();
    };

    const handleDelete = (itemId) => {
        const res = doDelete(itemId);
        if(res.error){
            setMessage(res.error);
            setTimeout(function(){
            handleClose();
            setMessage("");
        },500)
        return;
      }

      setMessage("Successfully deleted the item!");
      setTimeout(function(){
        setMessage("");
        handleClose();
      },1000)
    }

    return(
        <div>
           <Dialog maxWidth="lg" open={open} TransitionComponent={Transition} keepMounted onClose={handleClose}>
                <DialogTitle>{`This will DELETE the "${itemData.name} item" and all items in the "${collection.name} collection"`}</DialogTitle>
                <DialogContent><span>{message}</span></DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDelete(itemData.id)} color="secondary">DELETE PERMANENTLY</Button><br/>
                    <Button onClick={handleClose} color="primary">CANCEL</Button>
                 </DialogActions>
            </Dialog>
         </div>
    );
}

export default DeleteItem;