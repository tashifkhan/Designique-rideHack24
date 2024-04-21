import React from 'react';
import './footer.css';
import aman from './images/aman-avatar.jpg';
import angel from './images/angel-avatar.jpg';
import tashif from './images/tashif-avatar.jpg';
import adarsh from './images/adarsh-avatar.jpg';
import dhruv from './images/dhruv-avatar.jpg';
import adhiraj from './images/adhiraj-avatar.jpg';

const TeamSection = () => {
    return (
        <div className="wrapper">
            <div className="title">
                <h4>THE UNDERDOGS</h4>
            </div>

            <div className="card_Container">
                <div className="card">
                    <div className="imbBx">
                        <img src={aman} alt="" />
                    </div>
                    <div className="content">
                        <div className="contentBx">
                            <h3>Aman Tyagi <br /><span>The Hawk</span></h3>
                        </div>
                        <ul className="sci">
                            <li style={{ '--i': 1 }}>
                                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                            </li>
                            <li style={{ '--i': 2 }}>
                                <a href="#"><i className="fa-brands fa-github"></i></a>
                            </li>
                            <li style={{ '--i': 3 }}>
                                <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card">
                    <div className="imbBx">
                        <img src={angel} alt="" />
                    </div>
                    <div className="content">
                        <div className="contentBx">
                            <h3>Angel <br /><span>Learner</span></h3>
                        </div>
                        <ul className="sci">
                            <li style={{ '--i': 1 }}>
                                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                            </li>
                            <li style={{ '--i': 2 }}>
                                <a href="#"><i className="fa-brands fa-github"></i></a>
                            </li>
                            <li style={{ '--i': 3 }}>
                                <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card">
                    <div className="imbBx">
                        <img src={tashif} alt="" />
                    </div>
                    <div className="content">
                        <div className="contentBx">
                            <h3>Tashif <br /><span>The Orator</span></h3>
                        </div>
                        <ul className="sci">
                            <li style={{ '--i': 1 }}>
                                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                            </li>
                            <li style={{ '--i': 2 }}>
                                <a href="#"><i className="fa-brands fa-github"></i></a>
                            </li>
                            <li style={{ '--i': 3 }}>
                                <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="card_Container">
                
                <div className="card">
                    <div className="imbBx">
                        <img src={adarsh} alt="" />
                    </div>
                    <div className="content">
                        <div className="contentBx">
                            <h3>Adarsh <br /><span>Beast</span></h3>
                        </div>
                        <ul className="sci">
                            <li style={{ '--i': 1 }}>
                                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                            </li>
                            <li style={{ '--i': 2 }}>
                                <a href="#"><i className="fa-brands fa-github"></i></a>
                            </li>
                            <li style={{ '--i': 3 }}>
                                <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card">
                    <div className="imbBx">
                        <img src={dhruv} alt="" />
                    </div>
                    <div className="content">
                        <div className="contentBx">
                            <h3>Dhruv <br /><span>kindness Overloaded</span></h3>
                        </div>
                        <ul className="sci">
                            <li style={{ '--i': 1 }}>
                                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                            </li>
                            <li style={{ '--i': 2 }}>
                                <a href="#"><i className="fa-brands fa-github"></i></a>
                            </li>
                            <li style={{ '--i': 3 }}>
                                <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card">
                    <div className="imbBx">
                        <img src={adhiraj} alt="" />
                    </div>
                    <div className="content">
                        <div className="contentBx">
                            <h3>Adhiraj <br /><span></span>Content Finder</h3>
                        </div>
                        <ul className="sci">
                            <li style={{ '--i': 1 }}>
                                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                            </li>
                            <li style={{ '--i': 2 }}>
                                <a href="#"><i className="fa-brands fa-github"></i></a>
                            </li>
                            <li style={{ '--i': 3 }}>
                                <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamSection;
