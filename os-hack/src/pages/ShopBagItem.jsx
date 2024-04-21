import React, { useContext } from "react";
import './shopBagItem.css'
import { AppContext } from "../App";

function ShopBagItem({ item, index }) {
    const { bag, setBag } = useContext(AppContext);

    const handleRemoveFromBag = prod => {
        setBag(bag.filter(item => item._id != prod._id));
    };

    return (
        <tr className="shopBagItem">
            <th scope="row">{index + 1}</th>
            <td>
                <img src={item.bgImg} alt="" className="img-fluid" />
            </td>
            <td>{item.title}</td>
            <td>{item.size}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>{item.qty}</td>
            <td>{item.discount * 100}%</td>
            <td>${(item.price * item.qty * (1 - item.discount)).toFixed(2)}</td>
            <td>
                <a href="#" onClick={() => handleRemoveFromBag(item)}>
                    <i className="bi bi-trash"></i>
                </a>
            </td>
        </tr>
    );
}

export default ShopBagItem;