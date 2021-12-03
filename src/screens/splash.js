/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StatusBar} from 'react-native';

export default class SplashScreen extends React.Component {
  //   state = {
  //     mobile: '',
  //     Password: '',
  //   };

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('login');
    }, 1000);
  }

  render() {
    return (
      <View
        style={{
          height: '100%',
          backgroundColor: 'green',
          flexDirection: 'row',
        }}>
        <StatusBar backgroundColor={'black'} />

        <View
          style={{
            height: '50%',
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 30}}>Hello world</Text>
        </View>
        <View style={{height: '50%', backgroundColor: 'pink'}}>
          <Text>Welcome</Text>
        </View>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
