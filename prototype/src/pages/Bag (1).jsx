import React, {useState, useEffect, useContext} from "react";
import './bag.css';
import { AppContext } from "../App";
import ShopBagItem from "./ShopBagItem";

function Bag(){
    const { bag: items } = useContext(AppContext)
    const [ total, setTotal ] = useState(0);

    const handleTotalPayment = () => {
        let total = items
            .map(item => item.price * item.qty * (1 - item.discount))
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
            .toFixed(2);

        return total;
    };

    useEffect(() => {
        setTotal(handleTotalPayment());
    }, [items]);

    return (
        <div className="shoppingBag">
            <div className="container">
                <div className="row mb-2">
                    <h1>My Shopping Bag</h1>
                </div>
                {items.length===0 ? (<h2>Your bag is empty</h2>): 
                (
                    <>
                        <div className="row">
                            <div className="table-responsive">
                                <table className="shopBagTable table table-borderless align-middle">
                                    <thead>
                                        <tr>
                                            <th scope="col">No.</th>
                                            <th scope="col">Preview</th>
                                            <th scope="col">Product</th>
                                            <th scope="col">Size</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Qty</th>
                                            <th scope="col">Discount</th>
                                            <th scope="col">Payment</th>
                                            <th scope="col">Remove</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {items.map((item, index) => (
                                            <ShopBagItem index={index} key={item._id} item={item} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-between mt-5">
                            <div className="col-lg-2 align-items-center">
                                <p className="itemCount">Total Items: {items.length}</p>
                            </div>
                            <div className="col-lg-10 d-flex justify-content-end">
                                <div className="payment">
                                    Total: ${total}
                                    <a href="#">
                                        Check out <i className="bi bi-wallet-fill"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Bag;