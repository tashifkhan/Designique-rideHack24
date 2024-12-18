import React, { useContext } from 'react';
import './collection.css';
import { AppContext } from '../App';
import ItemCard from '../components/ItemCard';

function Collection() {

    const {collection: items} = useContext(AppContext);
    return(
        <div className='collection'>
            <div className="container">
                <div className="row mb-3">
                    <h1>My Collection</h1>
                </div>
                <div className="row">
                    {items.length === 0 ? (
                        <h2>You have no collections</h2>
                    ): (
                        items.map(item => <ItemCard key={item._id} item={item} />)
                    )}
                </div>
            </div>
        </div>
    ) 
}

export default Collection;