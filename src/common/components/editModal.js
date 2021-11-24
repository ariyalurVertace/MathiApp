import React from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    TextInput,
    Keyboard,
    Alert,
    Platform,
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import Modal from "react-native-modal";

class EditModal extends React.Component {
    state = {
        Name: "",
        MobileNumber: "",
        Profession: "",
        Professions: [],
        selectedProfession: [],
        Data: [],
        Latitude: "",
        Longitude: "",
    };

    componentDidMount() {
        // this.getProfession();
    }

    detailCheck() {
        let {Name, MobileNumber, Data} = this.state;
        if (Name === "") {
            this.setState({Name: Data.Name});
        }
        if (MobileNumber === "") {
            this.setState({MobileNumber: Data.MobileNumber});
        }
    }

    createDetails() {
        this.setState({Data: this.props.data});
        this.detailCheck();
        this.mobileRegexcheck();
    }

    createDetail() {
        let {Name, MobileNumber, Data, Profession} = this.state;

        let details = {};
        details._id = Data._id;
        details.Name = Name;
        details.MobileNumber = MobileNumber;
        details.Profession = Profession;
        this.getLocation(details);
    }

    async getLocation(details) {
        try {
            Geolocation.getCurrentPosition(
                async info => {
                    if (info) {
                        details.Latitude = info.coords.latitude;
                        details.Longitude = info.coords.longitude;
                    }
                },

                error => {
                    console.log(error);
                    // setSnackbarText("Couldn't access the app without location");
                },
                {
                    enableHighAccuracy: Platform.OS !== "android",
                    timeout: 20000,
                },
            );
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({isPageLoading: false});
        }
    }

    updateLocation() {
        this.createDetails();
    }

    handleClose = (isSave = false) => {
        const {closeModal} = this.props;
        closeModal({isSave});
    };

    mobileRegexcheck() {
        const {MobileNumber} = this.state;
        let mobileRegex = /^\d{10}$/;
        const isSaveDisabled = mobileRegex.test(MobileNumber);
        if (isSaveDisabled) {
            this.handleClose(true);
            this.createDetail();
        } else {
            Alert.alert("Enter valid Phonenumber");
        }
    }

    renderContent = () => {
        return (
            <View onTouchStart={() => Keyboard.dismiss()} style={styles.container}>
                <View style={{margin: 20, alignItems: "center"}}>
                    <Text style={[styles.actionText, {color: "black"}]}>EDIT PAGE</Text>
                </View>

                <View style={styles.container}>
                    <View>
                        <View>
                            <View style={styles.linecontainer}>
                                <View style={styles.linetextcontainer}>
                                    <Text>Name :</Text>
                                </View>
                                <View style={styles.linetextboxcontainer}>
                                    <TextInput
                                        returnKeyType="next"
                                        defaultValue={this.props.data.Name}
                                        onChangeText={text => this.setState({Name: text})}
                                        style={styles.textInputStyle}
                                        underlineColorAndroid="transparent"
                                    />
                                </View>
                            </View>
                            <View style={styles.linecontainer}>
                                <View style={styles.linetextcontainer}>
                                    <Text>MobileNumber:</Text>
                                </View>
                                <View style={styles.linetextboxcontainer}>
                                    <TextInput
                                        returnKeyType="next"
                                        keyboardType="numeric"
                                        onChangeText={text => this.setState({MobileNumber: text})}
                                        defaultValue={this.props.data.MobileNumber}
                                        style={styles.textInputStyle}
                                        underlineColorAndroid="transparent"
                                    />
                                </View>
                            </View>
                            <View style={styles.linecontainer}>
                                <View style={styles.linetextcontainer}>
                                    <Text>Profession:</Text>
                                </View>
                                <View style={styles.linetextboxcontainer}></View>
                            </View>
                        </View>
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
                        underlayColor="transparent"
                        onPress={() => {
                            Alert.alert(
                                "Confirm",
                                `Are you sure you want to update the location of ${this.props.data.Name}?`,
                                [
                                    {text: "No", onPress: () => null, style: "cancel"},
                                    {
                                        text: "Yes",
                                        onPress: async () => {
                                            this.updateLocation();
                                        },
                                    },
                                ],
                            );
                        }}
                        style={styles.actionContainer}
                    >
                        <Text style={[styles.actionText]}>UPDATE LOCATION</Text>
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
                animationIn="fadeInUp"
                onBackdropPress={() => this.handleClose()}
                onBackButtonPress={() => this.handleClose()}
                isVisible={isVisible}
            >
                {this.renderContent()}
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    innercontainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    editcontainer: {
        height: "90%",
        width: "90%",
        backgroundColor: "white",
        padding: 20,
    },
    textInputStyles: {
        width: "100%",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderColor: "gray",
        borderWidth: StyleSheet.hairlineWidth,
        marginVertical: 5,
    },
    linecontainer: {
        flexDirection: "row",
    },
    linetextcontainer: {
        flex: 0.5,
        justifyContent: "center",
    },
    linetextboxcontainer: {
        flex: 0.8,
    },
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
        textAlign: "center",
        textAlignVertical: "center",
    },
    selectedBedNumber: {
        color: "white",
    },
    actionText: {
        fontSize: 14,
        color: "blue",
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
        minHeight: 250,
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

export default EditModal;
