import React, {Component} from 'react';
import {Alert, AppRegistry, StyleSheet, View} from 'react-native';

export default class ButtonBasics extends Component {
  render() {
    return (
      <Fragment>
        <View style={styles.container}></View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.onPressButton}
            title="Press Me"
            color="#009933"
          />
        </View>
        <View style={styles.multiButtonContainer}>
          <Button
            onPress={this.onPressButton}
            title="A disabled button"
            disabled={true}
          />
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  multiButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
