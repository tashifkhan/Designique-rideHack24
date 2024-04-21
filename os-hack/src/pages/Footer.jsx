import React from 'react';
import './footer.css';
import aman from './images/aman-avatar.jpg';
import angel from './images/angel-avatar.jpg';
import tashif from './images/tashif-avatar.jpg';
import adarsh from './images/adarsh-avatar.jpg';
import dhruv from './images/dhruv-avatar.jpg';
import adhiraj from './images/adhiraj-avatar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  {faLongArrowDown, }  from '@fortawesome/free-solid-svg-icons'

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
                            <h3>Aman Tyagi <br /><span>#SmartWorker</span></h3>
                        </div>
                        <ul className="sci">
                        <li style={{ '--i': 1 }}>
                                <a href="https://github.com/AmanTyagi3123"><i class="bi bi-github"></i></a>
                            </li>
                            <li style={{ '--i': 2 }}>
                                <a href="https://www.linkedin.com/in/aman-tyagi-677377270?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i class="bi bi-linkedin"></i></a>
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
                            <h3>Angel <br /><span>#Entrepreneur</span></h3>
                        </div>
                        <ul className="sci">
                            <li style={{ '--i': 1 }}>
                                <a href="https://github.com/angelsinghal"><i class="bi bi-github"></i></a>
                            </li>
                            <li style={{ '--i': 2 }}>
                                <a href="https://www.linkedin.com/in/angel-singhal-44b372248?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i class="bi bi-linkedin"></i></a>
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
                            <h3>Tashif <br /><span>#Visionary</span></h3>
                        </div>
                        <ul className="sci">
                            <li style={{ '--i': 1 }}>
                                <a href="https://github.com/tashifkhan"><i class="bi bi-github"></i></a>
                            </li>
                            <li style={{ '--i': 2 }}>
                                <a href="https://www.linkedin.com/in/tashif-ahmad-khan-982304244?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i class="bi bi-linkedin"></i></a>
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
                            <h3>Adarsh <br /><span>#Designer</span></h3>
                        </div>
                        <ul className="sci">
                            <li style={{ '--i': 1 }}>
                                <a href="https://github.com/adarshsharma3"><i class="bi bi-github"></i></a>
                            </li>
                            <li style={{ '--i': 2 }}>
                                <a href="https://www.linkedin.com/in/adarsh-sharma-3bb87027b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i class="bi bi-linkedin"></i></a>
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
                            <h3>Dhruv <br /><span>#CodeHustler</span></h3>
                        </div>
                        <ul className="sci">
                            <li style={{ '--i': 1 }}>
                                <a href="https://github.com/dhruvmishra1020"><i class="bi bi-github"></i></a>
                            </li>
                            <li style={{ '--i': 2 }}>
                                <a href="#"><i class="bi bi-linkedin"></i></a>
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
                            <h3>Adhiraj <br /><span>#MultiTasker</span></h3>
                        </div>
                        <ul className="sci">
                            <li style={{ '--i': 1 }}>
                                <a href="https://github.com/Adhiraj-3"><i class="bi bi-github"></i></a>
                            </li>
                            <li style={{ '--i': 2 }}>
                                <a href="https://www.linkedin.com/in/adhiraj-gupta-777a7a270?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><i class="bi bi-linkedin"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamSection;
