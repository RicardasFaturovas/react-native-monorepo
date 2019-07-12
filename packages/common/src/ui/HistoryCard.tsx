import * as React from 'react';
import { Text } from 'react-native';
import { Card } from './Card';
import { CurrentExercise } from '../stores/WorkoutStore';

interface Props {
  header: string;
  currentExercises: CurrentExercise[];
};

const exerciseShortName = {
  Squat: 'SQ',
  Deadlift: 'DL',
  'Bench Press': 'BP',
  'Overhead Press': 'OHP',
  'Barbell Row': 'ROW'
};

export const HistoryCard: React.FC<Props> = ({ header, currentExercises }) => {
    return (
      <Card>
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
