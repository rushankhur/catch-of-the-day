import React from "react";
import PropTypes from "prop-types";

import { formatPrice } from "../helpers";

const Fish = ({ details, index, addToOrder }) => {
  const { name, image, desc, price, status } = details;

  const isAvailable = status === "available"; // true or false

  return (
    <li className="menu-fish">
      <img src={image} alt={name} />
      <h3 className="fish-name">
        {name}
        <span className="price">{formatPrice(price)}</span>
      </h3>
      <p>{desc}</p>
      <button disabled={!isAvailable} onClick={() => addToOrder(index)}>
        {isAvailable ? "Add To Order" : "Sold out!"}
      </button>
    </li>
  );
};

Fish.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.string
  }),
  addToOrder: PropTypes.func
};

export default Fish;
