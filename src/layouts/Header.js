import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav>
            <Link to="/">Home</Link> |
            <Link to="/detail">Detail</Link> |
            <Link to="/graphic">Graphic</Link>
        </nav>
    );
};
export default Header;
