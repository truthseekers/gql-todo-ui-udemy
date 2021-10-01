import { makeStyles } from "@material-ui/core/styles";

const useLoginStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const useHeaderStyles = makeStyles((theme) => ({
  link: {
    color: "white",
    textDecoration: "none",
  },
}));

const useButtonStyles = makeStyles((theme) => ({
  root: {
    marginTop: "25px",
  },
}));

const useUnauthenticatedStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
}));

export {
  useLoginStyles,
  useHeaderStyles,
  useButtonStyles,
  useUnauthenticatedStyles,
};
