import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Moment from 'react-moment';
import Calendar from 'react-calendar';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';

const AllTrainingsPage = (props) => {

    const [date, setDate] = useState(new Date());
    const [trainings, setTrainings] = useState([]);
    const [allTrainings, setAllTrainings] = useState([]);
    const columns = [
        {
            Header: 'Date',
            accessor: 'date',
            width: 150,
            Cell: row => {
                return <Moment format="DD-MM-YYYY">{row.original.date}</Moment>
            },
            filterable: true,
            sortable: true
        },
        {
            Header: 'Duration',
            accessor: 'duration',
            width: 80
        },
        {
            Header: 'Activity',
            accessor: 'activity',
            filterable: true
        },
        {
            Header: 'Firstname',
            accessor: 'customer.firstname',
            width: 200,
            filterable: true
        },
        {
            Header: 'Lastname',
            accessor: 'customer.lastname',
            width: 200,
            filterable: true
        }
    ]

    const getCustomerTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(x => x.json())
            .then(results => {
                setTrainings(results);
                setAllTrainings(results);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getCustomerTrainings();
    }, [])

    const showDay = (t) => {
        let fDay = moment(t).format("DD-MM-YYYY");
        const train = allTrainings.filter(training => {
            let time = moment(training.date).format("DD-MM-YYYY");
            if (time == fDay) {
                return training;
            }
        })
        setTrainings(train);
    }

    const showMonth = (t) => {
        let fMonth = moment(t).format("MM-YYYY");
        const train = allTrainings.filter(training => {
            let time = moment(training.date).format("MM-YYYY");
            if (time == fMonth) {
                return training;
            }
        })
        setTrainings(train);
    }

    const showYear = (t) => {
        let fYear = moment(t).format("YYYY");
        const train = allTrainings.filter(training => {
            let time = moment(training.date).format("YYYY");
            if (time == fYear) {
                return training;
            }
        })
        setTrainings(train);
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center mt-3 mb-3">

                <div className="col-12 text-center">
                    <h4>Filter all workouts:</h4>
                </div>
            </div>

            <div className="flex-row justify-content-center d-flex">
                <div className="">
                    <Calendar
                        value={date}
                        onClickDay={(value) => showDay(value)}
                        onClickMonth={(value) => showMonth(value)}
                        onClickYear={(value) => showYear(value)}
                        minDetail={"decade"}
                    ></Calendar>
                </div>
            </div>
                
            <div className="row justify-content-center">
                <div className="m-3">
                    <button className="btn btn-lg btn-primary" onClick={getCustomerTrainings}>Clear</button>
                </div>
            </div>
                
            
            
            <ReactTable
                columns={columns}
                data={trainings}
                defaultPageSize = {5}
                pageSizeOptions = {[5, 10, 20]}
            ></ReactTable>
        </div>
    )
}

export default AllTrainingsPage;
