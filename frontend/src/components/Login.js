import React, { useRef, useState, useContext } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";
import roomService from "./helpers/roomService";
import collectionService from "./helpers/collectionService";
import itemService from "./helpers/itemService";
import { buttonStyles } from "./Styles.js";

function Login() {
  const context = useContext(UserContext);
  const history = useHistory();
  const button = buttonStyles();

  var bp = require("./Path.js");

  const loginName = useRef(null);
  const loginPassword = useRef(null);

  // Initial States
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [visibility, setVisibility] = useState(<VisibilityOffIcon />);
  const [type, setType] = useState("password");

  const doLogin = (event) => {
    event.preventDefault();

    var obj = {
      email: loginName.current.value,
      password: loginPassword.current.value,
    };

    var js = JSON.stringify(obj);

    var config = {
      method: "post",
      url: bp.buildPath("users/login"),
      headers: {
        "Content-Type": "application/json",
      },
      data: js,
    };

    axios(config)
      .then(function (response) {
        var res = response.data;
        if (res.error) {
          setMessage(res.error);
          setMessageColor("red");
        } else {
          var user = { ...res };
          window.localStorage.setItem("user_data", JSON.stringify(user));
          setMessage("Logging In");
          setMessageColor("green");
          context.setUser(user);
          roomService.setToken(res.accessToken);
          collectionService.setToken(res.accessToken);
          itemService.setToken(res.accessToken);

          /* On login there is an error with user.firstName being null but if you refresh it continues on to the museumpage anyway; 
            This somewhat resolves that by going straight to the page without delay */
          setTimeout(function () {
            window.location.href = "/museum";
            // history.push("/museum");
          }, 0);
        }
      })
      .catch(function (error) {
        setMessage("Username or Password Incorrect");
        setMessageColor("red");
        console.log(error.response.data);
      });
  };

  // Reveals or hides password
  function changeVisibility() {
    if (type === "text") {
      setVisibility(<VisibilityOffIcon />);
      setType("password");
    } else {
      setVisibility(<VisibilityIcon />);
      setType("text");
    }
  }

  return (
    <div id="loginDiv">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <h4 id="inner-title">Please Sign In</h4>
        <br />
        <TextField
          style={{ marginBottom: "2em" }}
          variant="outlined"
          required
          label="Email"
          type="text"
          id="loginName"
          inputRef={loginName}
        />
        <TextField
          InputProps={{
            endAdornment: (
              <Button
                endIcon={visibility}
                onClick={() => {
                  changeVisibility();
                }}
              />
            ),
          }}
          style={{ marginBottom: "2em" }}
          variant="outlined"
          required
          label="Password"
          type={type}
          id="loginPassword"
          inputRef={loginPassword}
        />
        <Button
          variant="contained"
          size="large"
          color="primary"
          type="submit"
          id="loginButton"
          className={button.formAccept}
          value="Log In"
          onClick={doLogin}
        >
          Log In
        </Button>
        <span style={{ color: messageColor }}>{message}</span>
        <br />
        <span>Don't have an account?</span>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          type="submit"
          id="registerButton"
          className={button.formDecline}
          value="Register"
          onClick={() => {
            window.location.href = "/register";
          }}
        >
          Register
        </Button>
        <br />
        <Button
          size="large"
          onClick={() => {
            history.push("/forgotpassword");
          }}
        >
          Forgot Password?
        </Button>
      </Grid>
    </div>
  );
}

export default Login;
