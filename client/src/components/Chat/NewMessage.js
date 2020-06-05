import React, { useState } from "react";
import {
  Paper,
  Button,
  Icon,
  Grid,
  Box,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { ChatService } from "../../services";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    paddingBottom: 20,
  },
  message: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "0 20px",
  },
  box: {
    height: "100%",
    paddingLeft: 20,
  },
}));

const NewMessage = () => {
  const classes = useStyles();
  const [message, setMessage] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await ChatService.sendMessage(message);
    setMessage("");
  };

  return (
    <Paper square className={classes.paper}>
      <form onSubmit={handleOnSubmit}>
        <Grid
          container
          spacing={0}
          direction="row"
          xs={12}
          className={classes.message}
        >
          <Grid item xs={10}>
            <TextField
              name="message"
              required
              fullWidth
              id="message"
              label="Message"
              autoFocus
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Box display="flex" alignItems="center" className={classes.box}>
              <Button
                variant="contained"
                color="primary"
                endIcon={<Icon>send</Icon>}
                fullWidth
                disabled={!message}
                type="submit"
              >
                Send
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default NewMessage;
