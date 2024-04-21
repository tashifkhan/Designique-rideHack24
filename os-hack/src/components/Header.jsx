import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import './header.css';

import NavListData from "../data/NavListData";
import NavListItem from "./NavListItem";
import { AppContext } from "../App";

function Header() {
    const {collection, bag} = useContext(AppContext)
    const [navList, setNavList] = useState(NavListData);

    return (
        <header>
           <Link to="/" className="logo"> 
                Designique 
            </Link>

            <Link to="/LoginSignup" className="logos"> 
                SignUp
            </Link>
            {/* <ul className="nav">
                <a href="/">
                {
                    navList.map(nav=>(
                        <NavListItem key={nav._id} nav={nav} />
                    ))
                }
                </a>
            </ul> */}


            <div className="userItems">
                <Link to="/shop/collection" className="icon">
                    <i className="bi bi-heart-fill"></i>
                    <span className="like">{collection.length}</span>
                </Link>
                <Link to="/shop/bag" className="icon">
                    <i className="bi bi-bag-fill"></i>
                    <span className="bag">{bag.length}</span>
                </Link>
            </div>
        </header>
    )
}

export default Header;