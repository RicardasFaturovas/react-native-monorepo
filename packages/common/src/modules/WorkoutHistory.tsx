import * as React from 'react'
import { Text, View, Button } from 'react-native';
import { observer } from 'mobx-react-lite';
import { RouterStoreContext } from '../stores/RouterStore';

interface Props {}

export const WorkoutHistory: React.FC<Props> = observer(() => {
  const routerStore = React.useContext(RouterStoreContext);

  return (
    <View>
      <Text>Workout history page</Text>
      <Button
        title="Create workout"
        onPress={() => routerStore.screen ="CurrentWorkout"}
       />
    </View>
  );
});