import React, { useState } from "react";
import  tyagi from './images/tyagi.jpg';
import  angel from './images/angel.png';
import  adhiraj from './images/adhiraj.jpg';
import "./design.css";

function Designers() {
    let message = ` dhue uruvru u vuvrr8 fru furutvui rgu gvruiui vruv reuvruvuruigvruguv ufg vvuv gfguv u gr fv fygyc edgc irggi`;

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
                        className="flex-grow px-4 py-1 rounded-md  border-r-2 focus:outline-none"
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
                <h2 className="text-4xl text-yellow-500 font-bold">The Designers</h2>
                <p className="text-white whitespace-pre-line">{message}</p>
            </div>
        </div>




            <div className="mt-24 flex flex-wrap justify-center"> {/* Added flex and flex-wrap properties */}
                <div className="team-item mx-4">
                    <img src={tyagi} className="rounded-full w-36 h-36 object-cover mx-auto" alt="pic" />
                    <h3 className="text-xl font-semibold mt-6">ARYAN CHAUDHARY</h3>
                    <div className="team-info"><p className="text-gray-500">Designer</p></div>
                    <p className="text-gray-700 mt-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe nihil dolores facilis. </p>
                    <ul className="flex justify-around mt-4">
                        <li><a href="#" className="twitter"><i className="fa fa-twitter"></i></a></li>
                        <li><a href="#" className="pinterest"><i className="fa fa-pinterest"></i></a></li>
                        <li><a href="#" className="facebook"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="#" className="dribble"><i className="fa fa-dribbble"></i></a></li>
                    </ul>
                </div>

                <div className="team-item mx-4">
                    <img src={angel} className="rounded-full w-36 h-36 object-cover mx-auto" alt="pic" />
                    <h3 className="text-xl font-semibold mt-6">Anjila</h3>
                    <div className="team-info"><p className="text-gray-500">Designer</p></div>
                    <p className="text-gray-700 mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem amet maiores illo.</p>
                    <ul className="flex justify-around mt-4">
                        <li><a href="#" className="twitter"><i className="fa fa-twitter"></i></a></li>
                        <li><a href="#" className="pinterest"><i className="fa fa-pinterest"></i></a></li>
                        <li><a href="#" className="facebook"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="#" className="dribble"><i className="fa fa-dribbble"></i></a></li>
                    </ul>
                </div>

                <div className="team-item mx-4">
                    <img src={adhiraj} className="rounded-full w-36 h-36 object-cover mx-auto" alt="pic" />
                    <h3 className="text-xl font-semibold mt-6">ARYAN CHAUDHARY</h3>
                    <div className="team-info"><p className="text-gray-500">Designer</p></div>
                    <p className="text-gray-700 mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo corporis reprehenderit repellendus?</p>
                    <ul className="flex justify-around mt-4">
                        <li><a href="#" className="twitter"><i className="fa fa-twitter"></i></a></li>
                        <li><a href="#" className="pinterest"><i className="fa fa-pinterest"></i></a></li>
                        <li><a href="#" className="facebook"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="#" className="dribble"><i className="fa fa-dribbble"></i></a></li>
                    </ul>
                </div>

                <div className="team-item mx-4">
                    <img src={adhiraj} className="rounded-full w-36 h-36 object-cover mx-auto" alt="pic" />
                    <h3 className="text-xl font-semibold mt-6">SHASHWAT SINGH</h3>
                    <div className="team-info"><p className="text-gray-500">Designer</p></div>
                    <p className="text-gray-700 mt-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, quis quidem. Esse?</p>
                    <ul className="flex justify-around mt-4">
                        <li><a href="#" className="twitter"><i className="fa fa-twitter"></i></a></li>
                        <li><a href="#" className="pinterest"><i className="fa fa-pinterest"></i></a></li>
                        <li><a href="#" className="facebook"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="#" className="dribble"><i className="fa fa-dribbble"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Designers;