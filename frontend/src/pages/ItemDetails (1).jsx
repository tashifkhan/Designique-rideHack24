import React, {useState, useEffect, useContext } from "react";
import { Link,useParams } from "react-router-dom";
import './itemDetails.css';
import { AppContext } from "../App";

function ItemDetails() {
    const {bag,setBag} = useContext(AppContext);
    const { id } = useParams();
    const index = parseInt(id) - 1;
    const [item, setItem] = useState({});

    const sizesList = [
        {
            id: 1,
            name: 'XS',
            active: false,
        },
        {
            id: 2,
            name: 'S',
            active: false,
        },
        {
            id: 3,
            name: 'M',
            active: true,
        },
        {
            id: 4,
            name: 'L',
            active: false,
        },
        {
            id: 5,
            name: 'XL',
            active: false,
        }, 
    ];

    const [sizes, setSizes] = useState(sizesList);

    const [qty, setQty] = useState(1);

    const [itemAdded, setItemAdded] = useState({ ...item, qty: 1, size: 'M' });

    const fetchData = () => {
        fetch('http://localhost:4000/items')
        .then(res=> res.json())
        .then(data=>{
            setItem(data[index]);
            setItemAdded({ ...data[index], qty: 1, size: 'M'});
        })
        .catch(e=>console.log(e.message));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSizeChange = id => {
        const newSizeList = sizes.map(size => {
            size.active = false;
            if (size.id === id) {
                size.active = true;
                setItemAdded({ ...itemAdded, size: size.name });
            }

            return size;
        });
        setSizes(newSizeList);
    };

    const increaseQty = () => {
        if(qty>99) {
            setQty(99);
            return;
        }
        setQty(qty+1);
        setItemAdded({...itemAdded, qty: qty + 1});
    };

    const decreaseQty = () => {
        if(qty<2) {
            setQty(1);
            return;
        }
        setQty( qty - 1 );
        setItemAdded({ ...itemAdded, qty: qty-1 });
    };

    const handleAddToBag = item => {
        if(bag.includes(item))  return;
        setBag([...bag, item]);
    }

    return(
        <div className="itemDetails">
            <div className="content">
                <div className="container-fluid">
                    <div className="row p-5">
                        <div className="col-lg-2">
                            <div className="row">
                                <div className="col">
                                    <div className="itemPreview"></div>
                                    <div className="itemPreview"></div>
                                    <div className="itemPreview"></div>
                                    <div className="itemPreview"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <img src={item.bgImg} className="img-fluid itemImg" alt="Tyagi" />
                        </div>
                        <div className="col-lg-5">
                            <h2>{item.title}</h2>
                            <div className="itemPrice">
                                <h4 className="price">
                                    Price: ${item.price && item.price.toLocaleString('en-US')}
                                </h4>
                                {
                                    item.discount !==0 && (
                                        <>
                                            <h4 className="discount">
                                                <i>{item.discount * 100}% OFF</i>
                                            </h4>
                                            <h4 className="currentPrice">
                                                Now: ${((1 - item.discount) * item.price).toFixed(2)}
                                            </h4>
                                        </>
                                    )
                                }
                            </div>
                            <h4>
                                    Details
                                </h4>
                                <p>{item.description}</p>
                                <h4>Size</h4>
                                <div className="size">
                                    {sizes.map(size => (
                                        <span
                                          key={size.id}
                                          onClick={() => handleSizeChange(size.id)}
                                          className={`sizeItem ${
                                            size.active ? 'active' : undefined
                                          }`}
                                        >
                                            {size.name}
                                        </span>
                                    ))}
                                </div>
                                <h4>Quantity</h4>
                                <div className="quantity">
                                    <a href="#" className="qtyButton" onClick={decreaseQty}>
                                        <i className="bi bi-dash"></i>
                                    </a>
                                    <span className="qty">{qty}</span>
                                    <a href="#" className="qtyButton" onClick={increaseQty}>
                                        <i className="bi bi-plus"></i>
                                    </a>
                                </div>
                                <a 
                                    href="#"
                                    className="addButton me-3"
                                    onClick={() => handleAddToBag(itemAdded)}
                                >
                                    Add to Bag
                                </a>
                                <Link to='/shop' className="addButton">
                                    Keep Browsing
                                </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}

export default ItemDetails;