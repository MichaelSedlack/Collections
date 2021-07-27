import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import PublishIcon from "@material-ui/icons/Publish";
import { UserContext, RoomContext, CollectionContext } from "./../UserContext";
import { ApiContext } from "./../ApiContext";

function CreateItemForm({ keys }) {
  const { doCreate } = useContext(ApiContext);
  const { user } = useContext(UserContext);
  const { room } = useContext(RoomContext);
  const { collection } = useContext(CollectionContext);

  // Initial States
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemKeys, setItemKeys] = useState({});
  const [image, setImage] = useState();
  const [itemDescription, setItemDescription] = useState("");
  const [photoMessage, setPhotoMessage] = useState("");

  const createItem = async (event) => {
    event.preventDefault();

    var item = {
      name: itemName,
      description: itemDescription,
      item: itemKeys,
      roomID: room.id,
      collectionID: collection.id,
    };

    const formData = new FormData();
    formData.append("image", image);
    formData.append("item", JSON.stringify(item));

    const res = doCreate(formData);

    if (res.error) {
      setError(true);
      setMessage(res.error);
      return;
    }

    setMessage("Successfully created item!");
    setTimeout(() => {
      setMessage("");
      setItemName("");
      setItemDescription("");
      setPhotoMessage("");
      setItemKeys({});
      setOpen(false);
    }, 500);
  };

  const handleNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleObjectChange = (e, key) => {
    let obj = itemKeys;
    obj[key] = e.target.value;

    setItemKeys(obj);
  };

  const handlePhoto = (e) => {
    setImage(e.target.files[0]);
    setPhotoMessage(`image uploaded`);
  };

  const handelDescriptionChange = (e) => {
    setItemDescription(e.target.value);
  };

  if (user.id !== room.uid) {
    return (
      <div>
        <br />
      </div>
    );
  } else if (open) {
    return (
      <div>
        <span id="inner-title">Create New Item</span>
        <br />
        <TextField
          margin="dense"
          variant="outlined"
          type="text"
          id="itemName"
          label="Item Name"
          value={itemName}
          onChange={(e) => handleNameChange(e)}
        />
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="raised-button-file"
          type="file"
          onChange={(e) => handlePhoto(e)}
        />
        <label htmlFor="raised-button-file">
          <IconButton variant="outlined" size="large" component="span">
            <PhotoCamera color="primary" />
          </IconButton>
        </label>
        <span style={{ color: "green" }}>{photoMessage}</span>
        <br />
        <br />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          variant="outlined"
          onChange={(e) => handelDescriptionChange(e)}
        />
        <br />
        <br />
        <p>Required Item Properties</p>
        {collection.keys.map((key) => {
          return (
            <div>
              <TextField
                margin="dense"
                variant="outlined"
                type="text"
                label={key}
                value={itemKeys[key]}
                onChange={(e) => handleObjectChange(e, key)}
              />
              <br />
            </div>
          );
        })}
        <br />
        <Button
          startIcon={<PublishIcon />}
          variant="contained"
          size="large"
          color="primary"
          type="submit"
          id="CreateItemButton"
          value="Store New Item"
          onClick={createItem}
        >
          Store New Item
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          startIcon={<ExpandLessIcon />}
          variant="contained"
          size="large"
          color="secondary"
          type="submit"
          id="cancelButton"
          value="Cancel"
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <br />
        <span id="CreateItemResult">{message}</span>
      </div>
    );
  } else if (error) {
    return <h1>{message}</h1>;
  } else {
    return (
      <div>
        <Button
          startIcon={<ExpandMoreIcon />}
          variant="contained"
          size="large"
          color="primary"
          type="submit"
          id="CreateItemFormButton"
          value="Create New Item"
          onClick={() => setOpen(true)}
        >
          Create New Item
        </Button>
        <br />
      </div>
    );
  }
}

export default CreateItemForm;
