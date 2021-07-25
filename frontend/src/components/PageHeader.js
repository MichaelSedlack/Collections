import { useEffect, useState, useContext } from "react";
import { withRouter, useHistory } from "react-router-dom";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Grid, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { UserContext } from "./UserContext";
import roomService from "./helpers/roomService";
import "../App.css";
import logo from "./../MyuseumLogo.png";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

function PageHeader() {
  const [museumUser, setMuseumUser] = useState("");
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const id = user.id;
        const currUser = await roomService.getUser(id);
        setMuseumUser(currUser);
      } catch (exception) {
        console.log(exception);
      }
    })();
  }, [user]);

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
    history.push("/");
  };

  const backToRoom = () => {
    setAnchorEl(null);
    history.push("/museum");
  };

  const toPublicRoom = () => {
    setAnchorEl(null);
    history.push("/publicrooms");
  };

  var currPath = window.location.pathname;
  var pageName = "";

  console.log(currPath);

  switch (currPath) {
    case "/":
      pageName = "Myuseum";
      break;
    case "/register":
      pageName = "Create MyAccount";
      break;
    case "/museum":
      pageName = "Personal Myuseum";
      break;
    case "/collections":
      pageName = "MyCollections";
      // user.id is null when refreshing the page
      // user.id === room.uid
      //   ? (pageName = "MyCollections")
      //   : (pageName = "Public Collections");
      break;
    case "/items":
      pageName = "MyItems";
      // user.id is null when refreshing the page
      // user.id === room.uid
      //   ? (pageName = "MyItems")
      //   : (pageName = "Public Items");
      break;
    case "/forgotpassword":
      pageName = "Forgot MyPassword";
      break;
    case "/reset":
      pageName = "Reset MyPassword";
      break;
    case "/verification":
      pageName = "Verify MyEmail";
      break;
    case "/publicrooms":
      pageName = "Public Rooms";
      break;
    default:
      break;
  }

  return (
    <header>
      <Grid
        container
        spacing={0}
        alignItems="flex-start"
        justifyContent="space-evenly"
      >
        <img src={logo} alt="Myuseum Logo" />
        <h1>{pageName}</h1>
        {user ? (
          <div>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              color="secondary"
              onClick={handleClick}
            >
              <AccountBoxIcon fontSize="large" />
              {museumUser.firstName}
            </IconButton>
            <StyledMenu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <StyledMenuItem onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </StyledMenuItem>
              <StyledMenuItem onClick={backToRoom}>
                <ListItemText primary="Personal Rooms Page" />
              </StyledMenuItem>
              <StyledMenuItem onClick={toPublicRoom}>
                <ListItemText primary="Public Rooms" />
              </StyledMenuItem>
            </StyledMenu>
          </div>
        ) : (
          <img src={logo} alt="Myuseum Logo" />
        )}
      </Grid>
    </header>
  );
}

export default withRouter(PageHeader);
