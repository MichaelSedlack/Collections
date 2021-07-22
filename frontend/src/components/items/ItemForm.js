import React from 'react';
import ItemCard from './ItemCard.js';

function ItemForm({items}){
  if(items.length === 0){
    return (
      <div>
        <p>No Items found.</p>
      </div>
    )
  }

  return (
    <div>
      {items.map(item => {
        return(
          <div key={item.id}>
            <ItemCard item={item}/>
          </div>
        )
      })}
    </div>
  )
}

export default ItemForm;