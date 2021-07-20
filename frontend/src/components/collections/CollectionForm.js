import React from 'react';
import CollectionCard from './CollectionCard.js';

function CollectionForm({collections}){
  if(collections.length === 0){
    return (
      <div>
        <p>No collections found.</p>
      </div>
    )
  }

  return (
    <div>
      {collections.map(collection => {
        return(
          <div key={collection.id}>
            <CollectionCard collection={collection}/>
          </div>
        )
      })}
    </div>
  )
}

export default CollectionForm;