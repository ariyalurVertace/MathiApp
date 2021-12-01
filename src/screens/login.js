import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {AsyncStorage} from 'react-native';

// import * as COLOR_CONSTANT from "../common/constants/color_constants";

export default class Login extends React.Component {
  state = {
    mobile: '',
    Password: '',
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <StatusBar backgroundColor={'red'} barStyle="light-content" />
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Image
              style={{
                borderRadius: 5,
                width: 180,
                height: 180,
                resizeMode: 'contain',
              }}
              source={{
                uri: 'https://mcdn.wallpapersafari.com/medium/90/43/xe1lmt.jpg',
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
                onChangeText={text =>
                  this.setState({mobile1: text.trim()}
                  )
                }
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
                // this.login();
                this.setState({mobile: this.state.mobile1});


                // this.props.navigation.navigate('home');
              }}
              style={styles.loginBtn}>
              <Text style={styles.loginText}>{'Login'}</Text>
            </TouchableOpacity>
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
    width: '80%',
    backgroundColor: 'red',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  loginText: {
    color: 'white',
  },
  appText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
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
    color: 'black',
  },
});
