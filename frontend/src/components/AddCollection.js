import React, {useState, useEffect} from 'react';

const AddCollection = () => {
  const [keys, setKeys] = useState(['', '']);

  const handleChange = (idx, event) => {
    console.log(event.target.value);

    const newKeys = [...keys];
    newKeys[idx] = event.target.value;

    setKeys(newKeys);
  }
  
  const addField = () => {
    setKeys([...keys, '']);
  }

  const removeField = (index) => {
    const values = [...keys];
    values.splice(index, 1);

    setKeys(values);
  }

  return(
    <div>
      {
        keys.map((key, index) => (
          <div key={index}>
            <input type="text" value={key} onChange={event => handleChange(index, event)}/>
            <button onClick={() => removeField(index)}>Remove Field</button>
          </div>
        ))
      }
      <button onClick={() => addField()}>Add attribute</button>
    </div>
  )
}

export default AddCollection;