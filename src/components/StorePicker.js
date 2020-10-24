import React, { useState } from 'react';
import { getFunName } from '../helpers';

const StorePicker = props => {
    const [storeName, setStoreName] = useState('');
    
    const goToStore = (event) => {
        event.preventDefault();
        props.history.push(`/store/${storeName}`);
    }
    
    return (
        <form action="" className="store-selector" onSubmit={goToStore}>
            <h2>Please Enter A Store</h2>
            <input 
                type="text" 
                required 
                placeholder="Store Name" 
                value={storeName} 
                onChange={e => setStoreName(e.target.value)} 
                defaultValue={getFunName()} 
            />
            <button type="submit">Visit Store</button>
        </form>
    );
};

export default StorePicker;