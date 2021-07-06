import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Grid } from '@material-ui/core';


function PageHeader(){
    return(

        <div>
            <Router>
                <Switch>
                    <Route path='/' exact>
                        <header>
                            <div>
                                <Grid container direction="column" alignItems="flex-end">
                                    <AccountBoxIcon color="secondary" fontSize="large"/>
                                    <h1>Myuseum</h1>
                                </Grid>
                            </div>
                        </header>
                    </Route>
                    <Route path='/register' exact>
                        <header>
                            <h1>Create New Account</h1>
                        </header>
                    </Route>
                    <Route path='/museum'>
                        <header>
                            <h1>Your Myuseum</h1>
                        </header>
                    </Route>
                    <Route path='/forgotpassword' exact>
                        <header>
                            <h1>Forgot Password</h1>
                        </header>
                    </Route>
                    <Route path='/reset'>
                        <header>
                            <h1>Reset Password</h1>
                        </header>
                    </Route>
                </Switch>
            </Router>
            
            
        </div>
        
    );
};

export default PageHeader;