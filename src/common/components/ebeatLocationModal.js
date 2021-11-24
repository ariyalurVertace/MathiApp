import React from "react";
import Modal from "react-native-modal";
import {Text, View, StyleSheet, Dimensions, FlatList, TouchableWithoutFeedback} from "react-native";
import * as COLOR_CONSTANTS from "../constants/color_constants";

const {height} = Dimensions.get("window");

class EbeatLocationsModal extends React.Component {
    state = {
        selectedLocation: "",
        index: -1,
    };

    handleClose = (isSave = false) => {
        const {closeModal} = this.props;
        let details = {};
        details.selectedLocation = this.state.selectedLocation;

        closeModal({details, isSave});
    };

    renderList = () => {
        let {languages} = this.state;
        let {checkinLocation} = this.props;

        return (
            <FlatList
                keyboardShouldPersistTaps="handled"
                // contentContainerStyle={{paddingBottom: 50}}
                showsVerticalScrollIndicator={true}
                data={checkinLocation}
                numColumns={1}
                keyExtractor={item => item._id}
                renderItem={this._renderItem.bind(this)}
            />
        );
    };

    _renderItem = ({item, index}) => {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.setState({selectedLocation: item.value});
                    setTimeout(() => {
                        this.handleClose(true);
                    }, 200);
                }}
            >
                <View>
                    <View style={{paddingVertical: 15}}>
                        <Text>{item.label}</Text>
                    </View>
                    <View
                        style={{borderBottomColor: "#EDEDED", borderBottomWidth: 1, marginEnd: 10}}
                    />
                </View>
            </TouchableWithoutFeedback>
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
                            // height: "10%",
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
                    <View style={{paddingHorizontal: 20, height: "85%"}}>{this.renderList()}</View>
                </View>
            </Modal>
        );
    }
}

export default EbeatLocationsModal;

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
        // margin: 0,
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
        flex: 0.7,
        // marginTop: 0,
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
