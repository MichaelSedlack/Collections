import React, { useState, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import IconButton from "@material-ui/core/IconButton";
import UpdateRoom from "./UpdateRoom";
import DeleteRoom from "./DeleteRoom";
import { useHistory } from "react-router-dom";
import { UserContext, RoomContext } from "./../UserContext";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    width: "75%",
    display: "flex",
    transition: ".5s",
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    paddingBottom: spacing(2),
    paddingTop: spacing(2),
  },
  hover: {
    width: "75%",
    display: "flex",
    transition: "0.3s",
    boxShadow: "1px 1px 2px 2px rgba(34, 35, 58, 0.2)",
    paddingBottom: spacing(2),
    paddingTop: spacing(2),
  },

  details: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
  },

  content: {
    flex: "1 0 auto",
  },

  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
  },
  controlsOpen: {
    display: "flex",
    alignItems: "flex-end",
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
  },
}));

function RoomCard({ room }) {
  // Initial States
  const history = useHistory();
  const { user } = useContext(UserContext);
  const context = useContext(RoomContext);
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [cancelButton, setCancelButton] = useState(false);
  const [showDialog, setShowDialog] = useState();
  const [shadow, setShadow] = useState(false);

  const editRoom = () => {
    setCancelButton(true);
    setEdit(true);
  };

  const closeDelete = () => {
    setOpen(false);
    setShowDialog("");
  };

  const openDelete = (id, name) => {
    setOpen(true);
    setShowDialog(
      <DeleteRoom roomData={{ id, name }} closeDelete={() => closeDelete()} />
    );
  };

  // Used to hide the Create New Room Form
  function cancelClicked() {
    setCancelButton(false);
    setEdit(false);
  }

  const enterRoom = (roomId, roomName) => {
    context.setRoom({
      name: roomName,
      id: roomId,
      uid: room.uid,
      firstName: room.firstName,
    });
    history.push("/collections");
  };

  if (edit) {
    return (
      <div key={room.id}>
        {/* Displays the content as editable */}
        <Card
          onMouseEnter={() => setShadow(true)}
          onMouseLeave={() => setShadow(false)}
          className={shadow ? classes.root : classes.hover}
        >
          <div className={classes.details}>
            <div className={classes.controlsOpen}>
              <UpdateRoom
                roomData={{ roomId: room.id, roomName: room.name }}
                handleClose={cancelClicked}
              />
              {cancelButton ? (
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  type="submit"
                  id="cancelButton"
                  value="Cancel"
                  onClick={() => {
                    cancelClicked();
                  }}
                >
                  Cancel
                </Button>
              ) : null}
            </div>
          </div>
        </Card>
        <br />
      </div>
    );
  } else {
    return (
      <div>
        <Card
          onMouseEnter={() => setShadow(true)}
          onMouseLeave={() => setShadow(false)}
          className={shadow ? classes.root : classes.hover}
        >
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <div>
                {room.firstName}'s {room.name} Room
                <p>
                  {room.private
                    ? "Private - No one can view this room"
                    : "Public - Anyone can view this room"}
                </p>
                <p>{room.collections.length} Collections Found</p>
              </div>
            </CardContent>
            <div className={classes.controls}>
              {/* Enter/Update/Delete Room Buttons */}
              <IconButton
                size="medium"
                color="primary"
                onClick={() => {
                  enterRoom(room.id, room.name);
                }}
              >
                <MeetingRoomIcon />
              </IconButton>
              {user.id === room.uid && (
                <IconButton
                  size="medium"
                  color="primary"
                  onClick={() => {
                    editRoom();
                  }}
                >
                  <EditIcon />
                </IconButton>
              )}
              {/* If user clicks on the delete room button a dialog box will pop up for confirmation */}
              {user.id === room.uid && (
                <IconButton
                  color="secondary"
                  size="small"
                  onClick={() => {
                    openDelete(room.id, room.name);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
              <span id="createDialog">{showDialog}</span>
            </div>
          </div>
        </Card>
        <br />
      </div>
    );
  }
}

export default RoomCard;
