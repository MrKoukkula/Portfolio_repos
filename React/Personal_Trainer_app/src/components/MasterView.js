import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Home from './Home';
import AddCustomer from './AddCustomer';
import Training from './Training';
import EditCustomer from './EditCustomer';
import AllTrainingsPage from './AllTrainingsPage';
import Customer from './Customer';

const MasterView = (props) => {
    return (
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/addCustomer' component={AddCustomer} />
                <Route path='/training' component={Training} />
                <Route path='/editCustomer' component={EditCustomer} />
                <Route path='/allTrainings' component={AllTrainingsPage} />
                <Route path='/customerPage' component={Customer} />
            </Switch>
    )
}

export default MasterView;