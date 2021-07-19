import React from 'react';
import '../App.css';
import { withRouter } from 'react-router-dom';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Grid } from '@material-ui/core';

class PageHeader extends React.Component {

  // constructor(props){
  //   super(props);
  // }

  render(){
    var currPath = this.props.location.pathname
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
      default:
        break;
    }

    return (
      <header>
        <h1>{pageName}</h1>
      </header>
    )
  }
}

export default withRouter(PageHeader);