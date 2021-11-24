import React from "react";
import Modal from "react-native-modal";
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from "react-native";

import {connect} from "react-redux";
import * as COLOR_CONSTANTS from "../constants/color_constants";

class AddRemarksModal extends React.Component {
    state = {
        remarks: "",
        index: -1,
    };

    handleClose = (isSave = false) => {
        const {closeModal} = this.props;
        let details = {};
        details.remarks = this.state.remarks;

        closeModal({details, isSave});
    };

    renderTextInput = () => {
        let {remarks} = this.state;
        let {common} = this.props;
        return (
            <View style={{width: "100%"}}>
                <TextInput
                    value={remarks}
                    returnKeyType="next"
                    onChangeText={text => this.setState({remarks: text})}
                    placeholder={common.labels.REMARKS}
                    style={styles.textInputStyle}
                    multiline
                    underlineColorAndroid="transparent"
                />
            </View>
        );
    };

    render() {
        const {isVisible, header, common} = this.props;

        return (
            <Modal
                style={styles.modal}
                isVisible={isVisible}
                animationIn="zoomIn"
                animationOut="zoomOut"
                useNativeDriverForBackdrop={true}
                backdropTransitionInTiming={0}
                backdropTransitionOutTiming={0}
                animationInTiming={100}
                animationOutTiming={200}
                useNativeDriver={true}
                onBackdropPress={() => this.handleClose()}
                onBackButtonPress={() => this.handleClose()}
                backdropOpacity={0.4}
                hideModalContentWhileAnimating={true}
            >
                <View style={styles.container}>
                    <View
                        style={{
                            margin: 10,
                            padding: 5,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: COLOR_CONSTANTS.WHITE_COLOR,
                                }}
                            >
                                {header}
                            </Text>
                        </View>
                    </View>
                    <View style={{margin: 10}}>{this.renderTextInput()}</View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            paddingVertical: 20,
                        }}
                    >
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => {
                                this.handleClose();
                            }}
                        >
                            <Text style={styles.buttonLabelStyle}>{common.labels.CANCEL}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => {
                                this.handleClose(true);
                            }}
                        >
                            <Text style={styles.buttonLabelStyle}>{common.labels.ADD}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {common: state.common};
};

export default connect(mapStateToProps, null)(AddRemarksModal);

// export default AddRemarksModal;

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
        // margin: 0,
        // marginTop: height / 1.5,
        // elevation: 5,
        // backgroundColor: "transparent",
        margin: 0,
        marginHorizontal: 10,
        elevation: 5,
    },
    bedNumberContainer: {
        marginRight: 15,
        marginTop: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    actionText: {
        fontSize: 16,
        textAlign: "center",
        textAlignVertical: "center",
    },
    disabledActionText: {
        opacity: 0.2,
    },
    container: {
        // flex: 0.4,
        marginTop: 0,
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,

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
    textInputStyle: {
        width: "100%",
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderColor: "gray",
        borderWidth: StyleSheet.hairlineWidth,
        marginVertical: 5,
    },
    buttonLabelStyle: {
        color: "white",
    },
    buttonContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        backgroundColor: COLOR_CONSTANTS.THEME_COLOR,
        padding: 10,
        borderRadius: 6,
    },
});
