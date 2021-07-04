import React, { useEffect, useState } from 'react';
import CreateRoomForm from './CreateRoomForm';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


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
                <Grid container spacing={3}>
                    <Grid item xs={12}/>
                    <Grid item xs={7} >
                        <TextField id="outlined-basic" label="Search Rooms" variant="outlined" />
                        <Button variant="contained" size="large" color="primary" type="submit" id="searchButton" className="buttons" value="Search" onClick={()=>{alert("search button clicked!")}}>Search Rooms</Button>
                    </Grid>
                    <Grid item xs={5}>
                        <Button variant="contained" size="large" color="secondary" type="submit" id="loginButton" className="buttons" value="Sign Out" onClick={()=>{window.location.href = '/'}}>Sign Out</Button> <br />
                    </Grid>
                    <Grid item xs={12}/>
                    <Grid item xs={7}>
                        <h1>Search Results Here</h1>
                        <h1>Search Results Here</h1>
                        <h1>Search Results Here</h1>
                        <h1>Search Results Here</h1>
                        <h1>Search Results Here</h1>
                        <h1>Search Results Here</h1>
                        <h1>Search Results Here</h1>
                        <h1>Search Results Here</h1>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                        <span id="createNewRoomFormResult" >{createRoomForm}</span><br />
                        {cancelButton ? <Button variant="contained" size="large" color="secondary" type="submit" id="cancelButton" className="buttons" value="Cancel" onClick={()=>{cancelClicked()}}>Cancel</Button> : null}
                    </Grid>
                </Grid>
            </div>
        )
    }
    else{
        return(
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12} />
                    <Grid item xs={7} >
                        <TextField id="outlined-basic" label="Search Rooms" variant="outlined" />
                        <Button variant="contained" size="large" color="primary" type="submit" id="searchButton" className="buttons" value="Search" onClick={()=>{alert("search button clicked!")}}>Search Rooms</Button>
                    </Grid>
                    <Grid item xs={5}>
                        <Button variant="contained" size="large" color="secondary" type="submit" id="loginButton" className="buttons" value="Sign Out" onClick={()=>{window.location.href = '/'}}>Sign Out</Button> <br />
                    </Grid>
                    <Grid item xs={12}/>
                    <Grid item xs={7}>
                        <h1>Search Results Here</h1>
                        <h1>Search Results Here</h1>
                        <h1>Search Results Here</h1>
                        <h1>Search Results Here</h1>
                        <h1>Search Results Here</h1>
                        <h1>Search Results Here</h1>
                        <h1>Search Results Here</h1>
                        <h1>Search Results Here</h1>
                    </Grid>
                    <Grid item xs={5}>
                        <Button variant="contained" size="large" color="primary" type="submit" id="createRoomFormButton" className="buttons" value="Create New Room" onClick={() => createNewRoomForm()}>Create New Room</Button><br />
                    </Grid>
                </Grid>  
            </div>
        )
    }
}

export default Museum;