import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import UpdateItem from './UpdateItem';
import DeleteItem from './DeleteItem';

function ItemCard({item}){
  // Initial States

  const [message, setMessage]=  useState("");
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [cancelButton, setCancelButton] = useState(false);
  const [showDialog, setShowDialog] = useState();

  const editItem = (itemId, itemName) => {
    setCancelButton(true);
    setEdit(true);
  }

  const closeDelete = () => {
    setOpen(false);
    setShowDialog("");
  }

  const openDelete = (id,name) => {
      setOpen(true);
      setShowDialog(<DeleteItem itemData={{id,name}} closeDelete={()=> closeDelete()}/>)
  }

  // Used to hide the Create New Item Form
  function cancelClicked() {
    setCancelButton(false);
    setEdit(false);
  }


    if(edit){
      return (
        <div key={item.id}>
          {/* Displays the content as editable */}
          <Card >                            
            <CardContent>
                <UpdateItem itemData={{itemId: item.id, itemName: item.name, itemDescription:item.description}} handleClose={cancelClicked}/>
                {cancelButton ? <Button variant="contained" size="large" color="secondary" type="submit" id="cancelButton" className="buttons" value="Cancel" onClick={()=>{cancelClicked()}}>Cancel</Button> : null}
              </CardContent>
          </Card>
          <br />
        </div>

      )
    }else{
      return(
        <div>
          <Card >                            
            <CardContent>
            <div>
              <p>Item: {item.name}</p>
              <p>Description: {item.description}</p>
            </div>
              </CardContent>
              <CardActions>
                {/* Enter/Update/Delete item Buttons */}
                <IconButton size="medium" color="primary" onClick={()=>{editItem(item.id,item.name)}}><EditIcon/></IconButton>
                <span>{message}</span>
                {/* If user clicks on the delete room button a dialog box will pop up for confirmation */}
                <IconButton color="secondary" size ="small" onClick={()=>{openDelete(item.id,item.name)}}><DeleteIcon/></IconButton>
                <span id="createDialog">{showDialog}</span>
              </CardActions>
          </Card>
          <br />
        </div>
      )
    }
}

export default ItemCard;