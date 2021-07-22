import {useState, useContext} from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid, IconButton } from '@material-ui/core';
import { UserContext } from './UserContext';
import '../App.css';
import logo from './../MyuseumLogo.png';


function PageHeader () {

  const {user,setUser} = useContext(UserContext);
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    setUser(null);
    window.localStorage.clear();
    history.push('/');
  }

  var currPath = window.location.pathname;
  var pageName = "";

  console.log(currPath);

  switch(currPath){
    case "/":
      pageName = "Login";
      break;
    case "/register":
      pageName = "Register";
      break;
    case "/museum/":
      pageName = "Museum";
      break;
    case "/collections":
      pageName = "Collections";
      break;
    case "/items":
      pageName = "Items";
      break;
    case "/forgotpassword":
      pageName = "Forgot Password";
      break;
    case "/reset":
      pageName = "Reset Password";
      break;
    case "/verification":
      pageName = "Verify Email";
      break;
    default:
      break;
  }

  return (
    <header>
      <Grid container spacing={0} alignItems="flex-start" justify="space-evenly">       
        <img src={logo} />
        <h1>{pageName}</h1>
        {user ? <div>
                  <IconButton aria-controls="simple-menu" aria-haspopup="true" color="secondary" onClick={handleClick}><AccountBoxIcon fontSize="large" />{user.firstName}</IconButton> 
                  <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>
              : <img src={logo} />}
      </Grid>
    </header>
  )
}

export default withRouter(PageHeader);