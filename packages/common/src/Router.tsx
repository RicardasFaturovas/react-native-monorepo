import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { WorkoutHistory } from "./modules/WorkoutHistory";
import { CurrentWorkouts } from "./modules/CurrentWorkouts";
import { RootStoreContext } from "./stores/RootStore";


export const Router = observer(() => {
  const rootStore = useContext(RootStoreContext);

  return rootStore.routerStore.screen === 'WorkoutHistory' ? (
      <WorkoutHistory />
    ) : (
      <CurrentWorkouts />
    )
});
