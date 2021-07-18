import React, { useContext }from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Grid, Button } from '@material-ui/core';
import { UserContext } from './UserContext';


function PageHeader(){

  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
    history.push('');
  }

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
                            {user &&
                                    <Button 
                                      variant="contained" 
                                      size="large" 
                                      color="secondary" 
                                      type="submit" 
                                      id="loginButton" 
                                      className="buttons" 
                                      value="Sign Out" 
                                      onClick={()=>{handleLogout()}}>
                                        Sign Out
                                    </Button>
                            }
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
                    <Route path='/collections'>
                        <header>
                            <h1>
                                Collections
                            </h1>
                        </header>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default PageHeader;