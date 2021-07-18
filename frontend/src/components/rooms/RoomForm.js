import React from 'react';
import Slide from '@material-ui/core/Slide';
import RoomCard from './RoomCard.js';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function RoomForm({rooms}){
  if(rooms.length === 0){
    return (
      <div>
        <p>No rooms found.</p>
      </div>
    )
  }
  
  return (
    <div>
      {rooms.map(room => {
        return(
          <div key={room.id}>
            <RoomCard room={room}/>
          </div>
        )
      })}
    </div>
  )
}

export default RoomForm;