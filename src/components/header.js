import React from 'react';
import {TouchableHighlight, StyleSheet, View, Text} from 'react-native';
// import {withNavigation} from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';
import {getHeightFromPercentage} from '../functions/utils';
import * as COLOR_CONSTANT from '../constants/color_constants';

const CustomHeader = props => {
  const {title, navigation, back, onBackPress} = props;

  return (
    <View style={styles.container}>
      <View style={[styles.titleBar]}>
        {back && (
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
              if (onBackPress) {
                onBackPress();
              } else {
                navigation.goBack();
              }
            }}
            style={styles.searchIcon}>
            <View>
              <Icon
                color={COLOR_CONSTANT.THEME_COLOR}
                name="angle-left"
                size={35}
              />
            </View>
          </TouchableHighlight>
        )}
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleLabel}>{title || ''}</Text>
        </View>
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  searchIcon: {
    zIndex: 3,
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
  },
  titleTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 50,
  },
  titleLabel: {
    // alignSelf: "center",
    textAlign: 'right',
    // textAlignVertical: "center",
    fontSize: 18,
    color: COLOR_CONSTANT.THEME_COLOR,
  },
  hamburgerContainer: {
    zIndex: 2,
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    paddingLeft: 15,
    height: '100%',
    width: '15%',
  },
  titleBar: {
    flexDirection: 'row',
    // backgroundColor: COLOR_CONSTANT.THEME_COLOR,
    // alignItems: "center",
    // justifyContent: "center",
    height: getHeightFromPercentage(5),
  },
  rightIcon: {
    width: '20%',
    paddingHorizontal: 10,
    zIndex: 3,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
});
