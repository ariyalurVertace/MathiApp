import React from 'react';
import {SafeAreaView} from 'react-native';
import Router from './src/navigation/router';

const App = () => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <Router />
    </SafeAreaView>
  );
};

export default App;
