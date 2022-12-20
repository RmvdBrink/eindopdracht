import React from 'react';
import {NavLink, Link } from "react-router-dom";
import "./Footer.css"

function Footer(props) {
    return (
        <div className="footer">
            <ul className="ulf">
                <li><Link to="/contact">Contact</Link> </li>
                <li><Link to="/work-together">Work together</Link></li>
                <li><Link to="/f-a-q">F.A.Q</Link></li>
                <li><Link to="/disclaimer">Disclaimer</Link></li>
                
            </ul>
        </div>
    );
}

export default Footer;