import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
export default class Splash extends Component {
  state = {
    isVisible: true,
  };
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('login');
    }, 2000);
  }

  render() {
    let Splash_Screen = (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          <Image
            source={{
              uri: 'https://mcdn.wallpapersafari.com/medium/90/43/xe1lmt.jpg',
            }}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </View>
      </View>
    );
    return (
      <View style={styles.MainContainer}>
        {this.state.isVisible === true ? Splash_Screen : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  SplashScreen_RootView: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },

  SplashScreen_ChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
