import * as React from 'react'
import { View, StyleSheet, Button, ScrollView } from 'react-native';
import { RouteComponentProps } from 'react-router';
import { observer } from 'mobx-react-lite';
import dayjs from 'dayjs';

import { WorkoutCard } from '../ui/WorkoutCard';
import { WorkoutTimer } from '../ui/WorkoutTimer';
import { RootStoreContext } from '../stores/RootStore';
import { FloatingActionButton } from '../ui/FloatingActionButton';
import { AddWorkoutCard } from '../ui/AddWorkoutCard';

interface Props extends RouteComponentProps<{
  year?: string;
  month?: string;
  day?: string;
}> {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  scrollContainer: {
    padding: 10,
    marginBottom: 50
  }
});

export const CurrentWorkouts: React.FC<Props> = observer(({ 
  history, 
  match: { params: { day, month, year } } 
}) => {
  const rootStore = React.useContext(RootStoreContext);
  React.useEffect(() => {
    return () => {
      rootStore.workoutTimerStore.endTimer();
    }
  }, [])

  const isCurrentWorkout = !year && !month && !day;
  const dateKey = `${year}-${month}-${day}`;
  const [addWorkoutVisible, setAddWorkoutVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={styles.scrollContainer}>
        {(isCurrentWorkout ?
          rootStore.workoutStore.currentExercises :
          rootStore.workoutStore.history[dateKey]
         ).map((workout) => {
          return (
            <WorkoutCard 
              onSetPress={setIndex => {
                rootStore.workoutTimerStore.startTimer();
                const currentSet = workout.sets[setIndex];
                let newValue: string;

                if (currentSet === '') {
                  newValue = `${workout.reps}`
                } else if (currentSet === '0') {
                  rootStore.workoutTimerStore.endTimer();
                  newValue = ''
                } else {
                  newValue = `${parseInt(currentSet) - 1}`
                }

                workout.sets[setIndex] = newValue;
              }}
              key={workout.exercise}
              sets={workout.sets} 
              exercise={workout.exercise}
              repsAndWeight={`${workout.setsNumber}x${workout.reps} ${workout.weight}`}
            />
          );
        })}
        {addWorkoutVisible ? 
          <AddWorkoutCard 
            onAddPress={(exercise, sets, reps, weight) => {
              const formattedSets = ['', '', '', '', ''];
              formattedSets.fill('x', sets, 5)

              rootStore.workoutStore.currentExercises.push(
                {
                  exercise,
                  reps: parseInt(reps) || 0,
                  setsNumber: sets,
                  weight: parseInt(weight) || 0,
                  sets: formattedSets
                }
              );
              setAddWorkoutVisible(false);
            }}
            onCancelPress={() => setAddWorkoutVisible(false)}
          /> : 
          null
        }
        <Button
          title='SAVE'
          onPress={() => {
            if (isCurrentWorkout) {
              rootStore.workoutStore.history[dayjs().format('YYYY-MM-DD')] = rootStore.workoutStore.currentExercises;
              rootStore.workoutStore.currentExercises = [];
            }
            history.push("/");
          }}
        />
      </ScrollView>
      <FloatingActionButton
        onPress={() => {
          setAddWorkoutVisible(true);
        }} 
      />
      {rootStore.workoutTimerStore.isRunning ? (
        <WorkoutTimer 
          percent={rootStore.workoutTimerStore.percent}
          currentTime={rootStore.workoutTimerStore.display} 
          onXPress={() => rootStore.workoutTimerStore.endTimer()} 
        />
        ) : null}
    </View>
  );
});
