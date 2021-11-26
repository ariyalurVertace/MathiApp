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
  AsyncStorage,
} from 'react-native';
import login from "./login"
// import * as COLOR_CONSTANT from "../common/constants/color_constants";

export default class Home extends React.Component {
  state = {
    mobile: '',
    Password: '',
  };
  ajithkumar = async () => {
    try {
      const value = await AsyncStorage.getItem('lastname');
      console.warn(value)
      this.setState({value:value})
    } catch (error) {
    }
  };

  componentDidMount(){  
    this.ajithkumar();
   } 
  render() {
    // let name=localStorage.getItem("mobile")
    const lastname = this.state.value;
    console.warn(lastname)
    return (
      <View>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.title}>{lastname}</Text>
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
  title:
  {
    fontSize:30,
    padding: 10,
    textAlign:"left",
    color:'white',
    backgroundColor:'black',
    fontWeight:"bold",
  }
});
