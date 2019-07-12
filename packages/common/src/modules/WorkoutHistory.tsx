import * as React from 'react'
import { Text, View, Button, StyleSheet, FlatList } from 'react-native';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/RootStore';
import { RouteComponentProps } from 'react-router';
import { HistoryCard } from '../ui/HistoryCard';
import { CurrentExercise } from '../stores/WorkoutStore';

interface Props extends RouteComponentProps {}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  cardContainer: {
    flex: 1,
    padding: 10
  }
});

export const WorkoutHistory: React.FC<Props> = observer(({history}) => {
  const rootStore = React.useContext(RootStoreContext);

  const rows: Array<
    Array<{
      date: string;
      exercises: CurrentExercise[];
    }>
  > = [];

  if (rootStore.workoutStore.history) {
    Object.entries(rootStore.workoutStore.history).forEach(([date, exercises], index) => {
      if (index % 3 === 0) {
        rows.push([{ date, exercises }]);
      } else {
        rows[rows.length - 1].push({ date, exercises });
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

      <FlatList
        renderItem={({ item }) => (
          <View style={styles.row}>
            {item.map(({date, exercises}) => (
              <View key={date} style={styles.cardContainer}>
                <HistoryCard 
                  onPress={() => {
                    const parts = date.split('-')
                    history.push(`/workout/${parts[0]}/${parts[1]}/${parts[2]}`)
                  }} 
                  header={date} 
                  currentExercises={exercises} 
                />
              </View>
            ))}
            {item.length < 3 ? <View style={styles.cardContainer}/> : null}
            {item.length < 2 ? <View style={styles.cardContainer}/> : null}
          </View>
        )} 
        data={rows} 
        keyExtractor={(item) => item.reduce((previous, current) => previous + ' ' + current.date, '')} 
      />
    </View>
  );
});