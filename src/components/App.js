import React, { useState, useEffect, useRef } from 'react';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

const App = props => {
    const [fishes, setFishes] = useState({});
    const [order, setOrder] = useState({});
    const { storeId } = props.match.params;

    useEffect(() => {
        // reistate local storage with orders
        const localStorageRef = localStorage.getItem(storeId);
        if(localStorageRef) {
            setOrder(JSON.parse(localStorageRef)); // convert string to an object
        }

        const ref = base.syncState(`${storeId}/fishes`, {
            context: {
              setState: ({ fishes }) => setFishes({ ...fishes }),
              state: { fishes },
            },
            state: 'fishes'
          })
      
        // cleanup
        return () => {
            base.removeBinding(ref);
        }
    }, []);

  
    // instead of componentDidUpdate
    const didMountRef = useRef(false);
    useEffect(() => {
        if (didMountRef.current) {
            localStorage.setItem(storeId, JSON.stringify(order))  // convert object to string
        } else {
            didMountRef.current = true // change the state to true on the first render
        }  
    });


    const addFish = fish => {
        // add a new fish to to fishes variable
        setFishes({
            ...fishes,
            [`fish${Date.now()}`]: fish
        })
    }

    const updateFish = (key, updatedFish) => {
        // Update fish using Inventory fields 
        const updatedFishes = {
            ...fishes, 
            [key]: updatedFish 
        };
        setFishes(updatedFishes);
        base.post(`${storeId}/fishes`, {
          data: updatedFishes
        });
    }

    const deleteFish = key => {
        const updatedFishes = {
            ...fishes,
            [key]: null
        }
        setFishes(updatedFishes);
        base.post(`${storeId}/fishes`, {
            data: updatedFishes
          });
    }

    const loadSampleFishes = () => {
       setFishes({
            ...fishes,
            sampleFishes
       });
       base.post(`${storeId}/fishes`, {
            data: { ...fishes, ...sampleFishes }
      });
    }

    const addToOrder = key => {
        // update the order or add 1
        setOrder({
            ...order,
            [key]: order[key] ? order[key] + 1 : 1
        })
    }

    const removeFromOrder = key => {
        const orders = {...order};
        delete orders[key]
        setOrder(orders);
    }

    
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
            <Order 
                fishes={fishes} 
                order={order}
                removeFromOrder={removeFromOrder} 
            />
            <Inventory 
                addFish={addFish} 
                updateFish={updateFish}
                deleteFish={deleteFish}
                loadSampleFishes={loadSampleFishes} 
                fishes={fishes}
            />
        </div>
    );
};

export default App;