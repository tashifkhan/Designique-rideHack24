import React, { useState } from "react";
import "./Manufactures.css"
import  tyagi from './images/tyagi.jpg';
import  angel from './images/angel.png';
import  adhiraj from './images/adhiraj.jpg';
function Manufacture() {
    let message = `Tceuuc fuvyuyu yutyuvyuthuvgtuvuiurvtre`;

    const [searchQuery, setSearchQuery] = useState("");

   
    const handleSearch = (value) => {
        setSearchQuery(value);
       
        console.log("Search query:", value);
    };

    return (
        <div className="bg-black mx-auto flex flex-wrap justify-center items-center h-full">
            <div className="fixed top-0 left-0 w-full z-50 bg-black">
            <div className="flex items-center border rounded-xl shadow-md p-2">
                <input
                    type="text"
                    placeholder="Search..."
                    className="flex-grow px-4 py-1  rounded-md  border-r-2 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <button className="px-4 py-1 bg-yellow-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
                    Search
                </button>
            </div>
</div>
        <div className="mt-24">
            <div className="w-full text-center mb-4">
                <h2 className="text-4xl text-yellow-500 font-bold">The Manufacturers</h2>
                <p className="text-white whitespace-pre-line">{message}</p>
            </div>
        </div>
            <div className="team-item mx-4">
                <img src={tyagi} className="rounded-full w-36 h-36 object-cover mx-auto" alt="pic" />
                <h3 className="text-xl font-semibold mt-6">Sanat Shree</h3>
                <div className="team-info"><p className="text-gray-500">Manufacturer</p></div>
                <p className="text-gray-700 mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat officia iste, perferendis modi, inventore, excepturi numquam fugiat quod voluptatum voluptatibus sunt ipsa eum!</p>
                <ul className="flex justify-around mt-4">
                    <li><a href="#" className="twitter"><i className="fa fa-twitter"></i></a></li>
                    <li><a href="#" className="pinterest"><i className="fa fa-pinterest"></i></a></li>
                    <li><a href="#" className="facebook"><i className="fa fa-facebook"></i></a></li>
                    <li><a href="#" className="dribble"><i className="fa fa-dribbble"></i></a></li>
                </ul>
            </div>

            <div className="team-item mx-4">
                <img src={angel} className="rounded-full w-36 h-36 object-cover mx-auto" alt="pic" />
                <h3 className="text-xl font-semibold mt-6">Jessica</h3>
                <div className="team-info"><p className="text-gray-500">Manufacturer</p></div>
                <p className="text-gray-700 mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, accusantium ullam? Assumenda, praesentium cupiditate maxime, accusamus dolorem nihil tenetur, autem reprehenderit cum dignissimos consequatur.</p>
                <ul className="flex justify-around mt-4">
                    <li><a href="#" className="twitter"><i className="fa fa-twitter"></i></a></li>
                    <li><a href="#" className="pinterest"><i className="fa fa-pinterest"></i></a></li>
                    <li><a href="#" className="facebook"><i className="fa fa-facebook"></i></a></li>
                    <li><a href="#" className="dribble"><i className="fa fa-dribbble"></i></a></li>
                </ul>
            </div>

            <div className="team-item mx-4">
                <img src={adhiraj} className="rounded-full w-36 h-36 object-cover mx-auto" alt="pic" />
                <h3 className="text-xl font-semibold mt-6">Sanidhya Singh</h3>
                <div className="team-info"><p className="text-gray-500">Manufacturer</p></div>
                <p className="text-gray-700 mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo laboriosam dolorum voluptate ipsum atque cum? Non blanditiis debitis vero, nam autem ratione sapiente accusantium?</p>
                <ul className="flex justify-around mt-4">
                    <li><a href="#" className="twitter"><i className="fa fa-twitter"></i></a></li>
                    <li><a href="#" className="pinterest"><i className="fa fa-pinterest"></i></a></li>
                    <li><a href="#" className="facebook"><i className="fa fa-facebook"></i></a></li>
                    <li><a href="#" className="dribble"><i className="fa fa-dribbble"></i></a></li>
                </ul>
            </div>
        </div>
    );
}

export default Manufacture;