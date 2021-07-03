import React, { useEffect, useState } from 'react';
import CreateRoomForm from './CreateRoomForm';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function Museum() {

    const [createRoomForm,setCreateRoomForm] = useState();
    const [cancelButton, setCancelButton] = useState(false);


    const createNewRoomForm = () => {
        setCancelButton(true)  
        setCreateRoomForm(<CreateRoomForm />)
        
    };

    function cancelClicked() {
        setCancelButton(false)
        // {window.location.href = '/museum'}
    };

    if(cancelButton){
        return(
            <div id="museumDiv">
            <br />
            <span id="createNewRoomFormResult" >{createRoomForm}</span>
            {cancelButton ? <Button variant="contained" size="large" color="secondary" type="submit" id="cancelButton" className="buttons" value="Cancel" onClick={()=>{cancelClicked()}}>Cancel</Button> : null}
            <br />
            <Button variant="contained" size="large" color="primary" type="submit" id="loginButton" className="buttons" value="Sign Out" onClick={()=>{window.location.href = '/'}}>Sign Out</Button> <br />
        </div>
        )
    }
    else{
        return(
            <div>
                <Button variant="contained" size="large" color="primary" type="submit" id="createRoomFormButton" className="buttons" value="Create New Room" onClick={() => createNewRoomForm()}>Create New Room</Button><br />
                <Button variant="contained" size="large" color="secondary" type="submit" id="loginButton" className="buttons" value="Sign Out" onClick={()=>{window.location.href = '/'}}>Sign Out</Button> <br />
            </div>
        )
    }

}

export default Museum;