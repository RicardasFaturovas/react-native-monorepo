import { observable } from "mobx";
import { persist } from "mobx-persist";
import { RootStore } from "./RootStore";

type WorkoutDay = 'a' | 'b';

export interface CurrentExercise {
  weight: number;
  reps: number;
  setsNumber: number
  exercise: string;
  sets: string[];
}
interface IWorkoutHistory {
  [key: string]: CurrentExercise[]
}

export class WorkoutStore {
  @persist @observable currentSquat: number;
  @persist @observable currentBenchPress: number;
  @persist @observable currentOverheadPress: number;
  @persist @observable currentDeadLift: number;
  @persist @observable currentBarbellRow: number;

  @persist @observable lastWorkoutType: WorkoutDay;

  @persist('object') @observable history: IWorkoutHistory = {};

  @persist('list') @observable currentExercises: CurrentExercise[] = [];

  rootStore: RootStore
    
  constructor(rootStore: RootStore) {
      this.rootStore = rootStore;
  }
}
