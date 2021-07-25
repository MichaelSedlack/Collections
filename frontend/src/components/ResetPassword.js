import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const loading = {
  margin: "lem",
  fontSize: "24px",
};

function ResetPassword() {
  var bp = require("./Path.js");

  const password = useRef(null);

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordErrorColor, setPasswordErrorColor] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [checkPasswordError, setCheckPasswordError] = useState(false);
  const { id } = useParams(); // grabs the id from the url
  const [visibility, setVisibility] = useState(<VisibilityOffIcon />);
  const [type, setType] = useState("password");
  const [email, setEmail] = useState();

  // only fires once at the beginning
  useEffect(() => {
    (async () => {
      var resetToken = { resetToken: id };
      var config = {
        method: "get",
        url: bp.buildPath("users/reset"),
        headers: {
          "Content-Type": "application/json",
        },
        params: resetToken,
      };

      axios(config)
        .then(function (response) {
          var res = response.data;
          if (res.error) {
            setMessage(res.error);
            setMessageColor("red");
            setError(true);
            setIsLoading(false);
          } else {
            setEmail(res.email);
            setMessage("Reset Link is verified");
            setMessageColor("green");
            setError(false);
            setIsLoading(false);
          }
        })
        .catch(function (error) {
          setMessage("There was an error");
          setMessageColor("red");
          setIsLoading(false);
          setError(true);
          console.log(error.message);
        });
    })();
  }, [bp, id]);

  const updatePassword = async (event) => {
    event.preventDefault();

    var obj = { email: email, password: password.current.value };
    var js = JSON.stringify(obj);

    var config = {
      method: "put",
      url: bp.buildPath("users/updatePasswordByEmail"),
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
          setError(true);
        } else {
          setMessage("Password Successfully Reset");
          setError(false);
          setMessageColor("green");
          setTimeout(function () {
            window.location.href = "/";
          }, 2000);
        }
      })
      .catch(function (error) {
        setMessage("There was an error");
        setMessageColor("red");
        setError(true);
        console.log(error.response.data);
      });
  };

  // checks for matching passwords
  const checkValidation = (e) => {
    if (password.current.value !== e.target.value) {
      setPasswordError("Passwords need to match");
      setPasswordErrorColor("red");
      setCheckPasswordError(true);
    } else {
      setPasswordError("The passwords match!");
      setPasswordErrorColor("green");
      setCheckPasswordError(false);
    }
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

  // If the api responds with an error
  if (error) {
    return (
      <div>
        <h4>{message}</h4>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          type="submit"
          id="loginButton"
          className="buttons"
          value="Login"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Back to Home
        </Button>
        <br />
      </div>
    );
  }
  // If useEffect hasn't finished
  else if (isLoading) {
    return (
      <div>
        <div style={loading}>Loading User Data...</div>
      </div>
    );
  }
  // If the passwords don't match it disables the update password button
  else if (checkPasswordError) {
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <h4>Reset Your Password</h4>
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
            variant="outlined"
            required
            label="Password"
            type={type}
            id="password"
            inputRef={password}
          />
          <br />
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
            margin="dense"
            variant="outlined"
            required
            type={type}
            id="confirmPassword"
            label="Confirm Password"
            onChange={(e) => checkValidation(e)}
          />
          <span id="passwordResult" style={{ color: passwordErrorColor }}>
            {passwordError}
          </span>
          <br />

          <Button
            disabled
            style={{ marginBottom: "2em" }}
            variant="contained"
            size="large"
            color="primary"
            type="submit"
            id="updateButton"
            className="buttons"
            value="Update"
            onClick={updatePassword}
          >
            Update Password
          </Button>
          <Button
            style={{ marginBottom: "2em" }}
            variant="contained"
            size="large"
            color="secondary"
            type="submit"
            id="loginButton"
            className="buttons"
            value="Login"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Cancel
          </Button>
          <br />

          <span id="result" style={{ color: messageColor }}>
            {message}
          </span>
        </Grid>
      </div>
    );
  } else {
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <h4>Reset Your Password</h4>
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
            variant="outlined"
            required
            label="Password"
            type={type}
            id="password"
            inputRef={password}
          />
          <br />
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
            margin="dense"
            variant="outlined"
            required
            type={type}
            id="confirmPassword"
            label="Confirm Password"
            onChange={(e) => checkValidation(e)}
          />
          <span id="passwordResult" style={{ color: passwordErrorColor }}>
            {passwordError}
          </span>
          <br />

          <Button
            style={{ marginBottom: "2em" }}
            variant="contained"
            size="large"
            color="primary"
            type="submit"
            id="updateButton"
            className="buttons"
            value="Update"
            onClick={updatePassword}
          >
            Update Password
          </Button>
          <Button
            style={{ marginBottom: "2em" }}
            variant="contained"
            size="large"
            color="secondary"
            type="submit"
            id="loginButton"
            className="buttons"
            value="Login"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Cancel
          </Button>
          <br />

          <span id="result" style={{ color: messageColor }}>
            {message}
          </span>
        </Grid>
      </div>
    );
  }
}

export default ResetPassword;
