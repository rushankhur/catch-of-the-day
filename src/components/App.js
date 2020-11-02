import React, { useState, useEffect, useRef } from 'react';

import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import { firebase } from '../firebase';

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

        // Grab reference to the specific store name and sync the data.
        firebase.database().ref(`${storeId}/fishes`).on('value', snapshot => {
            if (snapshot.val())
                setFishes(snapshot.val());
        });
    }, []);

    useEffect(() => {
        firebase.database().ref(`${storeId}/fishes`).update(fishes)
    }, [fishes])

    // instead of componentDidUpdate
    const didMountRef = useRef(false);
    useEffect(() => {
        if (didMountRef.current) {
            localStorage.setItem(storeId, JSON.stringify(order))  // convert object to string
        } else didMountRef.current = true  // change the state to true on the first render
    });

    const addFish = fish => {
        // add a new fish to to fishes variable
        setFishes({
            ...fishes,
            [`fish${Date.now()}`]: fish
        })
    }

    const loadSampleFishes = () => {
       setFishes(sampleFishes);
    }

    const addToOrder = (key) => {
        // update the order or add 1
        setOrder({
            ...order,
            [key]: order[key] ? order[key] + 1 : 1
        })
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
            <Order fishes={fishes} order={order} />
            <Inventory 
                addFish={addFish} 
                loadSampleFishes={loadSampleFishes} 
            />
        </div>
    );
};

export default App;