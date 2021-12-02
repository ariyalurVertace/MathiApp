import React, { Fragment } from 'react';
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

import { Header } from 'react-native-elements';
// import * as COLOR_CONSTANT from "../common/constants/color_constants";

export default class Home extends React.Component {
  state = {
    mobile: '',
    Password: '',
  };
  
  componentDidMount(){
  }

  render() {
    return (
    <Fragment>
     
      <Header
       leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff'} }}
       centerComponent={{ text: 'HOME', style: { color: '#fff' } }}
       rightComponent={{ icon: 'home', color: '#fff' }}
      />
       <TouchableOpacity
              onPress={async () => {
                this.props.navigation.navigate('login');
              }}
              style={styles.loginBtn}>
              <Text style={styles.procol} >{'Menu'no}</Text>
            </TouchableOpacity>
        {/* <View >
        <Text style={styles.title}>Home
        </Text>
      </View> */}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#26d5de',
  },
  title:
  {
    fontSize:30,
    color:'black',
    textAlign:"center",
    justifyContent:"center",
  },
  procol:
  {
   color:'black', 
  fontWeight:'bold',
  }
 
});

