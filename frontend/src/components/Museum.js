import React, { useEffect, useState } from 'react';
import CreateRoomForm from './CreateRoomForm';

function Museum() {

    const [createRoomForm,setCreateRoomForm] = useState(<div><input type="submit" id="createRoomFormButton" className="buttons" value="Create New Room" onClick={() => createNewRoomForm()}/><br /></div>);
    const [cancelButton, setCancelButton] = useState(false);


    const createNewRoomForm = () => {
        setCancelButton(true)  
        setCreateRoomForm(<CreateRoomForm />)
        
    };

    function cancelClicked() {
        setCancelButton(false)
        {window.location.href = '/museum'}
    };



    return (
        <div id="museumDiv">
            <br />
            <span id="createNewRoomFormResult" >{createRoomForm}</span>
            {cancelButton ? <input type="submit" id="cancelButton" className="buttons" value="Cancel" onClick={()=>{cancelClicked()}}/> : null}
            <br />
            <input type="submit" id="loginButton" className="buttons" value="Sign Out" onClick={()=>{window.location.href = '/'}}/> <br />
        </div>
        
    )
}

export default Museum;