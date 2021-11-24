import React, {Component} from "react";
import {View, Text, TextInput, StyleSheet, ScrollView, Platform} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import DeleteIcon from "react-native-vector-icons/Ionicons";
import RNPickerSelect from "react-native-picker-select";
import Button from "../common/components/button";
import * as COLOR_CONSTANT from "../common/constants/color_constants";
import {getAllOffice, getAllDesignation, register, getAllAreaList} from "../helper/api_helper";
import Store from "../common/redux/store";
import {setSnackbarText} from "../common/redux/common_reducer";
import * as STRING_CONSTANTS from "../common/constants/string_constants";

export default class SignUp extends Component {
    state = {
        selectedDesignation: null,
        selectedOffice: null,
        isButtonLoading: false,
        Designations: [],
        Areas: [],
        AreaLevels: [],
        ParentIndex: 0,
        LevelName: [],
        Offices: [],
        selectedInd: 0,
    };

    async componentDidMount() {
        let areas = await getAllAreaList("");
        let desginations = await getAllDesignation();

        let Areas = [];
        Areas = areas?.items?.map(a => {
            return {value: a.ID, label: a.Name, Level: a.Level};
        });
        let AreaLevel = [];
        let {ParentIndex} = this.state;
        AreaLevel =
            this.state.AreaLevels && this.state.AreaLevels.length > 0 ? this.state.AreaLevels : [];
        if (!AreaLevel[ParentIndex]) {
            let emptyObject = {AreaList: [], SelectedAreaLevel: {}};
            AreaLevel.push(emptyObject);
        }
        AreaLevel[ParentIndex].AreaList = Areas;

        this.setState({
            Designations: desginations.map(a => {
                return {value: a.ID, label: a.Name};
            }),

            Areas,
            AreaLevels: AreaLevel,
        });
    }

    onOfficeChange = async selectedOffice => {
        this.setState({
            selectedOffice,
            Office: selectedOffice,
        });
    };

    onAreasChange = async (selectedArea, ind) => {
        let result = this.state.AreaLevels;
        let SelectedAreaLevel = {};
        result.splice(ind + 1, result.length - ind);
        result = result;

        for (let i = 0; i < result.length; i++) {
            if (i === ind) {
                SelectedAreaLevel.ID = selectedArea;
                SelectedAreaLevel.Name = selectedArea;
                result[i].SelectedAreaLevel = SelectedAreaLevel;
                result[i].SelectedArea = selectedArea;
            }
        }
        this.setState({
            AreaLevels: result,
            SelectedAreaLevel,
        });

        let areas = await getAllAreaList(selectedArea);

        let office = await getAllOffice(selectedArea);

        if (areas && areas.items.length > 0) {
            let Areas = [];
            Areas = areas?.items?.map(a => {
                return {value: a.ID, label: a.Name, Level: a.Level};
            });
            let AreaLevel = [];
            let ParentIndex = ind + 1;
            AreaLevel =
                this.state.AreaLevels && this.state.AreaLevels.length > 0
                    ? this.state.AreaLevels
                    : [];
            if (!AreaLevel[ParentIndex] && Areas.length > 0) {
                let emptyObject = {AreaList: [], SelectedAreaLevel: {}};
                AreaLevel.push(emptyObject);
            }
            AreaLevel[ParentIndex].AreaList = Areas;
            this.setState({
                Areas,
                AreaLevels: AreaLevel,
                selectedInd: ind,
                Offices: office.map(a => {
                    return {value: a.ID, label: a.Name};
                }),
            });
        } else {
            this.setState({
                Offices: office.map(a => {
                    return {value: a.ID, label: a.Name};
                }),
                selectedInd: ind,
            });
        }
    };

