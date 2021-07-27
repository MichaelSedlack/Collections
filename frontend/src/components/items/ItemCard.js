import React, { useState, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";
import UpdateItem from "./UpdateItem";
import DeleteItem from "./DeleteItem";
import { UserContext, RoomContext, CollectionContext } from "../UserContext";
import { CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(({ spacing }) => ({
  media: {
    height: 200,
    width: 151,
  },

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
    width: "11rem",
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

function ItemCard({ item }) {
  // Initial States
  const classes = useStyles();
  const { collection } = useContext(CollectionContext);
  const { user } = useContext(UserContext);
  const { room } = useContext(RoomContext);
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [cancelButton, setCancelButton] = useState(false);
  const [showDialog, setShowDialog] = useState();
  const [shadow, setShadow] = useState(false);

  const editItem = (itemId, itemName) => {
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
      <DeleteItem itemData={{ id, name }} closeDelete={() => closeDelete()} />
    );
  };

  // Used to hide the Create New Item Form
  function cancelClicked() {
    setCancelButton(false);
    setEdit(false);
  }

  if (user.id != room.uid) {
    return (
      <div>
        {console.log(item.img)}

        <Card
          onMouseEnter={() => setShadow(true)}
          onMouseLeave={() => setShadow(false)}
          className={shadow ? classes.root : classes.hover}
        >
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <p>Item: {item.name}</p>
              <Typography style={{ wordWrap: "break-word" }}>
                Description: {item.description}
              </Typography>
              <br />
              {collection.keys.map((key) => {
                return (
                  <p key={key}>
                    {key}: {item.item[key]}
                  </p>
                );
              })}
            </CardContent>

            <div className={classes.controls}>
              <span>{message}</span>
              <span id="createDialog">{showDialog}</span>
            </div>
          </div>
          {/* Displays Item Image */}
          {item.img && <CardMedia className={classes.media} image={item.img} />}
        </Card>
        <br />
      </div>
    );
  } else if (edit) {
    return (
      <div key={item.id}>
        {/* Displays the content as editable */}
        <Card
          onMouseEnter={() => setShadow(true)}
          onMouseLeave={() => setShadow(false)}
          className={shadow ? classes.root : classes.hover}
        >
          <div className={classes.details}>
            <div className={classes.controlsOpen}>
              <UpdateItem
                itemData={{item}}
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
        {console.log(item.img)}

        <Card
          onMouseEnter={() => setShadow(true)}
          onMouseLeave={() => setShadow(false)}
          className={shadow ? classes.root : classes.hover}
        >
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <p>Item: {item.name}</p>
              <Typography style={{ wordWrap: "break-word" }}>
                Description: {item.description}
              </Typography>
              <br />
              {collection.keys.map((key) => {
                return (
                  <p key={key}>
                    {key}: {item.item[key]}
                  </p>
                );
              })}
            </CardContent>

            <div className={classes.controls}>
              {/* Enter/Update/Delete item Buttons */}
              <IconButton
                size="medium"
                color="primary"
                onClick={() => {
                  editItem(item.id, item.name);
                }}
              >
                <EditIcon />
              </IconButton>
              <span>{message}</span>
              {/* If user clicks on the delete room button a dialog box will pop up for confirmation */}
              <IconButton
                color="secondary"
                size="small"
                onClick={() => {
                  openDelete(item.id, item.name);
                }}
              >
                <DeleteIcon />
              </IconButton>
              <span id="createDialog">{showDialog}</span>
            </div>
          </div>
          {/* Displays Item Image */}
          {item.img && <CardMedia className={classes.media} image={item.img} />}
        </Card>
        <br />
      </div>
    );
  }
}

export default ItemCard;
