import { RouterStore } from "./RouterStore";
import { WorkoutStore } from "./WorkoutStore";
import { createContext } from "react";
import { WorkoutTimerStore } from "./WorkoutTimerStore";

export class RootStore {
  routerStore = new RouterStore(this)
  workoutStore = new WorkoutStore(this)
  workoutTimerStore = new WorkoutTimerStore()
}

export const RootStoreContext = createContext(new RootStore());
