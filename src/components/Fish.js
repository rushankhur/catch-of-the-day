import React from 'react';

import { formatPrice } from '../helpers';

const Fish = ({ details, index, addToOrder }) => {
    const { name, image, desc, price, status } = details;

    const isAvailable = status === 'available'; // true or false

    return (
        <li className="menu-fish">
            <img src={image} alt={name} />
            <h3 className="fish-name">{name}
            <span className="price">{formatPrice(price)}</span>
            </h3>
            <p>{desc}</p>
            <button disabled={!isAvailable} onClick={() => addToOrder(index)}>
                {isAvailable ? 'Add To Order' : 'Sold out!'}
            </button>
        </li>
    );
}

export default Fish;