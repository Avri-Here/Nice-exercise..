import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));
export default function ListOfWorkers(props) {
  const classes = useStyles();

  function removeFromArr(index) {
    const newArrAfterFilter = props.arrWorker.filter((item, ind) => {
      return ind !== index;
    });
    props.setArrWorker(newArrAfterFilter);
  }

  if (props.arrWorker.length > 0) {
    return (
      <div className={classes.root}>
        {props.arrWorker.map((item, index) => {
          return (
            <div key={item.photoUser}>
              <br />
              <Paper key={item.photoUser} className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase className={classes.image}>
                      <img
                        className={classes.img}
                        alt="complex"
                        src={item.photoUser}
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                          {"Name : " + item.Name}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {"Age : " + item.Age}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        onClick={() => {
                          removeFromArr(index);
                        }}
                      >
                        <Typography
                          variant="body2"
                          style={{ cursor: "pointer" }}
                        >
                          <DeleteIcon />
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">
                        Worker ID: {item.Id}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <>
        <hr />
        <h3 style={{textAlign:"center"}}>
          No employees have been added yet .. <br /> add now..
        </h3>
      </>
    );
  }
}
