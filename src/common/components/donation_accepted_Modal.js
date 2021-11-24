import React from "react";
import Modal from "react-native-modal";
import {Text, View, StyleSheet, TouchableOpacity, Dimensions} from "react-native";
import * as COLOR_CONSTANTS from "../constants/color_constants";
// import {LANGUAGES} from "./languages";

const {height} = Dimensions.get("window");

class LanguagesModal extends React.Component {
    state = {
        itemsData: [],
    };

    setInitialState = () => {
        let {itemsData} = this.props;
        this.setState({details: itemsData});
    };

    handleClose = (isSave = false) => {
        const {closeModal} = this.props;
        let details = {};
        details.language = this.state.selectedLanguage;

        closeModal({details, isSave});
    };

    renderText = () => {
        return this.state?.details?.map(a => {
            return (
                <View key={a.Item} style={{flexDirection: "row", paddingBottom: 10}}>
                    <View>
                        <Text>{a.Item}</Text>
                    </View>
                    <View>
                        <Text>{`: ${a.Quantity} ${a.unit}`}</Text>
                    </View>
                </View>
            );
        });
    };

    renderTotal = items => {
        let Total = items?.map(item => {
            return item.amount * item.Quantity;
        });
        const arrSum = Total?.reduce((a, b) => a + b, 0);

        return arrSum;
    };

    render() {
        const {isVisible} = this.props;

        return (
            <Modal
                onModalShow={() => this.setInitialState()}
                style={styles.modal}
                isVisible={isVisible}
                animationIn="slideInUp"
                animationOut="slideOutDown"
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
                    <TouchableOpacity
                        style={{
                            padding: 5,
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                            marginTop: 10,
                        }}
                        onPress={() => {
                            this.handleClose();
                        }}
                    >
                        <Text style={{color: COLOR_CONSTANTS.THEME_COLOR}}>CLOSE</Text>
                    </TouchableOpacity>
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
                                {"You have donated following items"}
                            </Text>
                        </View>
                    </View>
                    <View style={{margin: 10, alignItems: "center"}}>{this.renderText()}</View>
                    <View style={{alignItems: "center"}}>
                        <Text>{`Total amount: Rs. ${this.renderTotal(this.state.details)} `}</Text>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default LanguagesModal;

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
        marginTop: height / 1.5,
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
        // justifyContent: "center",
        // alignItems: "center",
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
