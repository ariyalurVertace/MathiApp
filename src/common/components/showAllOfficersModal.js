import React from "react";
import Modal from "react-native-modal";
import {Text, View, StyleSheet, TouchableOpacity, TextInput} from "react-native";

import {connect} from "react-redux";
import * as COLOR_CONSTANTS from "../constants/color_constants";
import CheckBox from "@react-native-community/checkbox";
import {setShowAllOfficers, setBelowOfficers} from "../redux/officer_reducer";
import Store from "../redux/store";
// import {LANGUAGES} from "./languages";

class ShowAllOfficersModal extends React.Component {
    state = {
        blockedReason: "",
        isShowAll: false,
    };

    handleClose = (isSave = false) => {
        const {closeModal} = this.props;
        let details = {};
        details.isShowAll = this.state.isShowAll;
        closeModal({details, isSave});
    };

    render() {
        const {isVisible, header, textcont} = this.props;
        let {isShowAll} = this.state;

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
                    <View style={{alignItems: "center", justifyContent: "center", margin: 15}}>
                        <Text style={{fontSize: 20}}>{header}</Text>
                    </View>
                    <View
                        style={{
                            marginHorizontal: 20,
                            marginVertical: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingBottom: 20,
                        }}
                    >
                        <View>
                            <CheckBox
                                value={isShowAll}
                                tintColors={{true: COLOR_CONSTANTS.THEME_COLOR}}
                                onValueChange={value => {
                                    // console.warn(`va ${value}`);
                                    if (value === true) {
                                        Store.dispatch(setShowAllOfficers(value));
                                    } else {
                                        Store.dispatch(setBelowOfficers(true));
                                    }
                                    this.setState({
                                        isShowAll: value,
                                    });
                                    setTimeout(() => {
                                        this.handleClose(true);
                                    }, 200);
                                }}
                                style={styles.checkbox}
                            />
                        </View>
                        <View style={{justifyContent: "center", paddingLeft: 10}}>
                            <Text>{textcont}</Text>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
const mapStateToProps = state => {
    return {common: state.common};
};

export default connect(mapStateToProps, null)(ShowAllOfficersModal);

// export default BlockedReasonModal;

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
