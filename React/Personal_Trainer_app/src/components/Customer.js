import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Moment from 'react-moment';
import Calendar from 'react-calendar';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';

const Customer = (props) => {

    const [date, setDate] = useState(new Date());
    const [trainings, setTrainings] = useState([]);
    const [allTrainings, setAllTrainings] = useState([]);
    const [data, setData] = useState({});
    const columns = [
        {
            Header: 'Date',
            accessor: 'date',
            Cell: row => {
                return <Moment format="DD-MM-YYYY">{row.original.date}</Moment>
            },
            filterable: true,
            sortable: true
        },
        {
            Header: 'Duration',
            accessor: 'duration',
            filterable: true,
            sortable: true
        },
        {
            Header: 'Activity',
            accessor: 'activity',
            filterable: true
        }
    ]

    useEffect(() => {
        setData(props.location.state.data);
        getCustomerTrainings();
    }, [])

    const getCustomerTrainings = () => {
        fetch(props.location.state.data.links[2].href)
            .then(x => x.json())
            .then(results => {
                setTrainings(results.content);
                setAllTrainings(results.content);
            })
            .catch(err => console.log(err))
    }

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
            <div className="flex-row">
                <div className="col-6 d-inline-flex d-flex flex-column">
                    <div>
                        <h3><u>Your information:</u></h3>
                    </div>
                    <div className="">
                        <h3>
                            {data.firstname} {data.lastname}
                        </h3>
                    </div>
                    <div className="">
                        <h4>
                            {data.streetaddress}
                        </h4>
                    </div>
                    <div className="">
                        <h4>
                            {data.phone}
                        </h4>
                    </div>
                    <div className="">
                        <h4>
                            {data.email}
                        </h4>
                    </div>
                </div>
                <div className="col-6 d-inline-flex">
                <div className="row mt-3 mb-3">
                    <div className="col-12 text-center">
                        <h4>Filter your workouts:</h4>
                        <div className="">
                            <Calendar
                                value={date}
                                onClickDay={(value) => showDay(value)}
                                onClickMonth={(value) => showMonth(value)}
                                onClickYear={(value) => showYear(value)}
                                minDetail={"decade"}
                            ></Calendar>
                            <button className="btn btn-primary m-3" onClick={getCustomerTrainings}>Clear</button>
                        </div>
                    </div>
                    </div>
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

export default Customer;
