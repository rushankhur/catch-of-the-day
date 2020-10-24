import React, { useState } from 'react';

const AddFishForm = ({ addFish }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('available');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState('');

    const createFish = e => {
        e.preventDefault();
        const fish = {
            name,
            price: parseFloat(price),
            status,
            desc,
            image
        }
        addFish(fish); // method from App component
        
        // clear/reset the form
        setName('');
        setPrice('');
        setStatus('available');
        setDesc('');
        setImage('');
    }

    return (
        <form className="fish-edit" onSubmit={createFish}>
            <input name="name" type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input name="price" type="text" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
            <select name="status" value={status} onChange={e => setStatus(e.target.value)} >
                <option value="available">Fresh!</option>
                <option value="unavailable">Sold Out!</option>
            </select>
            <textarea name="desc" placeholder="Desc" value={desc} onChange={e => setDesc(e.target.value)}></textarea>
            <input name="image" type="text" placeholder="Image" value={image} onChange={e => setImage(e.target.value)}/>
            <button type="submit">+ Add Fish</button>
        </form>
    );
}

export default AddFishForm;