import React from 'react';
import './Sidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {
    Link
  } from "react-router-dom";

const Navbar = (props) => {
    return (
        <div className="container-fluid p-0">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="navbar-nav mr-auto">
                    <li><Link to={'/'} className="nav-link"><button className="btn btn-outline-primary">Customer List</button> </Link></li>
                    <li><Link to={'/addCustomer'} className="nav-link"><button className="btn btn-outline-primary">Add Customer</button></Link></li>
                    <li><Link to={'/allTrainings'} className="nav-link"><button className="btn btn-outline-primary">Customer Trainings Page</button></Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;