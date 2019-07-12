import * as React from 'react'
import { View, StyleSheet, FlatList } from 'react-native';
import { RouteComponentProps } from 'react-router';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/RootStore';
import { ICurrentExercise } from '../stores/WorkoutStore';
import { HistoryCard } from '../ui/HistoryCard';
import { FloatingActionButton } from '../ui/FloatingActionButton';

interface Props extends RouteComponentProps {}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  cardContainer: {
    flex: 1,
    padding: 10
  },
  container: {
    flex: 1
  }
});

export const WorkoutHistory: React.FC<Props> = observer(({history}) => {
  const rootStore = React.useContext(RootStoreContext);

  const rows: Array<
    Array<{
      date: string;
      exercises: ICurrentExercise[];
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
    <View style={styles.container}>
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

      <FloatingActionButton 
        onPress={() => {
          history.push('/current-workout')
        }}
      />
    </View>
  );
});