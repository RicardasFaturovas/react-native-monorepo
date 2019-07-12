import React from "react";
import { WorkoutHistory } from "./modules/WorkoutHistory";
import { CurrentWorkouts } from "./modules/CurrentWorkouts";
import { Router, Switch, Route } from "./Router/index";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={WorkoutHistory}/>
        <Route exact path="/current-workout" component={CurrentWorkouts}/>
        <Route 
          exact 
          path="/workout/:year/:month/:day" 
          component={CurrentWorkouts}
        />
      </Switch>
    </Router>
  );
};
