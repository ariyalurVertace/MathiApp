/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
/* eslint-disable no-confusing-arrow */
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
    TouchableHighlight,
    Platform,
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
} from "react-native";

// import STRINGS from "../../constants/strings";

const Button = props => {
    return (
        <TouchableHighlight
            disabled={props.disabled}
            underlayColor="#59C4A785"
            onPress={() => props.onPress()}
            style={[
                styles.container,
                props.containerStyle,
                props.disabled ? styles.disabledContainer : {},
            ]}
        >
            <View>
                {props.loading ? (
                    <ActivityIndicator size="large" color="#44444450" />
                ) : (
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>{props.text ? props.text : "CLICK"}</Text>
                    </View>
                )}
            </View>
        </TouchableHighlight>
    );
};

export default Button;

const styles = StyleSheet.create({
    container: {
        height: 45,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        elevation: 1,
        shadowColor: "#59C4A750",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 15,
        backgroundColor: "#03ab7d",
        borderRadius: 5,
    },
    disabledContainer: {
        backgroundColor: "#9bc6bb",
    },
    textContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    textStyle: {
        alignSelf: "center",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 15,
        color: "white",
        fontFamily: Platform.OS === "ios" ? "SFProDisplay-Bold" : "sfprodisplay_bold",
    },
});
