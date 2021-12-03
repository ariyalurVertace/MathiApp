import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export default class home extends React.Component {
  state = {
    films: [],
  };

  componentDidMount() {
    this.getMoviesFromApi();
  }

  async getMoviesFromApi() {
    try {
      // let response = await axios('Your URL to fetch data from');
      let result = await axios({
        method: 'get',
        url: 'https://jsonplaceholder.typicode.com/users',
        // data: {pageNumber: 1, pageLimit: 1},
      });

      this.setState({films: result.data});

      console.warn(JSON.stringify(result));
    } catch (error) {
      console.error(error);
    }
  }

  renderItem({item}) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.item}
        onPress={() => {
          //function
          console.warn(item.title);
        }}>
        <Text style={styles.title}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    let {films} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={films}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
