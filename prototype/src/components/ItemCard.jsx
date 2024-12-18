import React, { useContext } from "react";
import './itemCard.css';
import { AppContext } from "../App";
import { Link } from "react-router-dom";

function ItemCard({ item }) {
        const { collection, setCollection } = useContext(AppContext);

        const handleAddToCollection = prod => {
            setCollection([...collection, prod]);
        };
    
        const handleRemoveFromCollection = prod => {
            setCollection(collection.filter(item => item._id !== prod._id));
        };

    return (
        <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="itemCard">
                <img src={item.bgImg} alt={item.title} className="img-fluid" />
                <Link
                    className={`like ${collection.includes(item) ? 'active' : undefined}`}
                    onClick={
                        collection.includes(item)
                        ? () => handleRemoveFromCollection(item)
                        : () => handleAddToCollection(item)
                    }
                >
                    <i className="bi bi-bookmark-fill"></i>
                </Link>
                <div className="itemFeature">
                    <span className="itemType">{item.category}</span>
                    <span className="itemPromotion">{item.promotion}</span>
                </div>
                <h4 className="itemTitle mt-4 mb-3">{item.title}</h4>
                <div className="itemPrice">
                    {item.discount !== 0 && (
                        <>
                            <span className="discount">
                                <i>{ item.discount * 100 }%</i>
                            </span>
                            <span className="prevPrice">${item.price.toFixed(2)}</span>
                        </>
                    )}
                    <span className="currentPrice">
                        ${((1 - item.discount) * item.price).toFixed(2)}
                    </span>
                </div>
                <Link className="addBag" to={`/items/${item._id}`}>
                    <i className="bi bi-bag-plus-fill"></i>
                </Link>
            </div> 
        </div>
    )
}

export default ItemCard;