import React from 'react';
import siteLogo from '../../Images/icon.png';
import { Link } from 'react-router-dom';
import './Navbar.css';

export function Navbar() {

    return (
        <nav>
            <Link to='/' className='link'>
                <div id='logo-with-img'>
                    <img src={siteLogo} alt='site-logo' id='logo-img'/>
                    GitHub - Issues
                </div>
            </Link>
        </nav>
    );
}