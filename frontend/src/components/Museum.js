import React, { useState } from 'react';
import CreateRoomForm from './CreateRoomForm';

function Museum() {

    const [createRoomForm,setCreateRoomForm] = useState(<input type="submit" id="createRoomFormButton" className="buttons" value="Create New Room" onClick={() => createNewRoomForm()}/>);

    const createNewRoomForm = () => {
        setCreateRoomForm(<CreateRoomForm />)
    };


    return (
        <div id="museumDiv">
            {/*<input type="submit" id="createRoomFormButton" className="buttons" value="Create New Room" onClick={() => createNewRoomForm()}/>*/}
            <br />
            <span id="createNewRoomFormResult" >{createRoomForm}</span>
            <input type="submit" id="loginButton" className="buttons" value="Login" onClick={()=>{window.location.href = '/'}}/>

        </div>
        
    )
}

export default Museum;