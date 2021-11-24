import React from "react";
import Modal from "react-native-modal";
import {Text, View, StyleSheet, FlatList, TouchableWithoutFeedback} from "react-native";

import * as COLOR_CONSTANTS from "../constants/color_constants";
// import {LANGUAGES} from "./languages";

class CheckinsModal extends React.Component {
    state = {
        selectedLanguage: "",
        index: null,
        selectedOffice: null,
    };

    handleClose = (isSave = false) => {
        const {closeModal} = this.props;
        let details = {};
        details.filterType = this.state.selectedOffice;

        closeModal({details, isSave});
    };

    _renderItem = ({item, index}) => {
        return (
            <View style={{margin: 10, alignItems: "center"}}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.setState({selectedOffice: item});
                        setTimeout(() => {
                            this.handleClose(true);
                        }, 200);
                    }}
                    onPressIn={() => {
                        this.setState({index});
                    }}
                >
                    <View
                        style={{
                            width: 250,
                            backgroundColor:
                                this.state.index === index ? COLOR_CONSTANTS.THEME_COLOR : "white",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 8,
                            borderRadius: 6,
                            borderColor: COLOR_CONSTANTS.THEME_COLOR,
                            borderWidth: 1,
                        }}
                    >
                        <Text
                            style={{
                                color: this.state.index === index ? "white" : "black",
                                textAlign: "center",
                            }}
                        >
                            {item.label}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    };

    renderList = () => {
        let {list} = this.props;
        return (
            <FlatList
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{paddingBottom: 50}}
                showsVerticalScrollIndicator={true}
                data={list}
                numColumns={1}
                keyExtractor={item => item._id}
                renderItem={this._renderItem.bind(this)}
            />
        );
    };

    render() {
        const {isVisible, header} = this.props;

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
                    <View style={{margin: 10, paddingHorizontal: 20}}>{this.renderList()}</View>
                </View>
            </Modal>
        );
    }
}

export default CheckinsModal;

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
        flex: 0.4,
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
});
