/* eslint-disable global-require */
import React from "react";
import {StyleSheet, View, Platform} from "react-native";
import LottieView from "lottie-react-native";

export default class Loading extends React.Component {
    componentDidMount() {
        this.loading.play();
    }

    render() {
        // const {loadingText} = this.props;
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View style={styles.animationStyle}>
                    <LottieView
                        style={{
                            width: 200,
                            height: 200,
                        }}
                        speed={1.5}
                        loop
                        ref={loading => {
                            this.loading = loading;
                        }}
                        source={require("../animations/loading.json")}
                    />
                    {/* <View style={styles.loadingTextContainer}>
                            <Text style={styles.textStyle}>
                                {"LOADING"}
                            </Text>
                        </View> */}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    animationStyle: {
        width: 200,
        height: 200,
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
        fontSize: 14,
        color: "#0873F1",
        fontFamily: Platform.OS === "ios" ? "SFProText-Light" : "sfprotext_light",
    },
});
