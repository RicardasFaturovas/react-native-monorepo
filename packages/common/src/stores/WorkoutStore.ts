import { createContext } from "react";

type WorkoutDay = 'a' | 'b';

interface IWorkoutHistory {
  [key: string]: Array<{
    exercise: string,
    value: number
  }>
}

class WorkoutStore {
  currentSquat: number;
  currentBenchPress: number;
  currentOverheadPress: number;
  currentDeadLift: number;
  currentBarbellRow: number;

  lastWorkoutType: WorkoutDay;

  history: IWorkoutHistory;
}

export const WorkoutStoreContext = createContext(new WorkoutStore());
