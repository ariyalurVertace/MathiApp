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

export default class Login extends React.Component {
  state = {
    mobile: '',
    Password: '',
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <StatusBar backgroundColor={'black'} barStyle="light-content" />
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Image
              style={{
                width: 250,
                height: 180,
                resizeMode: 'contain',
              }}
              source={{
                uri:
                  'https://images.unsplash.com/photo-1471879832106-c7ab9e0cee23?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
              }}
              imageStyle={{
                resizeMode: 'contain',
              }}
            />
            <View style={styles.appTextContainer}>
              <Text style={styles.appText}>{'MATHI'}</Text>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Mobile number"
                placeholderTextColor="gray"
                keyboardType={'numeric'}
                maxLength={10}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.otpInput.focus();
                }}
                onChangeText={text => this.setState({mobile: text.trim()})}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                secureTextEntry
                ref={input => {
                  this.otpInput = input;
                }}
                style={styles.inputText}
                placeholder="Password"
                placeholderTextColor="gray"
                // keyboardType={"numeric"}
                returnKeyType={'done'}
                onChangeText={text => this.setState({Password: text.trim()})}
              />
            </View>
            
            <TouchableOpacity
              onPress={async () => {
               
                this.props.navigation.navigate('settings');
              }}
              style={styles.loginBtn}>
              <Text style={styles.loginText}>{'Login'}</Text>
            </TouchableOpacity>
            <View style={styles.signupTextCont}>
            
            <Text style={styles.signupText}>If you have not a Account? 
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('register')}>
            <Text style={styles.signupButton}>Register here
             </Text>
            </TouchableOpacity>
             </Text> 
            </View>
            </View>
         
        </ScrollView>
        <View style={styles.poweredByContainer}>
          <Text style={styles.poweredBy}>{'Built with ❤️ by Vertace'}</Text>
        </View>
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
  contentContainerStyle: {flexGrow: 1, justifyContent: 'center'},
  spinnerTextStyle: {
    color: '#0076d5',
  },
  logo: {
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#dedede',
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '50%',
    backgroundColor: '#34eba4',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 20,
   

  },
  loginText: {
    color: 'white',
    fontWeight: 'bold', 
    fontStyle:"italic",
    fontSize:16,
    
  },
  appText: {
    color: '#34eba4',
    fontSize: 22,
    fontWeight: 'bold', 
    fontStyle:"italic"
  },
  meetingNameText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  appTextContainer: {
    marginTop: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  registerText: {
    color: '#fb5b5a',
  },
  footerContainer: {
    justifyContent: 'flex-end',
  },
  poweredByContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  poweredBy: {
    textAlignVertical: 'center',
    alignSelf: 'center',
    fontSize: 13,
    color: '#a8324c',
  },
  signupText: {
    textAlignVertical: 'center',
    alignSelf: 'center',
    fontSize: 13,
    color: 'black',
    fontWeight:"bold", 
    fontStyle:"italic"
  
  },
  signupButton: {
    fontSize: 13,
    color: 'blue',
    paddingTop:5,
    fontWeight:"bold", 
    fontStyle:"italic"
  },
});
