import React, { useState } from "react";
import { TextField, Paper, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  //   paper: {
  //     width: "50%",
  //     margin: "10%",
  //   },
}));

export default function SurveyForm() {
  const classes = useStyles();
  const [form, setForm] = useState({});

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const graphqlQuery = {
      query: `
        mutation{
            createSurvey(surveyInput:{name:"${form.name}", questionsQuantity: ${form.questionsQuantity}}) {
              name
            }
          }
          `,
    };

    const response = await axios.post(
      "http://localhost:5000/graphql",
      JSON.stringify(graphqlQuery),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    alert("Send");
  };
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <Grid xs={12} container spacing={3}>
        <Grid xs={3} item>
          <Paper>
            <TextField
              id="name"
              name="name"
              label="Survey Name"
              onChange={handleOnChange}
            />
          </Paper>
        </Grid>

        <Grid xs={3} item>
          <Paper>
            <TextField
              id="name"
              name="questionsQuantity"
              label="Questions Quantity"
              onChange={handleOnChange}
            />
          </Paper>
        </Grid>

        <Grid xs={3} item>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
