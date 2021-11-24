import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
// import * as COLOR_CONSTANT from "../common/constants/color_constants";

export default class Home extends React.Component {
  state = {
    mobile: '',
    Password: '',
  };

  render() {
    return (
      <View>
        <Text>Home</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
