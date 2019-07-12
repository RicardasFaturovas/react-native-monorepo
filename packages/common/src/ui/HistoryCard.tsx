import * as React from 'react';
import { Text } from 'react-native';

import { ICurrentExercise } from '../stores/WorkoutStore';
import { Card } from './Card';

interface Props {
  header: string;
  currentExercises: ICurrentExercise[];
  onPress: () => void;
};

const exerciseShortName = {
  Squat: 'SQ',
  Deadlift: 'DL',
  'Bench Press': 'BP',
  'Overhead Press': 'OHP',
  'Barbell Row': 'ROW'
};

export const HistoryCard: React.FC<Props> = ({ header, currentExercises, onPress }) => {
    return (
      <Card onPress={onPress}>
        <Text>{header}</Text>
        {currentExercises.map(currExercise => {
          return (
            <Text key={currExercise.exercise}>
              {`${exerciseShortName[currExercise.exercise as keyof typeof exerciseShortName]} ${currExercise.setsNumber}x${currExercise.reps} ${currExercise.weight}`}
            </Text>
          );
        })}
      </Card>
    );
};
