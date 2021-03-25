import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';

const Home = (props) => {

    const columns = [
        {
            Header: 'Firstname',  
            accessor: 'firstname',
            sortable: true,
            filterable: true,
            Cell: row => {
                return (
                    <Link to={{
                        pathname: "/customerPage",
                        state: {
                            data: row.original
                        }
                    }}>{row.original.firstname}</Link>
                )
            }
        },
        {  
            Header: 'Lastname',  
            accessor: 'lastname',
            sortable: true,
            filterable: true,
            Cell: row => {
                return (
                    <Link to={{
                        pathname: "/customerPage",
                        state: {
                            data: row.original
                        }
                    }}>{row.original.lastname}</Link>
                )
            }
        },
        {
            Header: 'Street Address',
            accessor: 'streetaddress',
            filterable: true,
            sortable: true
        },
        {
            Header: 'Postcode',
            accessor: 'postcode',
            filterable: true,
            sortable: true
        },
        {
            Header: 'City',
            accessor: 'city',
            filterable: true,
            sortable: true
        },
        {
            Header: 'Email',
            accessor: 'email',
            filterable: true,
            sortable: true
        },
        {
            Header: 'Phone',
            accessor: 'phone',
            filterable: true,
            sortable: true
        },
        {
            width: 100,
            Cell: row => {
                return (
                    <Link to={{
                        pathname: "/training",
                        state: {
                            data: row.original
                        }
                    }}><button className="btn btn-sm btn-primary" type="button">Training</button></Link>
                )
            }
        },
        {
            width: 70,
            Cell: row => {
                return (
                    <Link to={{
                        pathname: "/editCustomer",
                        state: {
                            data: row.original
                        }
                    }}><button className="btn btn-sm btn-secondary" type="button">Edit</button></Link>
                )
                    
            }
        },
        {
            width: 80,
            accessor: "_links[0].href",
            Cell: row => {
                return <button className="btn btn-sm btn-danger"onClick={() => deleteCustomer(row.original.links[0].href)}>Delete</button>
            }
        }
    ]

    const [data, setData] = useState([])  

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(x => x.json())
            .then(data => {
                setData(data.content)
            })
    }

    const deleteCustomer = (link) => {
        console.log(link);
        if (window.confirm("Are you sure?")) {
            fetch(link, {
                method: "DELETE",
            })
            .then(res => getCustomers())
            .catch(err => console.log(err));
        }
    }

    useEffect(() => {
        getCustomers();
    }, [])
    

    return (
        <div className="container-fluid">
            <ReactTable  
            data={data}  
            columns={columns}  
            defaultPageSize = {10}  
            pageSizeOptions = {[10, 20, 50]}
         />
        </div>
    )
}

export default Home;