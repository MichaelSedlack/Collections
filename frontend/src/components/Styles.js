import { makeStyles } from "@material-ui/core";

const buttonStyles = makeStyles({
  accept: {
    background: "#1eb8a6",
    // #32CDBB
    "&:hover": {
      background: "#3C8CC3",
    },
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    width: "calc(100% - 450px)",
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  decline: {
    background: "#CD3244",
    "&:hover": {
      // #E0791F
      background: "#d4662b",
    },
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    width: "calc(100% - 450px)",
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  formAccept: {
    background: "#1eb8a6",
    // #32CDBB
    "&:hover": {
      background: "#3C8CC3",
    },
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    width: "calc(100% - 1600px)",
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  formDecline: {
    background: "#CD3244",
    "&:hover": {
      // #E0791F
      background: "#d4662b",
    },
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    width: "calc(100% - 1600px)",
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
});

const formStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const cardStyles = makeStyles(({ spacing }) => ({
  media: {
    height: 200,
    width: 151,
  },
  root: {
    width: "75%",
    display: "flex",
    transition: ".5s",
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    paddingBottom: spacing(2),
    paddingTop: spacing(2),
  },
  hover: {
    width: "75%",
    display: "flex",
    transition: "0.3s",
    boxShadow: "1px 1px 2px 2px rgba(34, 35, 58, 0.2)",
    paddingBottom: spacing(2),
    paddingTop: spacing(2),
  },

  details: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
  },

  content: {
    flex: "1 0 auto",
  },

  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
  },
  controlsOpen: {
    display: "flex",
    alignItems: "flex-end",
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
  },
}));

export { buttonStyles, formStyles, cardStyles };
