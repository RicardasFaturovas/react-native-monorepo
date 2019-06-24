import React from 'react';
import { View, StyleSheet} from 'react-native';
import { observer } from "mobx-react-lite";
import { Router } from './Router';

export const App = observer(() => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Router />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    },
    wrapper: {
      flex: 1,
      backgroundColor: '#F5FCFF',
      width: '100%',
      maxWidth: 425
    }
  });


