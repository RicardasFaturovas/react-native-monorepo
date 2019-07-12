import { observable, computed } from 'mobx';
import { persist } from 'mobx-persist';

import { RootStore } from "./RootStore";

export interface ICurrentExercise {
  weight: number;
  reps: number;
  setsNumber: number
  exercise: string;
  sets: string[];
}
interface IWorkoutHistory {
  [key: string]: ICurrentExercise[];
}

export class WorkoutStore {
  @persist @observable currentSquat: number;
  @persist @observable currentBenchPress: number;
  @persist @observable currentOverheadPress: number;
  @persist @observable currentDeadLift: number;
  @persist @observable currentBarbellRow: number;

  @persist('object') @observable history: IWorkoutHistory = {};

  @persist('list') @observable currentExercises: ICurrentExercise[] = [];

  @computed get hasCurrentWorkout() {
    return !!this.currentExercises.length;
  }

  rootStore: RootStore
    
  constructor(rootStore: RootStore) {
      this.rootStore = rootStore;
  }
}
