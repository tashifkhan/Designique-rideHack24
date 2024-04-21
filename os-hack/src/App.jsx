// import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// import Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css';
// import react-router
import { Routes, Route } from 'react-router-dom';

import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import ItemDetails from './pages/ItemDetails';
import Bag from './pages/Bag';
import Collection from './pages/Collection';
import Designers from './pages/Designers';
import Manufacture from './pages/Manufacture';
import LoginSignup from'./pages/LoginSignup';
import Land from './pages/Land';
export const AppContext = React.createContext();

function App() {

  const [items, setItems] = useState([]);
  const [bag, setBag] = useState([]);
  const [collection, setCollection] = useState([]);

  const fetchData = () =>{
    fetch('http://localhost:4000/items')
    .then(res=>res.json())
    .then(data => {
      setItems(data);
    })
    .catch(e=>console.log(e.message));
  };

  useEffect(()=>{
    fetchData();
  }, []);

  return (
    <>
      <AppContext.Provider value={{items,setItems,bag,setBag,collection,setCollection}}>
        <Header />
        <Routes>
          
          <Route exact path="/designers" element={ <Designers />}/>
          <Route exact path="/LoginSignup" element={<LoginSignup/>}/>
          <Route exact path="/manufacture" element={<Manufacture />}/>
          <Route exact path="/shop" element={<Home />}/>
          <Route exact path="/shop/items/:id" element={<ItemDetails />} />
          <Route exact path='/shop/bag' element={<Bag />}/>
          <Route exact path='/shop/collection' element={<Collection/>}/>
          <Route exact path='/' element={<Land />}/>
        </Routes>
      </AppContext.Provider>
    </>
  )
}

export default App
