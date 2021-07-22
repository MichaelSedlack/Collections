import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import IconButton from '@material-ui/core/IconButton';
import UpdateCollection from './UpdateCollection';
import DeleteCollection from './DeleteCollection';
import { CollectionContext } from './../UserContext';
import { makeStyles } from '@material-ui/core';


const useStyles= makeStyles(({spacing}) => ({
  root: {
    width: "75%",
    display: 'flex',
    transition: '.5s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    paddingBottom: spacing(2),
    paddingTop: spacing(2),
    
  },
  hover: {
    width: "75%",
    display: 'flex',
    transition: '0.3s',
    boxShadow: '1px 1px 2px 2px rgba(34, 35, 58, 0.2)',
    paddingBottom: spacing(2),
    paddingTop: spacing(2),
    
  },

  details: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
  },

  content: {
    flex: '1 0 auto',
  },

  controls: {
    display: 'flex',
    alignItems:'center',
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
  },

  controlsOpen: {
    display: 'flex',
    alignItems:'flex-end',
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
  },
}));


function CollectionCard({collection}){
  // Initial States
  const history = useHistory();
  const context = useContext(CollectionContext);
  const classes = useStyles();

  const [message, setMessage]=  useState("");
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [cancelButton, setCancelButton] = useState(false);
  const [showDialog, setShowDialog] = useState();
  const [shadow, setShadow] = useState(false);

  const editCollection = (collectionId, collectionName) => {
    setCancelButton(true);
    setEdit(true);
  }

  const closeDelete = () => {
    setOpen(false);
    setShowDialog("");
  }

  const openDelete = (id,name) => {
      setOpen(true);
      setShowDialog(<DeleteCollection collectionData={{id,name}} closeDelete={()=> closeDelete()}/>)
  }

  // Used to hide the Create New Collection Form
  function cancelClicked() {
    setCancelButton(false);
    setEdit(false);
  }

  const enterCollection = (collectionId, collectionName) => {
    context.setCollection(collection);
    history.push("/items")
  }

    if(edit){
      return (
        <div key={collection.id}>
          {/* Displays the content as editable */}
          <Card onMouseEnter={() => setShadow(true)} onMouseLeave={() => setShadow(false)} className={shadow ? classes.root : classes.hover}>
            <div className={classes.details}>                            
              <div className={classes.controlsOpen}>
                  <UpdateCollection collectionData={{collectionId: collection.id, collectionName: collection.name}} handleClose={cancelClicked}/>
                  {cancelButton ? <Button variant="contained" size="large" color="secondary" type="submit" id="cancelButton" value="Cancel" onClick={()=>{cancelClicked()}}>Cancel</Button> : null}
              </div>
            </div>
          </Card>
          <br />
        </div>

      )
    }else{
      return(
        <div>
          <Card onMouseEnter={() => setShadow(true)} onMouseLeave={() => setShadow(false)} className={shadow ? classes.root : classes.hover}>
            <div className={classes.details}>   
              <CardContent className={classes.content}>                         
                <div>
                  <p>{collection.name} Collection</p>
                  <p>{collection.private ? "Private - No one can view this collection" : "Public - Anyone can view this collection"}</p>
                  <p>{collection.items.length} Items Stored</p>
                </div>
              </CardContent>
              <div className={classes.controls}>
                {/* Enter/Update/Delete collection Buttons */}
                <IconButton size="medium" color="primary" onClick={()=>{enterCollection(collection.id,collection.name)}}><MeetingRoomIcon/></IconButton>
                <IconButton size="medium" color="primary" onClick={()=>{editCollection(collection.id,collection.name)}}><EditIcon/></IconButton>
                {/* <IconButton size="small" color="secondary" onClick={doDelete(collection.id,collection.name)}><DeleteIcon/></IconButton> */}
                <span>{message}</span>
                {/* If user clicks on the delete room button a dialog box will pop up for confirmation */}
                <IconButton color="secondary" size ="small" onClick={()=>{openDelete(collection.id,collection.name)}}><DeleteIcon/></IconButton>
                <span id="createDialog">{showDialog}</span>
              </div>
            </div>
          </Card>
          <br />
        </div>
      )
    }
}

export default CollectionCard;