import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = props => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"> Stock-app</Link>
            </h1>
            <ul>
                <li><Link to="#">Portfolio</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar
