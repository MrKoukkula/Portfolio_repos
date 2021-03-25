import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import './Sidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const EditCustomer = (props) => {

    const [data, setData] = useState({});

    useEffect(() => {
        setData(props.location.state.data);
    }, [])

    const EditCustomerData = (props) => {
        fetch(data.links[0].href, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => alert("Customer data edited successfully"))
        .catch(err => console.log(err))
    }

    const handleInputChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    return (
        <div className="container-fluid mt-3">
            <h4>Edit customer:</h4>
            <div className="form-group">
                <label>First name</label>
                <input type="text" className="form-control" id="ffirstname" name="firstname" value={data.firstname} onChange={handleInputChange}/>
            </div>
            <div className="form-group">
                <label>Last name</label>
                <input type="text" className="form-control" id="flastname" name="lastname" value={data.lastname} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>Street address</label>
                <input type="text" className="form-control" id="fstreetaddress" name="streetaddress" value={data.streetaddress} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>Postcode</label>
                <input type="text" className="form-control" id="fpostcode" name="postcode" value={data.postcode} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>City</label>
                <input type="text" className="form-control" id="fcity" name="city" value={data.city} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" id="femail" name="email" value={data.email} onChange={handleInputChange} />
            </div>
            <div className="form-group">
                <label>Phone</label>
                <input type="text" className="form-control" id="fphone" name="phone" value={data.phone} onChange={handleInputChange} />
            </div>
            <button type="button" className="btn btn-primary" onClick={EditCustomerData}>Submit</button>
        </div>
    )
}

export default EditCustomer;