import * as React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { observer } from 'mobx-react-lite';

interface Props {
  exercise: string,
  repsAndWeight: string,
  sets: string[];
  onSetPress: (index: number) => void;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 3,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    flexDirection: 'column',
    padding: 10,
    marginBottom: 10
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  topRowText: {
    fontSize: 16
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14
  },
  circle: {
    borderRadius: 25,
    backgroundColor: '#8fb299',
    height: 50,
    width: 50
  },
  whiteText: {
    color: '#fff'
  },
  circleText: {
    fontSize: 16,
    margin: 'auto'
  },
  fadedBackground: {
    backgroundColor: '#b2a1a1'
  }
});

export const WorkoutCard : React.FC<Props> = observer(({ exercise, repsAndWeight, sets, onSetPress }) => {
    const _getStylesForCircle = (set: string) => {
      const bottomRowStyles: Array<object> = [styles.circle]
      if (set === 'x' || set === '') {
        bottomRowStyles.push(styles.fadedBackground)
      }

      return bottomRowStyles;
    }

    return (
      <View style={styles.card}>
        <View style={styles.topRow}>
          <Text style={styles.topRowText}>{exercise}</Text>
          <Text>{repsAndWeight}</Text>
        </View>
        <View style={styles.bottomRow}>
          {sets.map((set, index) => {
            const markup = ( 
              <TouchableOpacity onPress={() => onSetPress(index)} style={_getStylesForCircle(set)} key={set + index}>
                <Text style={[styles.whiteText, styles.circleText]}>{set}</Text>
              </TouchableOpacity> 
            )

            return markup;
          })}
        </View>
      </View>
    );
});
