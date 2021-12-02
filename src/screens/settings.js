
import React from 'react';
import {View, Text, SafeAreaView,StyleSheet,TouchableOpacity} from 'react-native';

const SettingsScreen = (props) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginBottom: 16,
            }}>
           <TouchableOpacity
              onPress={async () => {
               
                props.navigation.navigate('login');
              }}
              style={styles.Myorders}>
              <Text style={styles.Myorders}>{'My Orders'}</Text>
            </TouchableOpacity>
            {'\n\n'}
           
          <TouchableOpacity
              onPress={ () => {
               
                props.navigation.navigate('login');
              }}
              style={styles.Myaddress}>
              <Text style={styles.Myaddress}>{'My address'}</Text>
            </TouchableOpacity>
          {'\n\n'}
          <TouchableOpacity
              onPress={ () => {
               
                props.navigation.navigate('login');
              }}
              style={styles.Myfavorite}>
              <Text style={styles.Myfavorite}>{'My favorite'}</Text>
            </TouchableOpacity>
          {'\n\n'}
          <TouchableOpacity
              onPress={ () => {
               
                props.navigation.navigate('login');
              }}
              style={styles.Mycart}>
              <Text style={styles.Mycart}>{'My cart'}</Text>
            </TouchableOpacity>
          {'\n\n'}
          <TouchableOpacity
              onPress={async () => {
               
                props.navigation.navigate('login');
              }}
              style={styles.Myreviwes}>
              <Text style={styles.Myreviwes}>{'My Reviews'}</Text>
            </TouchableOpacity>
          {'\n\n'}
          <TouchableOpacity
              onPress={async () => {
               
                props.navigation.navigate('login');
              }}
              style={styles.About}>
              <Text style={styles.About}>{'About'}</Text>
            </TouchableOpacity>
          {'\n\n'}
          <TouchableOpacity
              onPress={async () => {
               
                props.navigation.navigate('login');
              }}
              style={styles.Help}>
              <Text style={styles.Help}>{'Help'}</Text>
            </TouchableOpacity>
          {'\n\n'}
          <TouchableOpacity
              onPress={async () => {
               
                props.navigation.navigate('login');
              }}
              style={styles.Termsconditions}>
              <Text style={styles.Termsconditions}>{'Terms&Conditions'}</Text>
            </TouchableOpacity>
          {'\n\n'}
          <TouchableOpacity
              onPress={async () => {
               
                props.navigation.navigate('login');
              }}
              style={styles.Logout}>
              <Text style={styles.Logout}>{'Log out'}</Text>
            </TouchableOpacity>
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey',
          }}>
          Settings Screen{'\n'}Build by Thangadurai D
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey',
          }}>
          www.Mathi.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
const styles = StyleSheet.create({
  Myorders: {
    color: 'black',
    fontWeight: 'bold', 
    fontStyle:"italic",
    fontSize:16,  
  },
  Myreviwes: {
    color: 'black',
    fontWeight: 'bold', 
    fontStyle:"italic",
    fontSize:16,    
  },
  Myaddress: {
    color: 'black',
    fontWeight: 'bold', 
    fontStyle:"italic",
    fontSize:16,    
  },
  About: {
    color: 'black',
    fontWeight: 'bold', 
    fontStyle:"italic",
    fontSize:16,    
  },
  Logout: {
    color: 'black',
    fontWeight: 'bold', 
    fontStyle:"italic",
    fontSize:16,
  },
  Myfavorite: {
    color: 'black',
    fontWeight: 'bold', 
    fontStyle:"italic",
    fontSize:16,
  },
  Mycart: {
    color: 'black',
    fontWeight: 'bold', 
    fontStyle:"italic",
    fontSize:16,
  },
  Help: {
    color: 'black',
    fontWeight: 'bold', 
    fontStyle:"italic",
    fontSize:16,
    
  },
  Termsconditions: {
    color: 'black',
    fontWeight: 'bold', 
    fontStyle:"italic",
    fontSize:16,
  },

});