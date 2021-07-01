import React, { useState } from 'react';
import CreateRoomForm from './CreateRoomForm';

function Museum() {

    const [createRoomForm,setCreateRoomForm] = useState(<div><input type="submit" id="createRoomFormButton" className="buttons" value="Create New Room" onClick={() => createNewRoomForm()}/><br /></div>);

    const createNewRoomForm = () => {
        setCreateRoomForm(<CreateRoomForm />)
    };


    return (
        <div id="museumDiv">
            {/*<input type="submit" id="createRoomFormButton" className="buttons" value="Create New Room" onClick={() => createNewRoomForm()}/>*/}
            <br />
            <span id="createNewRoomFormResult" >{createRoomForm}</span>
            
            <input type="submit" id="cancelButton" className="buttons" value="Cancel" onClick={()=>{setCreateRoomForm(<input type="submit" id="createRoomFormButton" className="buttons" value="Create New Room" onClick={() => createNewRoomForm()}/>)}} />
            <br />
            <input type="submit" id="loginButton" className="buttons" value="Sign Out" onClick={()=>{window.location.href = '/'}}/> <br />
        </div>
        
    )
}

export default Museum;