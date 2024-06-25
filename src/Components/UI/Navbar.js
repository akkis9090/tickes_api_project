import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light  mt-4 rounded p-3" style={{ backgroundColor: "#e3f2fd" }}>
                <Link to='/' className="navbar-brand" ><b>Tickets</b></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className='nav-link' to='/' >Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='/department' >Department</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='/parentCategory' >ParentCategory</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;