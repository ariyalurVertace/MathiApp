import React,
{Component} from 'react';
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
  SearchBar
} from 'react-native';

import login from "./login"
// import * as COLOR_CONSTANT from "../common/constants/color_constants";

export default class Home extends Component {
  state = {
    search:'',
  };
  updateSearch = (search) => 
  {   
 this.setState({ search }); 
 };
 
  render() {
    const search = this.state.value;
    // let name=localStorage.getItem("mobile")
    console.warn(search)
    return (
      <View>    
    <SearchBar style={styles.container}>    
    placeholder="Type Here..."      
    onChangeText={this.updateSearch}     
    value={search}      
    </SearchBar>    
    <Text style={styles.title}>Home</Text>
    </View>
   
       
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'blue',
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
