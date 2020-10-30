import React, { useState } from 'react';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

const App = () => {
    const [fishes, setFishes] = useState({});
    const [order, setOrder] = useState({});

    const addFish = fish => {
        // 1. Take a COPY of existing state
        //const fishes = {...fishes};
        // 2. Add a new fish to to fishes variable
        //fishes[`fish${Date.now()}`] = fish; // create a fish with a unique key
        //setFishes(fishes);

        setFishes({
            ...fishes,
            [`fish${Date.now()}`]: fish
        })
    }

    const loadSampleFishes = () => {
       setFishes(sampleFishes);
    }

    const addToOrder = (key) => {
        // const fishOrder = {...order};
        // // update the order or add 1
        // fishOrder[key] = fishOrder[key] + 1 || 1;
        // setOrder(fishOrder);
        setOrder({
            ...order,
            [key]: order[key] ? order[key] + 1 : 1
        })
    }
    //order.key // order.key
    //order[key] // order.fish1
    

    return (
        <div className="catch-of-the-day">
            <div className="menu">
                <Header tagline="Fresh Seafood Market" />
                <ul className="fishes">
                    { Object.keys(fishes).map(key => 
                        <Fish 
                            key={key} 
                            index={key}
                            details={fishes[key]} 
                            addToOrder={addToOrder}
                        />) 
                    }
                </ul>
            </div>
            <Order fishes={fishes} order={order} />
            <Inventory 
                addFish={addFish} 
                loadSampleFishes={loadSampleFishes} 
            />
        </div>
    );
};

export default App;