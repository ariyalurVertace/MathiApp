import React from "react";
import {StatusBar, TouchableHighlight, Platform, StyleSheet, View, Text} from "react-native";
// import {withNavigation} from "react-navigation";
import {getStatusBarHeight} from "react-native-status-bar-height";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicon from "react-native-vector-icons/Ionicons";
import {connect} from "react-redux";
import {getHeightFromPercentage} from "../functions/utils";
import * as COLOR_CONSTANT from "../constants/color_constants";
import {getNavigationDrawerHome, getNavigationFilterHome} from "../functions/drawerFunction";

import checkIsFiltered from "./feedbackfilter";

const CustomHeader = props => {
    const {title, navigation, back, hamburger, Right, Filter, isFiltered} = props;
    const navigationDrawerHome = getNavigationDrawerHome();
    const navigationFilterHome = getNavigationFilterHome();
    return (
        <View style={styles.container}>
            <View
                style={{
                    height: getStatusBarHeight(true),
                    zIndex: 3,
                }}
            >
                {((Platform.Version > 22 && Platform.OS === "android") ||
                    Platform.OS === "ios") && (
                    <StatusBar
                        backgroundColor={"transparent"}
                        translucent
                        barStyle="light-content"
                    />
                )}
            </View>
            <View style={[styles.titleBar]}>
                {hamburger && (
                    <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() => navigationDrawerHome.openDrawer()}
                        style={styles.hamburgerContainer}
                    >
                        <Ionicon name="ios-menu" size={25} color={"white"} />
                    </TouchableHighlight>
                )}

                {back && (
                    <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() => navigation.goBack()}
                        style={styles.searchIcon}
                    >
                        <View>
                            <Icon color="white" name="angle-left" size={35} />
                        </View>
                    </TouchableHighlight>
                )}
                <View style={styles.titleTextContainer}>
                    <Text style={styles.titleLabel}>{title || ""}</Text>
                </View>
                {Filter && (
                    <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() => navigationFilterHome.openDrawer()}
                        style={styles.rightIcon}
                    >
                        <View>
                            <Icon name="filter" size={25} color={"white"} />
                            {isFiltered && (
                                <Icon
                                    name="check"
                                    style={styles.absoluteIcon}
                                    size={10}
                                    color={"white"}
                                />
                            )}
                        </View>
                    </TouchableHighlight>
                )}
                {Right && Right}
            </View>
        </View>
    );
};

const mapStateToProps = state => {
    const isFiltered = checkIsFiltered(state);

    return {isFiltered};
};

export default connect(mapStateToProps, null)(CustomHeader);

// export default CustomHeader;

const styles = StyleSheet.create({
    container: {
        zIndex: 2,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
    },
    searchIcon: {
        zIndex: 3,
        width: "15%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: 0,
    },
    titleTextContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    titleLabel: {
        alignSelf: "center",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 18,
        color: "white",
    },
    hamburgerContainer: {
        zIndex: 2,
        justifyContent: "center",
        position: "absolute",
        left: 0,
        paddingLeft: 15,
        height: "100%",
        width: "15%",
    },
    titleBar: {
        flexDirection: "row",
        backgroundColor: COLOR_CONSTANT.THEME_COLOR,
        alignItems: "center",
        justifyContent: "center",
        height: getHeightFromPercentage(8),
    },
    rightIcon: {
        width: "20%",
        paddingHorizontal: 10,
        zIndex: 2,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: 0,
    },
    absoluteIcon: {
        position: "absolute",
        top: -5,
        right: -10,
    },
});
