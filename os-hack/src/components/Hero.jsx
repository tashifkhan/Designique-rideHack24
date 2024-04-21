import React, {useContext} from "react";
import './hero.css';
import { AppContext } from "../App";
import HeroSwiper from "./HeroSwiper";
import { Link } from "react-router-dom";
// import Back from "../pages/back";

function Hero() {

    const { items,setItems,collection, setCollection } = useContext(AppContext);

    const handleSlideChange= id=>{
        const newItems = items.map(item=>{
            item.active = false;
            if(item._id===id){
                item.active = true;
            }
            return item;
        });
        setItems(newItems);
    };

    const handleAddToCollection = prod => {
        setCollection([...collection, prod]);
    };

    const handleRemoveFromCollection = prod => {
        setCollection(collection.filter(item => item._id !== prod._id));
    };

    return(<>
     
        <div className="banner">
            
            {
              
                items && items.length >0 && items.map(item=>(
                    <div className="item" key={item._id}>
                    <img src={item.bgImg} alt="" className={`bgImg ${item.active ? "active": undefined}`} />
                    <div className={`content ${item.active ? "active": undefined}`}>    
                        <p>
                            {item.subtitle}
                        </p>
                        <h1>
                            {item.title}
                        </h1>
                        <Link to={`/shop/items/${item._id}`} className="mainButton">
                            Shop Now <i className="bi bi-cart2"></i>
                        </Link>
                        <Link
                            className={`markButton ${
                                collection.includes(item) ? 'active' : undefined
                            }`}
                            onClick={
                                collection.includes(item)
                                ? () => handleRemoveFromCollection(item)
                                : () => handleAddToCollection(item)
                            }
                        >
                            <i className="bi bi-bookmark-plus-fill"></i>
                        </Link>
                    </div>
                    <div className="subtitle"><span className="slogan">The Collections</span></div>
                    <div className="subtitle">
                        <span className={`number ${item.active ? "active": undefined}`}>{item._id}</span>
                    </div>
                </div>
                ))
            }

            {items && items.length>0 && (<HeroSwiper slides={items} slideChange={handleSlideChange} />)}
        </div>
        </>
    )
}

export default Hero