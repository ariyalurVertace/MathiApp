import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon } from 'react-native';

// Our custom files and classes import
// import Colors from '../Colors';

export default class Navbar extends Component {
  render() {
    return(
      <Header
        style={{backgroundColor: "#2c3e50"}}
        backgroundColor={"#2c3e50"}
        androidStatusBarColor={"233240"}
        noShadow={true}
        >
        {this.props.left ? this.props.left : <Left style={{flex: 1}} />}
        <Body style={styles.body}>
          <Title style={styles.title}>{this.props.title}</Title>
        </Body>
        {this.props.right ? this.props.right : <Right style={{flex: 1}} />}
      </Header>
    );
  }
}

const styles={
  body: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: '100'
  }
};