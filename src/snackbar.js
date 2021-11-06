import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  snackbar: {
    "& .MuiAlert-message": {
      fontSize: "18px",
    },
  },
}));

export default function PositionedSnackbar(props) {
  const [state, setState] = useState({
    vertical: "top",
    horizontal: "right",
  });
  const classes = useStyles();
  const { vertical, horizontal } = state;

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={props.error.flag}
        onClose={() =>
          props.seterror((prev) => {
            return {
              ...prev,
              flag: false,
            };
          })
        }
        key={vertical + horizontal}
        className={classes.snackbar}
        autoHideDuration={3000}
      >
        <Alert
          onClose={() =>
            props.seterror((prev) => {
              return {
                ...prev,
                flag: false,
              };
            })
          }
          severity="error"
        >
          {props.error.message}
        </Alert>
      </Snackbar>
    </div>
  );
}