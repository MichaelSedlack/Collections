import React, { useState, forwardRef, useContext } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { CollectionContext, RoomContext } from "./../UserContext";
import { ApiContext } from "./../ApiContext";
import { buttonStyles } from "../Styles";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DeleteItem({ itemData, closeDelete }) {
  const { room } = useContext(RoomContext);
  const { collection } = useContext(CollectionContext);
  const { doDelete } = useContext(ApiContext);

  const buttonStyle = buttonStyles();

  // Initial States
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(true);
  const [error, setError] = useState(false);

  const handleClose = () => {
    setOpen(false);
    closeDelete();
  };

  const handleDelete = (itemId) => {
    const res = doDelete(itemId);
    if (res.error) {
      setError(true);
      setMessage(res.error);
      setTimeout(function () {
        handleClose();
        setMessage("");
      }, 500);
      return;
    }

    setMessage("Successfully deleted the item!");
    setTimeout(function () {
      setMessage("");
      handleClose();
    }, 1000);
  };

  if (error) {
    return <h1>{message}</h1>;
  } else {
    return (
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
        >
          <DialogTitle>{`This will DELETE the "${itemData.name} item" from the "${collection.name} collection" in the "${room.name} room""`}</DialogTitle>
          <DialogContent>
            <span>{message}</span>
          </DialogContent>
          <DialogActions>
            <Button
              className={buttonStyle.decline}
              onClick={() => handleDelete(itemData.id)}
              color="secondary"
            >
              DELETE
            </Button>
            <br />
            <Button
              className={buttonStyle.accept}
              onClick={handleClose}
              color="primary"
            >
              CANCEL
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteItem;
