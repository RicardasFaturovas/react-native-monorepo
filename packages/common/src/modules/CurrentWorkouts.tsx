import * as React from 'react'
import { View, StyleSheet, Button } from 'react-native';
import { WorkoutCard } from '../ui/WorkoutCard';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/RootStore';
import { WorkoutTimer } from '../ui/WorkoutTimer';
import dayjs = require('dayjs');
import { RouteComponentProps } from 'react-router';

interface Props extends RouteComponentProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 10
  }
});

export const CurrentWorkouts: React.FC<Props> = observer(({ history }) => {
  const rootStore = React.useContext(RootStoreContext);
  React.useEffect(() => {
    return () => {
      rootStore.workoutTimerStore.endTimer();
    }
  }, [])

  return (
    <View style={styles.container}>
      {rootStore.workoutStore.currentExercises.map((e) => {
        return (
          <WorkoutCard 
          onSetPress={setIndex => {
            rootStore.workoutTimerStore.startTimer();
            const currentSet = e.sets[setIndex];
            let newValue: string;

            if (currentSet === '') {
              newValue = `${e.reps}`
            } else if (currentSet === '0') {
              rootStore.workoutTimerStore.endTimer();
              newValue = ''
            } else {
              newValue = `${parseInt(currentSet) - 1}`
            }

            e.sets[setIndex] = newValue;
          }}
          key={e.exercise}
          sets={e.sets} 
          exercise={e.exercise}
          repsAndWeight={`${e.setsNumber}x${e.reps} ${e.weight}`}
          />
        );
      })}
      <Button
        title='SAVE'
        onPress={() => {
          rootStore.workoutStore.history[
            dayjs(
              new Date(+new Date - Math.floor(Math.random() * 10000000000))
            ).format("YYYY-MM-DD")
          ] = rootStore.workoutStore.currentExercises;
          rootStore.workoutStore.currentExercises = [];
          history.push("/");
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
