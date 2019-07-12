import * as React from 'react'
import { Picker, StyleSheet, View, Text, TextInput, Button } from 'react-native';

import { Card } from './Card';

interface Props {
  onAddPress: (exercise: string, sets: number, reps: string, weight: string) => void;
  onCancelPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flex: 1
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  exercisePicker: {
    height: 40,
    width: 150,
    borderRadius: 10,
    borderColor: 'transparent',
    backgroundColor: '#b2a1a1',
    color: 'white',
    paddingLeft: 10
  },
  numericInput: {
    backgroundColor: '#b2a1a1',
    borderRadius: 10,
    color: 'white',
    paddingLeft: 10
  }
});

export const AddWorkoutCard: React.FC<Props> = ({ onAddPress, onCancelPress }) => {
  const availableExercises = [
    'Bench Press',
    'Overhead Press',
    'Squat',
    'Deadlift',
    'Barbell Row'
  ];
  const availableSets = [1, 2, 3, 4, 5];

  const [exercise, setExercise] = React.useState('Bench Press');
  const [reps, setReps] = React.useState('');
  const [sets, setSets] = React.useState(1);
  const [weight, setWeight] = React.useState('');

  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.row}>
          <Text>Exercise</Text>
          <Text>Weight</Text>
        </View>
        <View style={styles.row}>
          <Picker
            selectedValue={exercise}
            style={styles.exercisePicker}
            onValueChange={(itemValue) =>
              setExercise(itemValue)
            }
          >
            {availableExercises.map((exercise) => (
              <Picker.Item key={exercise} label={exercise} value={exercise} />
            ))}
          </Picker>
          <TextInput 
            style={styles.numericInput}
            keyboardType = 'numeric'
            onChangeText = {(weight: string)=> setWeight(weight)}
            value = {weight}
          /> 
        </View>
        <View style={styles.row}>
          <Text>Sets</Text>
          <Text>Reps</Text>
        </View>
        <View style={styles.row}>
          <Picker
            selectedValue={sets}
            style={styles.exercisePicker}
            onValueChange={(itemValue) =>
              setSets(itemValue)
            }
          >
            {availableSets.map((set) => (
              <Picker.Item key={set} label={set.toString()} value={set} />
            ))}
          </Picker>
          <TextInput
            style={styles.numericInput} 
            keyboardType = 'numeric'
            onChangeText = {(repValue: string)=> setReps(repValue)}
            value = {reps}
          /> 
        </View>
        <View style={styles.row}>
          <Button
            title='Add exercise'
            onPress={() => onAddPress(exercise, sets, reps, weight)}
          />
          <Button 
            title='Cancel'
            onPress={() => onCancelPress()}
          />
        </View>
      </Card>
    </View>
  );
}