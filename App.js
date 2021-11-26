import React from 'react';
import {SafeAreaView} from 'react-native';
import Router from './src/navigation/router';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'backgroundColor'}}>
      <Router />
    </SafeAreaView>
  );
};

export default App;
