import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home';
import Login from '../screens/login';
import Splash from '../screens/splash';
import Register from '../screens/register';
import Settings from '../screens/settings';
import {navigationRef} from './navigation_service';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen
          name="splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{
            headerShown: false,
          }}
          />
          <Stack.Screen
          name="settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
          />
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
