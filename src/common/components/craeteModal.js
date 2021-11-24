import React from "react";
import {Text, View, StyleSheet, TouchableHighlight, TextInput, Keyboard} from "react-native";
import Modal from "react-native-modal";
import * as COLOR_CONSTANTS from "../constants/color_constants";
import MultiSelect from "./multiselect";
import {getProfession} from "../../helper/api_helper";

class CreateModal extends React.Component {
    state = {
        Name: "",
        MobileNumber: "",
        Profession: "",
        Professions: [],
        selectedProfession: [],
    };

    componentDidMount() {
        this.getProfession();
    }

    async getProfession() {
        try {
            const professionallist = await getProfession();

            this.setState({
                Professions: professionallist,
            });
        } catch (error) {
            console.log(error);
        }
    }

    onProfessionChange = async selectedProfession => {
        this.setState({
            selectedProfession,
            Profession: selectedProfession,
        });
    };

    handleClose = (isSave = false) => {
        const {closeModal} = this.props;
        let details = {};
        details.Name = this.state.Name;
        details.MobileNumber = this.state.MobileNumber;
        details.Profession = this.state.Profession;
        setTimeout(() => {
            this.setState({
                Name: "",
                MobileNumber: "",
                Profession: "",
            });
        }, 500);

        closeModal({details, isSave});
    };

    renderContent = () => {
        const {Name, MobileNumber, Professions, selectedProfession, Profession} = this.state;
        let mobileRegex = /^\d{10}$/;
        const isSaveDisabled = Name ? (MobileNumber.match(mobileRegex) ? !Profession : true) : true;

        return (
            <View onTouchStart={() => Keyboard.dismiss()} style={styles.container}>
                <View style={styles.topContainer}>
                    <Text
                        style={{
                            textAlign: "center",
                            width: "100%",
                            color: COLOR_CONSTANTS.THEME_COLOR,
                            fontSize: 20,
                        }}
                    >
                        ADD
                    </Text>
                </View>
                <View style={styles.container}>
                    <TextInput
                        value={Name}
                        returnKeyType="next"
                        onChangeText={text => this.setState({Name: text})}
                        placeholder={"Name"}
                        style={styles.textInputStyle}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        value={MobileNumber}
                        // textAlignVertical="top"
                        returnKeyType="done"
                        keyboardType="numeric"
                        onChangeText={text => this.setState({MobileNumber: text})}
                        placeholder={"Mobile Number"}
                        style={styles.textInputStyle}
                        underlineColorAndroid="transparent"
                    />
                    <View style={styles.selectView}>
                        <MultiSelect
                            hideTags
                            single
                            searchIcon={false}
                            hideSearch={true}
                            items={Professions}
                            uniqueKey="_id"
                            ref={component => {
                                this.multiSelect = component;
                            }}
                            onSelectedItemsChange={this.onProfessionChange}
                            selectedItems={selectedProfession}
                            selectText="Select profession"
                            searchInputPlaceholderText="Search profession..."
                            selectedItemTextColor="blue"
                            itemTextColor="black"
                            displayKey="Name"
                            styleTextDropdown={{
                                color: "gray",
                                paddingHorizontal: 10,
                            }}
                            searchInputStyle={{
                                color: "black",
                            }}
                            styleTextDropdownSelected={{
                                color: "black",
                                paddingHorizontal: 10,
                            }}
                            styleInputGroup={{display: "none"}}
                        />
                    </View>
                </View>
                <View style={styles.topContainer}>
                    <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() => this.handleClose()}
                        style={styles.actionContainer}
                    >
                        <Text style={styles.actionText}>{"CANCEL"}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        disabled={isSaveDisabled}
                        underlayColor="transparent"
                        onPress={() => {
                            this.handleClose(true);
                        }}
                        style={styles.actionContainer}
                    >
                        <Text
                            style={[
                                styles.actionText,
                                isSaveDisabled ? styles.disabledActionText : undefined,
                            ]}
                        >
                            {"SAVE"}
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    };

    render() {
        const {isVisible} = this.props;

        return (
            <Modal
                avoidKeyboard
                style={styles.modal}
                useNativeDriver={false}
                onBackdropPress={() => this.handleClose()}
                onBackButtonPress={() => this.handleClose()}
                isVisible={isVisible}
                animationIn={"zoomIn"}
                animationInTiming={1000}
                animationOut={"zoomOut"}
                animationOutTiming={1000}
            >
                {this.renderContent()}
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    topContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
    },
    actionContainer: {
        marginTop: 10,
        padding: 10,
    },
    inputContainer: {
        alignItems: "flex-start",
        paddingHorizontal: 10,
    },
    GenderContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    GenderTextContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    Gender: {
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    GenderText: {
        fontSize: 14,
        color: "black",
    },
    bedsContainer: {
        marginBottom: 5,
    },
    textInputStyle: {
        width: "100%",
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: "gray",
        borderWidth: StyleSheet.hairlineWidth,
        marginVertical: 5,
    },
    modal: {
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
    bedNumber: {
        flex: 1,
        color: "black",
        textAlign: "center",
        textAlignVertical: "center",
    },
    selectedBedNumber: {
        color: "white",
    },
    actionText: {
        fontSize: 14,
        color: COLOR_CONSTANTS.THEME_COLOR,
        textAlign: "center",
        textAlignVertical: "center",
    },
    disabledActionText: {
        opacity: 0.2,
    },
    container: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 15,
        minHeight: 300,
        backgroundColor: "white",
    },
    selectView: {
        width: "100%",
        borderColor: "#dedede",
        borderWidth: StyleSheet.hairlineWidth,
        marginBottom: 10,
        borderRadius: 5,
        paddingTop: 10,
        justifyContent: "center",
    },
});

export default CreateModal;
