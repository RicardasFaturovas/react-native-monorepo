import * as React from 'react'
import { Text, View, Button } from 'react-native';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/RootStore';

interface Props {}

export const WorkoutHistory: React.FC<Props> = observer(() => {
  const rootStore = React.useContext(RootStoreContext);

  return (
    <View>
      <Text>Workout history page</Text>
      <Button
        title="Create workout"
        onPress={() =>{
          rootStore.workoutStore.currentExercises.push({
            exercise: "Squat",
            setsNumber: 5,
            reps: 5,
            sets: ["", "", "", "", ""],
            weight: 250
          }, 
          {
            exercise: "Bench Press",
            setsNumber: 5,
            reps: 5,
            sets: ["", "", "", "", ""],
            weight: 200
          },
          {
            exercise: "Deadlift",
            setsNumber: 1,
            reps: 5,
            sets: ["5", "x", "x", "x", "x"],
            weight: 350
          });
          rootStore.routerStore.screen ="CurrentWorkout"
        }}
       />
    </View>
  );
});