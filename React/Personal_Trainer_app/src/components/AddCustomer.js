import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import './Sidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const AddCustomer = (props) => {

    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    })

    const addCustomer = (props) => {
        console.log(customer);
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
        .then(res => cleanForm())
        .catch(err => console.log(err))
    }

    const handleInputChange = (e) => {
        setCustomer({...customer, [e.target.name]: e.target.value});
    }

    const cleanForm = () => {
        let inputs = document.getElementsByTagName("input");
        for (let e of inputs) {
            e.value = ''
        }
        alert("Customer added successfully");
    }

    return (
        <div className="container-fluid mt-3">
            <h4>Add new customer:</h4>
            <div className="form-group">
                <label>First name</label>
                <input type="text" className="form-control" id="ffirstname" name="firstname" onChange={handleInputChange}/>
            </div>
            <div className="form-group">
                <label>Last name</label>
                <input type="text" className="form-control" id="flastname" name="lastname" onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>Street address</label>
                <input type="text" className="form-control" id="fstreetaddress" name="streetaddress" onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>Postcode</label>
                <input type="text" className="form-control" id="fpostcode" name="postcode" onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>City</label>
                <input type="text" className="form-control" id="fcity" name="city" onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" id="femail" name="email" onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>Phone</label>
                <input type="text" className="form-control" id="fphone" name="phone" onChange={handleInputChange} />
            </div>
            <button type="button" className="btn btn-primary" onClick={addCustomer}>Submit</button>
        </div>
    )
}

export default AddCustomer;