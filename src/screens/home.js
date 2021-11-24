/* eslint-disable global-require */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-template */
/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */

import React from "react";
import {
    StatusBar,
    Image,
    TouchableHighlight,
    Platform,
    StyleSheet,
    View,
    FlatList,
    Text,
} from "react-native";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {PERMISSIONS} from "react-native-permissions";
import {connect} from "react-redux";
import {scale} from "../common/functions/scaling";
import CustomHeader from "../common/components/header";
import * as COLOR_CONSTANT from "../common/constants/color_constants";
import {permissionCheck} from "../common/functions/permission_check";
import {getLocalUser} from "../common/functions/local_storage";
import {setSnackbarText} from "../common/redux/common_reducer";
import Store from "../common/redux/store";

const modules = [
    {
        name: "Feed back",
        intlText: "Feedback",
        route: "feedbackList",
        image: require(`../images/feedback.png`),
        label: "Feedback",
        tamilLablel: "கருத்து",
    },
    {
        name: "eBeat",
        intlText: "eBeat",
        route: "eBbeat",
        image: require(`../images/location.png`),
        label: "eBeat",
        tamilLablel: "இ-பீட்",
    },
    {
        name: "welfare",
        intlText: "Welfare",
        route: "",
        image: require(`../images/children.png`),
        label: "Welfare",
        tamilLablel: "நல்வாழ்வு",
    },
    {
        name: "ReachMe",
        intlText: "reachme",
        route: "",
        image: require(`../images/hands.png`),
        label: "ReachMe",
        tamilLablel: "ரீச்மீ",
    },
    // {
    //     name: "officer directory",
    //     intlText: "eBeat",
    //     route: "officerDirectory",
    //     image: require(`../images/police.png`),
    //     label: "Officers Directory",
    //     tamilLablel: "அதிகாரிகள் கையேடு",
    // },
    {
        name: "police officer directory",
        intlText: "eBeat",
        route: "policeOfficerDirectory",
        image: require(`../images/police.png`),
        label: "Police Directory",
        tamilLablel: "அதிகாரிகள் கையேடு",
    },
    {
        name: "people directory",
        intlText: "eBeat",
        route: "",
        image: require(`../images/directory.png`),
        label: "People Directory",
        tamilLablel: "மக்கள் கையேடு",
    },

    {
        name: "About",
        intlText: "About",
        route: "",
        image: require(`../images/user.png`),
        label: "About App",
        tamilLablel: "செயலி பற்றி",
    },
    {
        name: "settings",
        intlText: "settings",
        route: "settings",
        image: require(`../images/settings.png`),
        label: "Settings",
        tamilLablel: "அமைப்புகள்",
    },
];

class HomeScreen extends React.Component {
    INITIAL_STATE = {
        FCMId: "",
        count: 0,
        silentUpdate: true,
        isLiveClass: "",
    };

    constructor(props) {
        super(props);
        this.state = this.INITIAL_STATE;
    }

    async componentDidMount() {
        let user = await getLocalUser();

        await permissionCheck(
            Platform.OS === "android"
                ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
                : PERMISSIONS.IOS.ACCESS_FINE_LOCATION,
            "Police app -Location Permission",
            "Police app need your Location",
        );
    }

    _keyExtractor = item => item.name;

    calculateItemMargin = index => {
        const style = {marginHorizontal: scale(30)};

        if (index !== 0 && index !== 1) style.marginTop = scale(60);
        return style;
    };

    renderItem = ({item, index}) => {
        let {common} = this.props;

        return (
            <TouchableHighlight
                style={[styles.Card, this.calculateItemMargin(index)]}
                underlayColor="#FFFFFF"
                onPress={() => {
                    if (item.route) {
                        this.props.navigation.navigate(item.route);
                    } else {
                        Store.dispatch(setSnackbarText("Coming soon"));
                    }
                }}
            >
                <View style={styles.center}>
                    <Image
                        source={item.image}
                        style={([styles.iconDisplay], {height: 70, width: 70, marginBottom: 10})}
                    />
                    <Text style={styles.CardLabel}>
                        {common.language === "தமிழ்" ? item?.tamilLablel : item?.label}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    };

    emptyList = () => {
        return (
            <View style={styles.emptyContainer}>
                <View style={styles.labelContainer}>
                    <Text style={styles.text}>{"NO MODULES AVAILABLE"}</Text>
                </View>
            </View>
        );
    };

    renderModules() {
        return (
            <FlatList
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingVertical: scale(60),
                    paddingHorizontal: scale(30),
                }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={this.emptyList()}
                data={modules}
                numColumns={2}
                keyExtractor={this._keyExtractor}
                renderItem={this.renderItem}
            />
        );
    }

    render() {
        let {common} = this.props;

        return (
            <View style={styles.container}>
                <View
                    style={{
                        height: getStatusBarHeight(),
                        backgroundColor: COLOR_CONSTANT.THEME_COLOR,
                        zIndex: 2,
                    }}
                >
                    {((Platform.Version > 22 && Platform.OS === "android") ||
                        Platform.OS === "ios") && (
                        <StatusBar backgroundColor="white" barStyle="dark-content" />
                    )}
                </View>
                <CustomHeader
                    title={common?.labels?.HOME ? common.labels.HOME : "HOME"}
                    navigation={this.props.navigation}
                />
                <View style={styles.menuContainer}>{this.renderModules()}</View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {common: state.common};
};

export default connect(mapStateToProps, null)(HomeScreen);

const styles = StyleSheet.create({
    container: {
        backgroundColor:
            Platform.OS === "android" && Platform.Version <= 19 ? "#E5E5E5" : "#FAFAFA",
        flex: 1,
        justifyContent: "center",
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
    iconContainer: {
        padding: scale(10),
    },
    labelContainer: {
        marginHorizontal: 20,
        alignSelf: "center",
    },

    titleBar: {
        zIndex: 1,
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 50,
        height: "8%",
        elevation: 5,
        shadowColor: "#00000025",
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 1,
        shadowRadius: 10,
    },

    text: {
        fontSize: 18,
        fontFamily: Platform.OS === "ios" ? "SFProDisplay-Medium" : "sfprotdisplay_medium",
        textAlign: "center",
        textAlignVertical: "center",
        alignSelf: "center",
        padding: scale(10),
    },

    transparentOverlay: {
        position: "absolute",
        left: 0,
        top: 0,
        opacity: 0.5,
        backgroundColor: "black",
        width: "100%",
        height: "100%",
    },
    titleTextContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    titleLabel: {
        fontSize: 18,
        textAlign: "center",
        textAlignVertical: "center",
        fontFamily: Platform.OS === "ios" ? "SFProDisplay-Medium" : "sfprodisplay_medium",
    },
    menuContainer: {
        flex: 1,
        backgroundColor:
            Platform.OS === "android" && Platform.Version <= 19 ? "#E5E5E5" : "#FAFAFA",
        height: "90%",
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
    },

    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:
            Platform.OS === "android" && Platform.Version <= 19 ? "#E5E5E5" : "#FAFAFA",
    },

    Card: {
        flex: 1,
        maxWidth: scale(275),
        height: scale(275),
        backgroundColor: "#FFFFFF",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        elevation: 12,
        shadowColor: "#00000030",
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    CardLabel: {
        fontSize: 14,
        textAlign: "center",
        marginHorizontal: 5,
    },
    iconDisplay: {
        marginBottom: 20,
    },
});
