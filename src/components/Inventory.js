import React from "react";

import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";

const Inventory = ({
  addFish,
  loadSampleFishes,
  fishes,
  updateFish,
  deleteFish,
}) => {
  return (
    <div className="inventory">
      <h2>Inventory</h2>
      {Object.keys(fishes).map((key) => (
        <EditFishForm
          key={key}
          index={key}
          fish={fishes[key]}
          updateFish={updateFish}
          deleteFish={deleteFish}
        />
      ))}
      <AddFishForm addFish={addFish} />
      <button onClick={loadSampleFishes}>Load Sample Fishes</button>
    </div>
  );
};

export default Inventory;