    async handleSignUp() {
        if (
            this.state.Name &&
            this.state.MobileNumber1 &&
            this.state.AreaLevels.length > 1 &&
            this.state.selectedDesignation &&
            this.state.selectedOffice
        ) {
            let mobileRegex = /^\d{10}$/;
            if (!this.state.MobileNumber1.match(mobileRegex)) {
                Store.dispatch(setSnackbarText("Please enter valid mobile number"));

                return false;
            }

            if (this.state.MobileNumber1.length < 10) {
                Store.dispatch(setSnackbarText("Please enter valid mobile number"));

                return false;
            }

            this.setState({isButtonLoading: true});

            let OfficeID = this.state.AreaLevels;
            OfficeID = OfficeID.length > 0 && OfficeID[OfficeID.length - 2].SelectedArea;

            let registerObj = {};
            registerObj.Name = this.state.Name;
            registerObj.MobileNumber1 = this.state.MobileNumber1;
            registerObj.OfficeID = this.state.selectedOffice;
            registerObj.DesignationID = this.state.selectedDesignation;
            registerObj.PhotoURL = "";

            let result = await register(registerObj);

            this.setState({isButtonLoading: false});
            if (result) {
                this.props.navigation.navigate("signUpSuccess");
            }
        } else {
            Store.dispatch(setSnackbarText(STRING_CONSTANTS.MANDATORY_FIELDS));
        }
    }

    async handleExpand(ind) {
        this.setState({
            selectedInd: ind + 1,
        });
    }

