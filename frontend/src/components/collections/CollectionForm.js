import React from 'react';
import Slide from '@material-ui/core/Slide';
import CollectionCard from './CollectionCard.js';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


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