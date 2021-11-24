import React from "react";
import Modal from "react-native-modal";
import {Text, View, StyleSheet, TouchableHighlight, Dimensions} from "react-native";

const {height} = Dimensions.get("window");

class CameraModal extends React.Component {
    handleClose = action => {
        const {closeModal} = this.props;
        closeModal(action);
    };

    render() {
        const {isVisible} = this.props;

        return (
            <Modal
                style={styles.modal}
                isVisible={isVisible}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                useNativeDriverForBackdrop={true}
                backdropTransitionInTiming={0}
                backdropTransitionOutTiming={0}
                animationInTiming={100}
                animationOutTiming={100}
                useNativeDriver={true}
                onBackdropPress={() => this.handleClose(null)}
                onBackButtonPress={() => this.handleClose(null)}
                backdropOpacity={0.4}
                hideModalContentWhileAnimating={true}
            >
                <View style={styles.container}>
                    <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() => this.handleClose("openCamera")}
                        style={styles.actionContainer}
                    >
                        <Text style={styles.actionText}>{"Camera"}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() => this.handleClose("openPicker")}
                        style={styles.actionContainer}
                    >
                        <Text style={styles.actionText}>{"Gallery"}</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        );
    }
}

export default CameraModal;

const styles = StyleSheet.create({
    topContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
    },
    actionContainer: {
        marginTop: 10,
        padding: 10,
    },
    searchContainer: {
        marginBottom: 5,
    },
    bedsContainer: {
        marginBottom: 5,
    },
    textInputStyle: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        width: "95%",
    },
    bed: {
        margin: 10,
        height: 50,
        width: 150,
        marginHorizontal: 35,
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 6,
        elevation: 5,
        shadowColor: "#00000030",
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    bedIcon: {
        flex: 1,
        textAlign: "center",
        textAlignVertical: "center",
    },
    modal: {
        margin: 0,
        marginTop: height / 1.3,
        elevation: 5,
        backgroundColor: "transparent",
    },
    bedNumberContainer: {
        marginRight: 15,
        marginTop: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    actionText: {
        fontSize: 16,
        color: "black",
        textAlign: "center",
        textAlignVertical: "center",
    },
    disabledActionText: {
        opacity: 0.2,
    },
    container: {
        flex: 1,
        marginTop: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    headingContainer: {
        marginVertical: 15,
    },
});
