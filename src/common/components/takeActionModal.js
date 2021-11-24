import React from "react";
import Modal from "react-native-modal";
import {Text, View, StyleSheet, TouchableOpacity, Dimensions, FlatList} from "react-native";
import * as COLOR_CONSTANTS from "../constants/color_constants";
// import {LANGUAGES} from "./languages";

const {height} = Dimensions.get("window");

class TakeActionModal extends React.Component {
    state = {
        actionList: [],
        selectedAction: {},
        index: -1,
    };

    componentWillReceiveProps() {
        let {actionList} = this.props;
        this.setState({actionList});
    }

    handleClose = (isSave = false) => {
        const {closeModal} = this.props;
        let details = {};
        details.action = this.state.selectedAction;

        closeModal({details, isSave});
    };

    _renderItem = ({item}) => {
        return (
            <View style={{margin: 10, alignItems: "center"}}>
                <TouchableOpacity
                    style={{
                        width: 180,
                        backgroundColor: item.NextEntityState.Color,
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 8,
                        borderRadius: 6,
                    }}
                    activeOpacity={0.8}
                    onPress={() => {
                        this.setState({selectedAction: item});
                        setTimeout(() => {
                            this.handleClose(true);
                        }, 200);
                    }}
                >
                    <Text style={{color: "white", textAlign: "center"}}>
                        {item.NextEntityState.Name}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    renderList = () => {
        return (
            <FlatList
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{paddingBottom: 50}}
                showsVerticalScrollIndicator={true}
                data={this.state.actionList}
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
                    <View style={{marginBottom: 20, marginHorizontal: 10}}>
                        {this.renderList()}
                    </View>
                </View>
            </Modal>
        );
    }
}

export default TakeActionModal;

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
        marginTop: height / 1.7,
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
