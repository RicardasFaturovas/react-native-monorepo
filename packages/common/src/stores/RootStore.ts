import { WorkoutStore } from "./WorkoutStore";
import { createContext } from "react";
import { WorkoutTimerStore } from "./WorkoutTimerStore";
import { AsyncStorage } from "react-native";
import { create } from "mobx-persist";

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
})

export class RootStore {
  workoutStore = new WorkoutStore(this)
  workoutTimerStore = new WorkoutTimerStore()

  constructor() {
    hydrate('workoutTimer', this.workoutTimerStore).then(() => {
      if(this.workoutTimerStore.isRunning) {
        this.workoutTimerStore.measure();
      } 
    });
    hydrate('workout', this.workoutStore);
  }
}

export const RootStoreContext = createContext(new RootStore());
