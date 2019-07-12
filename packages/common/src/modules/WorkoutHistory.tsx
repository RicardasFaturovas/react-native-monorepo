import * as React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/RootStore';
import { RouteComponentProps } from 'react-router';
import { HistoryCard } from '../ui/HistoryCard';

interface Props extends RouteComponentProps {}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  }
});

export const WorkoutHistory: React.FC<Props> = observer(({history}) => {
  const rootStore = React.useContext(RootStoreContext);

  const rows: JSX.Element[][] = [];

  if (rootStore.workoutStore.history) {
    Object.entries(rootStore.workoutStore.history).forEach(([date, value], index) => {
      const historyCard = <HistoryCard key={date} header={date} currentExercises={value} />;
  
      if (index % 2 === 0) {
        rows.push([historyCard])
      } else {
        rows[rows.length - 1].push(historyCard)
      }
    });
  }

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
            }
          );
          
          history.push('/current-workout')
        }}
       />

       {rows.map((row, index) => (
         <View style={styles.row} key={index}>{row}</View>
       ))}
    </View>
  );
});