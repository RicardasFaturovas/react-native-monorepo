import { RootStore } from "./RootStore";
import { observable } from "mobx";
import { persist } from "mobx-persist";

type WorkoutDay = 'a' | 'b';

interface IWorkoutHistory {
  [key: string]: Array<{
    exercise: string,
    value: number
  }>
}

interface CurrentExercise {
  weight: number;
  reps: number;
  setsNumber: number
  exercise: string;
  sets: string[];
}

export class WorkoutStore {
  @persist @observable currentSquat: number;
  @persist @observable currentBenchPress: number;
  @persist @observable currentOverheadPress: number;
  @persist @observable currentDeadLift: number;
  @persist @observable currentBarbellRow: number;

  @persist @observable lastWorkoutType: WorkoutDay;

  @persist('list') @observable history: IWorkoutHistory;

  @persist('list') @observable currentExercises: CurrentExercise[] = [];

  rootStore: RootStore
    
  constructor(rootStore: RootStore) {
      this.rootStore = rootStore;
  }
}
