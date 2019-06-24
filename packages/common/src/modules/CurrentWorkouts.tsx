import * as React from 'react'
import { View, StyleSheet } from 'react-native';
import { WorkoutCard } from '../ui/WorkoutCard';

interface Props {}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    margin: 10
  }
});

export const CurrentWorkouts: React.FC<Props> = () => {
    return (
      <View style={styles.container}>
        <WorkoutCard 
        sets={["5", "5", "5", "", "x"]} 
        exercise="Squat"
        repsAndWeight="5x5 260"/>
      </View>
    );
}