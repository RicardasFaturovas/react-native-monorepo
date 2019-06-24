import { RootStore } from "./RootStore";
import { observable } from "mobx";

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
  @observable currentSquat: number;
  @observable currentBenchPress: number;
  @observable currentOverheadPress: number;
  @observable currentDeadLift: number;
  @observable currentBarbellRow: number;

  @observable lastWorkoutType: WorkoutDay;

  @observable history: IWorkoutHistory;

  @observable currentExercises: CurrentExercise[] = [];

  rootStore: RootStore
    
  constructor(rootStore: RootStore) {
      this.rootStore = rootStore;
  }
}
