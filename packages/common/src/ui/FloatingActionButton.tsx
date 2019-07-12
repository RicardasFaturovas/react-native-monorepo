import * as React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

interface Props {
  onPress: () => void;
}

const styles = StyleSheet.create({
  floatingActionButton: {
    width: 40,
    height: 40,
    backgroundColor: '#8fb299',
    position: 'absolute',
    bottom: 60,
    right: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 18,
    marginLeft: 2,
    marginBottom: 2,
    fontWeight: 'bold'
  }
});

export const FloatingActionButton: React.FC<Props> = ({ onPress }) => {
    return (
      <TouchableOpacity
        onPress={onPress} 
        style={styles.floatingActionButton}
      >
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    );
}