    render() {
        const {
            Designations,
            selectedDesignation,
            selectedOffice,
            Offices,
            selectedInd,
            AreaLevels,
        } = this.state;
        return (
            <View style={{flex: 1}}>
                <LinearGradient
                    colors={["#584BDD", "#8D51F3", "#AA55FF"]}
                    start={{x: 0.0, y: 1.0}}
                    end={{x: 1.0, y: 0}}
                    locations={[0.65, 0.85, 1]}
                    style={{flex: 1}}
                >
                    <ScrollView>
                        <View style={styles.headerUnderLine}>
                            <Text style={styles.headerText}>{"REGISTER"}</Text>
                        </View>
                        <View style={styles.listContainer}>
                            <View style={styles.inputParentContainer}>
                                <View style={styles.inputHintContainer}>
                                    <Text style={styles.inputHint}>{"NAME"}</Text>
                                    <Text style={styles.requiredView}>*</Text>
                                </View>
                                <View style={styles.inputView}>
                                    <TextInput
                                        style={styles.inputText}
                                        placeholder="Enter Name"
                                        placeholderTextColor="gray"
                                        returnKeyType={"done"}
                                        onChangeText={text => this.setState({Name: text})}
                                    />
                                </View>
                            </View>
                            <View style={styles.inputParentContainer}>
                                <View style={styles.inputHintContainer}>
                                    <Text style={styles.inputHint}>{"MOBILE NUMBER"}</Text>
                                    <Text style={styles.requiredView}>*</Text>
                                </View>

                                <View style={styles.inputView}>
                                    <TextInput
                                        style={styles.inputText}
                                        maxLength={10}
                                        placeholder="Enter Mobile Number"
                                        placeholderTextColor="gray"
                                        returnKeyType={"done"}
                                        keyboardType="numeric"
                                        onChangeText={text => this.setState({MobileNumber1: text})}
                                    />
                                </View>
                                <View style={{paddingHorizontal: 20, paddingVertical: 5}}>
                                    <Text style={{color: "red", fontSize: 12}}>
                                        {
                                            "This mobile number is used for login and cannot be changed later.\nஇந்த மொபைல் எண் செயலி உள்நுழைவதற்குப் பயன்படுத்தப்படுகிறது. பின்னர் மாற்ற இயலாது."
                                        }
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.inputParentContainer}>
                                <View style={styles.inputHintContainer}>
                                    <Text style={styles.inputHint}>{"DESIGNATION"}</Text>
                                    <Text style={styles.requiredView}>*</Text>
                                </View>

                                <View style={styles.selectView}>
                                    <RNPickerSelect
                                        value={selectedDesignation}
                                        items={Designations}
                                        onValueChange={value =>
                                            this.setState({selectedDesignation: value})
                                        }
                                        style={{
                                            inputAndroid: {
                                                color: "black",
                                            },
                                            fontFamily: Platform.select({
                                                android: "Montserrat-SemiBold",
                                                ios: "Montserrat-SemiBold",
                                            }),
                                        }}
                                        placeholder={{
                                            label: "Select Designation",
                                            value: null,
                                            color: "gray",
                                        }}
                                    />
                                </View>
                            </View>
                            {AreaLevels.length ? (
                                <View style={styles.inputParentContainer}>
                                    {AreaLevels &&
                                        AreaLevels.length > 0 &&
                                        AreaLevels.map((area, index) => {
                                            return (
                                                <View key={index}>
                                                    <View style={{flex: 1}}>
                                                        <View style={styles.inputHintContainer}>
                                                            <View style={{flexDirection: "row"}}>
                                                                <View
                                                                    style={{
                                                                        width: "80%",
                                                                        flexDirection: "row",
                                                                    }}
                                                                >
                                                                    <Text style={styles.inputHint}>
                                                                        {area?.AreaList[0]?.Level?.Name.toUpperCase()}
                                                                    </Text>
                                                                    {index === 0 ? (
                                                                        <Text
                                                                            style={
                                                                                styles.requiredView
                                                                            }
                                                                        >
                                                                            *
                                                                        </Text>
                                                                    ) : (
                                                                        <Text>{""}</Text>
                                                                    )}
                                                                </View>
                                                                <View style={{width: "20%"}}>
                                                                    {!area.SelectedArea ? (
                                                                        index === 0 ? (
                                                                            <Text></Text>
                                                                        ) : (
                                                                            <Icon
                                                                                onPress={() => {
                                                                                    this.handleExpand(
                                                                                        index,
                                                                                    );
                                                                                }}
                                                                                style={
                                                                                    styles.expandView
                                                                                }
                                                                                name="expand-more"
                                                                                size={30}
                                                                            />
                                                                        )
                                                                    ) : index === 0 ? null : (
                                                                        <DeleteIcon
                                                                            onPress={() => {
                                                                                let result = AreaLevels;

                                                                                let listDe = AreaLevels.filter(
                                                                                    (a, i) =>
                                                                                        i < index,
                                                                                );
                                                                                this.setState({
                                                                                    AreaLevels: listDe,
                                                                                });
                                                                                this.onAreasChange(
                                                                                    result[
                                                                                        index - 1
                                                                                    ].SelectedArea,
                                                                                    index - 1,
                                                                                );
                                                                            }}
                                                                            style={
                                                                                styles.expandView
                                                                            }
                                                                            name="close-circle"
                                                                            size={23}
                                                                        />
                                                                    )}
                                                                </View>
                                                            </View>
                                                        </View>
                                                        {selectedInd >= index ? (
                                                            <View style={styles.dynamicSelectView}>
                                                                <RNPickerSelect
                                                                    value={area?.SelectedArea}
                                                                    items={area?.AreaList}
                                                                    onValueChange={value => {
                                                                        this.onAreasChange(
                                                                            value,
                                                                            index,
                                                                        );
                                                                    }}
                                                                    style={{
                                                                        inputAndroid: {
                                                                            color: "black",
                                                                        },
                                                                        fontFamily: Platform.select(
                                                                            {
                                                                                android:
                                                                                    "Montserrat-SemiBold",
                                                                                ios:
                                                                                    "Montserrat-SemiBold",
                                                                            },
                                                                        ),
                                                                    }}
                                                                    placeholder={{
                                                                        label: `Select ${area?.AreaList[0]?.Level?.Name}`,
                                                                        value: null,
                                                                        color: "gray",
                                                                    }}
                                                                />
                                                            </View>
                                                        ) : (
                                                            <Text>{""}</Text>
                                                        )}
                                                    </View>
                                                </View>
                                            );
                                        })}
                                </View>
                            ) : null}

                            <View style={styles.inputParentContainer}>
                                <View style={styles.inputHintContainer}>
                                    <Text style={styles.inputHint}>{"STATION / OFFICE"}</Text>
                                    <Text style={styles.requiredView}>*</Text>
                                </View>
                                <View style={styles.selectView}>
                                    <RNPickerSelect
                                        value={selectedOffice}
                                        items={Offices}
                                        onValueChange={value =>
                                            this.setState({selectedOffice: value})
                                        }
                                        style={{
                                            inputAndroid: {
                                                color: "black",
                                            },
                                            fontFamily: Platform.select({
                                                android: "Montserrat-SemiBold",
                                                ios: "Montserrat-SemiBold",
                                            }),
                                        }}
                                        placeholder={{
                                            label: "Select Office",
                                            value: null,
                                            color: "gray",
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </LinearGradient>
                <View
                    style={{
                        margin: 2,
                    }}
                >
                    <Button
                        loading={!!this.state.isButtonLoading}
                        disabled={!!this.state.isButtonLoading}
                        text={"REGISTER"}
                        onPress={() => {
                            this.handleSignUp();
                        }}
                        containerStyle={{
                            marginHorizontal: 15,
                            marginTop: 8,
                            marginBottom: 18,
                        }}
                    />
                    <Text
                        style={{
                            textAlign: "center",
                            color: "black",
                            margin: 10,
                        }}
                    >
                        {"Already have an account ?"}
                        <Text
                            onPress={() => this.props.navigation.navigate("officerLogin")}
                            style={styles.loginText}
                        >
                            Login
                        </Text>
                    </Text>
                    <Text style={{paddingBottom: 6, textAlign: "center"}}>
                        {"Powered by Vertace"}
                    </Text>
                </View>
                {
                    <View
                        style={[
                            styles.bottomBehindContainer,
                            this.state.keyboardVisible ? {} : {top: "87%"},
                        ]}
                    />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputView: {
        borderRadius: 10,
        height: 50,
        marginBottom: 2,
        justifyContent: "center",
        padding: 8,
        marginLeft: 20,
        marginRight: 20,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "lightgray",
    },

    inputText: {
        height: 50,
        color: "black",
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    inputHintContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingLeft: 20,
        paddingTop: 5,
    },
    inputHint: {
        color: COLOR_CONSTANT.THEME_COLOR,
        paddingBottom: 4,
        paddingTop: 8,
    },
    selectView: {
        borderColor: "#dedede",
        borderWidth: StyleSheet.hairlineWidth,
        marginBottom: 10,
        borderRadius: 5,
        justifyContent: "center",
        marginLeft: 20,
        marginRight: 20,
    },
    dynamicSelectView: {
        borderColor: "#dedede",
        borderWidth: StyleSheet.hairlineWidth,
        marginBottom: 10,
        borderRadius: 5,
        justifyContent: "center",
        marginLeft: 20,
        marginRight: 20,

        //   width: 270,
    },
    bottomBehindContainer: {
        position: "absolute",
        backgroundColor: "#FFFFFF",
        zIndex: -1,
        left: 0,
        right: 0,
        bottom: 0,
    },
    headerUnderLine: {
        alignItems: "flex-start",
        borderBottomWidth: 2,
        borderColor: "#fff",
        alignSelf: "flex-start",
        paddingRight: 10,
        paddingBottom: 5,
        marginLeft: 20,
        marginBottom: 15,
    },
    headerText: {
        color: "#fff",
        fontSize: 20,
        fontFamily: Platform.select({
            android: "Montserrat-SemiBold",
            ios: "Montserrat-SemiBold",
        }),
        paddingTop: 40,
    },

    inputParentContainer: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 15,
        marginBottom: 10,
        borderRadius: 5,
        elevation: 3,
        shadowColor: "#00000025",
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 1,
        shadowRadius: 20,
        paddingBottom: 10,
    },
    loginText: {
        fontFamily: Platform.select({
            android: "Montserrat-SemiBold",
            ios: "Montserrat-SemiBold",
        }),
        color: COLOR_CONSTANT.THEME_COLOR,
    },
    expandView: {
        paddingRight: 12,
        textAlign: "right",
    },
    requiredView: {
        color: "red",
        marginTop: 5,
        marginLeft: 2,
    },
});
