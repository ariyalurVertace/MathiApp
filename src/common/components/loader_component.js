import React from "react";
import {connect} from "react-redux";
import {StyleSheet, View, Modal, ActivityIndicator} from "react-native";

export const LoadingComponent = () => {
    return (
        <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
                <ActivityIndicator size="large" color={"black"} animating />
            </View>
        </View>
    );
};

class Loader extends React.Component {
    render() {
        const {isPageLoading} = this.props;
        return (
            <Modal
                transparent={true}
                animationType={"none"}
                visible={isPageLoading}
                onRequestClose={() => {
                    console.log("close modal");
                }}
            >
                {LoadingComponent()}
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return state.common;
};

export default connect(mapStateToProps, null)(Loader);

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "#00000040",
    },
    activityIndicatorWrapper: {
        backgroundColor: "white",
        height: 100,
        width: 100,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
    },
});
