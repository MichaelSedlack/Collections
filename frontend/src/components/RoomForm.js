import React from 'react';
import Slide from '@material-ui/core/Slide';
import RoomCard from './RoomCard.js';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function RoomForm({data}){
  return (
    <div>
      {data.map(room => {
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