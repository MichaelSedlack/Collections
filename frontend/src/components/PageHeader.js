import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

function PageHeader(){
    return(

        <div>
            <Router>
                <Switch>
                    <Route path='/' exact>
                        <header>
                            <h1>Myuseum</h1>
                        </header>
                    </Route>
                    <Route path='/register' exact>
                        <header>
                            <h1>Create New Account</h1>
                        </header>
                    </Route>
                    <Route path='/forgotpassword' exact>
                        <header>
                            <h1>Forgot Password</h1>
                        </header>
                    </Route>
                </Switch>
            </Router>
            
            
        </div>
        
    );
};

export default PageHeader;