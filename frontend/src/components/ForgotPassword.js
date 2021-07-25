import React, { useRef, useState } from "react";
import axios from "axios";
import validator from "validator";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import SendIcon from "@material-ui/icons/Send";

function ForgotPassword() {
  var bp = require("./Path.js");

  const newEmail = useRef(null);

  // Initial States
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("green");
  const [emailErrorColor, setEmailErrorColor] = useState("");
  const [emailError, setEmailError] = useState("");
  const [checkEmailError, setCheckEmailError] = useState(false);

  const sendEmail = async (event) => {
    event.preventDefault();

    var obj = { email: newEmail.current.value };
    var js = JSON.stringify(obj);

    var config = {
      method: "post",
      url: bp.buildPath("users/forgotPassword"),
      headers: {
        "Content-Type": "application/json",
      },
      data: js,
    };
    axios(config)
      .then(function (response) {
        var res = response.data;
        if (res.error) {
          setColor("red");
          setMessage("Email not found");
        } else {
          setColor("green");
          setMessage("Email Sent");
          setTimeout(function () {
            window.location.href = "/";
          }, 2000);
        }
      })
      .catch(function (error) {
        setColor("red");
        setMessage("Email not found");
        console.log(error.response.data);
      });
  };

  // validates email; only checks syntax
  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError("Valid Email!");
      setEmailErrorColor("green");
      setCheckEmailError(false);
    } else {
      setEmailError("Enter valid Email!");
      setEmailErrorColor("red");
      setCheckEmailError(true);
    }
  };

  // Disables the Send Email button if not valid email
  if (checkEmailError) {
    return (
      <div id="forgotPasswordDiv">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <h3>Enter Your Email to Reset Your Password</h3>
          <TextField
            type="text"
            variant="outlined"
            id="email"
            label="Enter Email"
            onChange={(e) => validateEmail(e)}
            inputRef={newEmail}
          />
          <span id="emailResult" style={{ color: emailErrorColor }}>
            {emailError}
          </span>
          <br />
          <Button
            disabled
            style={{ marginBottom: "2em" }}
            variant="contained"
            size="small"
            color="primary"
            type="submit"
            id="sendEmailButton"
            className="buttons"
            value="Send Email"
            onClick={sendEmail}
            endIcon={<SendIcon>send</SendIcon>}
          >
            Send Email
          </Button>
          <Button
            style={{ marginBottom: "2em" }}
            variant="contained"
            size="small"
            color="secondary"
            type="submit"
            id="loginButton"
            className="buttons"
            value="Return to Login"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Return to Login
          </Button>
          <br />
          <span id="emailResult" style={{ color: "green" }}>
            {message}
          </span>
        </Grid>
      </div>
    );
  } else {
    return (
      <div id="forgotPasswordDiv">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <h3>Enter Your Email to Reset Your Password</h3>
          <TextField
            type="text"
            variant="outlined"
            id="email"
            label="Enter Email"
            onChange={(e) => validateEmail(e)}
            inputRef={newEmail}
          />
          <span id="emailResult" style={{ color: emailErrorColor }}>
            {emailError}
          </span>
          <br />
          <Button
            style={{ marginBottom: "2em" }}
            variant="contained"
            size="small"
            color="primary"
            type="submit"
            id="sendEmailButton"
            className="buttons"
            value="Send Email"
            onClick={sendEmail}
            endIcon={<SendIcon>send</SendIcon>}
          >
            Send Email
          </Button>
          <Button
            style={{ marginBottom: "2em" }}
            variant="contained"
            size="small"
            color="secondary"
            type="submit"
            id="loginButton"
            className="buttons"
            value="Return to Login"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Return to Login
          </Button>
          <br />
          <span id="emailResult" style={{ color: color }}>
            {message}
          </span>
        </Grid>
      </div>
    );
  }
}

export default ForgotPassword;
