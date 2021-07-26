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
import { cardStyles, buttonStyles } from "../Styles.js";

function ItemCard({ item }) {
  const cardStyle = cardStyles();
  const buttonStyle = buttonStyles();

  const { collection } = useContext(CollectionContext);
  const { user } = useContext(UserContext);
  const { room } = useContext(RoomContext);

  // Initial States
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
          className={shadow ? cardStyle.root : cardStyle.hover}
        >
          <div className={cardStyle.details}>
            <CardContent className={cardStyle.content}>
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

            <div className={cardStyle.controls}>
              <span>{message}</span>
              <span id="createDialog">{showDialog}</span>
            </div>
          </div>
          {/* Displays Item Image */}
          {item.img && (
            <CardMedia className={cardStyle.media} image={item.img} />
          )}
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
          className={shadow ? cardStyle.root : cardStyle.hover}
        >
          <div className={cardStyle.details}>
            <div className={cardStyle.controlsOpen}>
              <UpdateItem
                itemData={{
                  itemId: item.id,
                  itemName: item.name,
                  itemDescription: item.description,
                }}
                handleClose={cancelClicked}
              />
              {cancelButton ? (
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  type="submit"
                  id="cancelButton"
                  className={buttonStyle.decline}
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
          className={shadow ? cardStyle.root : cardStyle.hover}
        >
          <div className={cardStyle.details}>
            <CardContent className={cardStyle.content}>
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

            <div className={cardStyle.controls}>
              {/* Enter/Update/Delete item Buttons */}
              <IconButton
                className={buttonStyle.accept}
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
                className={buttonStyle.decline}
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
          {item.img && (
            <CardMedia className={cardStyle.media} image={item.img} />
          )}
        </Card>
        <br />
      </div>
    );
  }
}

export default ItemCard;
