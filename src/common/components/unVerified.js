/* eslint-disable global-require */
import React from "react";
import {StyleSheet, View, Platform, Text} from "react-native";
import LottieView from "lottie-react-native";

export default class UnVerified extends React.Component {
    componentDidMount() {
        // this.loading.play();
    }

    render() {
        const {loadingText} = this.props;
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View style={styles.animationStyle}>
                    <View style={styles.loadingTextContainer}>
                        <Text style={styles.textStyle}>{loadingText}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    animationStyle: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        // marginTop: -70
    },
    loadingTextContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
    },
    textStyle: {
        alignSelf: "center",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 20,
        color: "#0873F1",
        // fontFamily: Platform.OS === "ios" ? "SFProText-Light" : "sfprotext_light",
    },
});
