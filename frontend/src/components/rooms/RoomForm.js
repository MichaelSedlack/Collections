import React from 'react';
import RoomCard from './RoomCard.js';

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