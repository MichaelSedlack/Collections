import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    title: {
      fontSize: 14,
    },
  });

function Data({data}){
    const classes = useStyles();
    return(
        <div>
            <Card>
                {data.map((detail,room)=>{
                    return(
                        <div>
                            {/* Displays the content from the rooms array from /users/rooms */}
                            <Card>                            
                                <CardContent>
                                    <p key={room.id}>Room: {detail.name}</p>
                                    <p key={room.id}>Private: {detail.private.toString()}</p>
                                    <p key={room.id}>Collections: {detail.collections}</p>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={()=>{alert("Enter Room Button was clicked!")}}>Enter Room</Button>
                                </CardActions>
                            </Card>
                            <br />
                        </div>
                    );
                })}
            </Card>
        </div>
    );
}

export default Data;