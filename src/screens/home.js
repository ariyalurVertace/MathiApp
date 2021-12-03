import React, {Fragment, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import {Header, SearchBar} from 'react-native-elements';
// // import * as COLOR_CONSTANT from "../common/constants/color_constants";

// export default class Home extends React.Component {
//   state = {
//     mobile: '',
//     Password: '',
//   };

//   componentDidMount() {}

//   render() {
//     return (
//       <Fragment>
//         <TouchableOpacity>
//           <Header
//             onPress={async () => {
//               this.props.navigation.navigate('login');
//             }}
//             style={styles.procol}
//             leftComponent={{
//               icon: 'menu',
//               color: '#fff',
//               iconStyle: {color: '#fff'},
//             }}
//             centerComponent={{text: 'HOME', style: {color: '#fff'}}}
//             rightComponent={{icon: 'home', color: '#fff'}}
//           />
//         </TouchableOpacity>

//         {/* <Text style={styles.procol} >{'Menu'}</Text> */}
//         {/* <View >
//         <Text style={styles.title}>Home
//         </Text>
//       </View> */}
//       </Fragment>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#26d5de',
//   },
//   title: {
//     fontSize: 30,
//     color: 'black',
//     textAlign: 'center',
//     justifyContent: 'center',
//   },
//   procol: {
//     color: 'black',
//     fontWeight: 'bold',
//   },
// });
// Example of Slider Image Gallery in React Native
// https://aboutreact.com/example-of-slider-image-gallery-in-react-native/

// import React in our code
// import React, { useState, useEffect, Fragment } from 'react';

// import all the components we are going to use
// import { SafeAreaView, StyleSheet, View } from 'react-native';

//import React in our project
import Gallery from 'react-native-image-gallery';
import Search from './search';

const App = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    let items = Array.apply(null, Array(10)).map((v, i) => {
      //Loop to make image array to show in slider
      return {
        source: {
          uri: 'http://placehold.it/200x100?text=' + (i + 1),
        },
      };
    });
    setItems(items);
  }, []);
  const searchFunction = text => {
    setSearch(text);
  };

  return (
    <Fragment>
      <View style={styles.container}>
        <StatusBar />
        <Header
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            iconStyle: {color: '#fff'},
          }}
          centerComponent={{text: 'HOME', style: {color: '#fff'}}}
          rightComponent={{icon: 'home', color: '#fff'}}
        />
        <SearchBar
          placeholder="Search Here..."
          lightTheme
          round
          value={search}
          onChangeText={text => searchFunction(text)}
          autoCorrect={false}
        />
        <Gallery
          style={{flex: 1, backgroundColor: 'black'}}
          initialPage="1"
          //initial image to show
          images={items}
        />
      </View>
    </Fragment>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
    marginTop: 30,
  },
});
