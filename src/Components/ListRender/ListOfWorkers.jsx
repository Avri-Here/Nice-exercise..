import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "../../Style/useStyles";
import PropTypes from "prop-types";
import { useState } from "react";

import manageStateFunctions from "../../Utils/ManageStateFunctions";
import FilterBySearch from "../Sort by options/SortBySearch";
import SortTheList from "../Sort by options/SortByNameAge";

ListOfWorkers.propTypes = {
  arrWorker: PropTypes.array,
  saveArrWorker: PropTypes.func,
};

export default function ListOfWorkers(props) {
  const classes = useStyles();

  const [filterBy, setFilterBy] = useState({ run: "default", optional: "" });

  function removeFromArr(index) {
    // To delete without holes from an array I can use a "Array.prototype.splice()" , in case the array is a State it is better to use a filter prototype ..
    const newArrAfterFilter = manageStateFunctions.newArrAfterRemove(
      props.arrWorker,
      index
    );

    // Update the array after deleting an item ..
    props.saveArrWorker(newArrAfterFilter);
  }

  function RunOnAnArrAndRender(sortType) {
    
    // When sorting by name or age or when searching for an employee, the original array does not change, only the display .. 
    return manageStateFunctions
      .SortArray(props.arrWorker, sortType.sortType, sortType.Search)
      .map((item, index) => {
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
                      <Typography variant="body2" style={{ cursor: "pointer" }}>
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
      });
  }

  // return Array.map ..
  if (props.arrWorker.length > 0) {
    return (
      <>
        <div className="option">
          <FilterBySearch setFilterBy={setFilterBy} />
        </div>
        <br />

        <div className="option">
          <SortTheList setFilterBy={setFilterBy} />
        </div>

        {filterBy.run === "default" && <RunOnAnArrAndRender />}
        {filterBy.run === "SearchIn" && (
          <RunOnAnArrAndRender
            sortType={filterBy.run}
            Search={filterBy.optional}
          />
        )}
        {filterBy.run === "Name" && (
          <RunOnAnArrAndRender sortType={filterBy.run} />
        )}
        {filterBy.run === "Age" && (
          <RunOnAnArrAndRender sortType={filterBy.run} />
        )}
      </>
    );
  }
}
