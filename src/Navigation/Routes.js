import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EnterUsers from '../Screens/EnterUsers/EnterUsers';
import SelectUser from '../Screens/SelectUser/SelectUser';
import ChatScreen from '../Screens/ChatScreen/ChatScreen';

const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="EnterUsers"
          component={EnterUsers}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="SelectUser"
          component={SelectUser}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
 <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
