import React, {Component} from "react";
import {
    View,
    Text,
    Platform,
    StatusBar,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from "react-native";
import {connect} from "react-redux";
import {getStatusBarHeight} from "react-native-status-bar-height";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import DeleteIcon from "react-native-vector-icons/Ionicons";

import AreaIcon from "react-native-vector-icons/FontAwesome";
import DesginationIcon from "react-native-vector-icons/MaterialCommunityIcons";
import ImagePicker from "react-native-image-crop-picker";
import RNPickerSelect from "react-native-picker-select";
import Button from "../common/components/button";
import {setSnackbarText, setLoader} from "../common/redux/common_reducer";
import * as STRING_CONSTANTS from "../common/constants/string_constants";
import CustomHeader from "../common/components/header";
import * as COLOR_CONSTANT from "../common/constants/color_constants";
import * as IMAGE_CONSTANT from "../common/constants/image_constants";
import CameraModal from "../common/components/cameraModal";
import {
    getAllDesignation,
    getAllOffice,
    profileUpdate,
    fileUpload,
    getAllAreaList,
} from "../helper/api_helper";
import {getLocalUser, setLocalUser} from "../common/functions/local_storage";
import Store from "../common/redux/store";

class ProfileScreen extends Component {
    state = {
        user: {},
        photo: "",
        isCameraModalVisible: false,
        IsEditable: false,
        name: "",
        mobile1: null,
        mobile2: null,
        designation: null,
        office: null,
        email: "",
        designationId: null,
        officeId: null,
        Areas: [],
        AreaLevels: [],
        ParentIndex: 0,
        officer: {},
        Offices: [],
    };

    async componentDidMount() {
        this.getLocaluser();
    }

    async getLocaluser() {
        Store.dispatch(setLoader(true));
        let officer = await getLocalUser();
        // this.setState({officer});
        let designations = await getAllDesignation();
        let areas = await getAllAreaList("");
        let office = await getAllOffice("");
        let designationList = designations.map(a => {
            return {label: a.Name, value: a.ID};
        });
        let officeList = office.map(a => {
            return {label: a.Name, value: a.ID};
        });
        let Areas = areas?.items?.map(a => {
            return {value: a.ID, label: a.Name, Level: a.Level};
        });
        let AreaLevel = [];

        let ParentIndex = 0;
        AreaLevel =
            this.state.AreaLevels && this.state.AreaLevels.length > 0 ? this.state.AreaLevels : [];
        if (!AreaLevel[ParentIndex]) {
            let emptyObject = {AreaList: [], SelectedAreaLevel: {}};
            AreaLevel.push(emptyObject);
        }
        AreaLevel[ParentIndex].AreaList = Areas;
        AreaLevel[ParentIndex].SelectedAreaLevel =
            officer.DepartmentOfficial.IteratedArea[ParentIndex];
        AreaLevel[ParentIndex].SelectedArea =
            officer.DepartmentOfficial.IteratedArea[ParentIndex].ID;

        if (officer.DepartmentOfficial.IteratedArea.length > 0) {
            getIteratedArea();
        }

        console.log(officer.DepartmentOfficial.IteratedArea);

        async function getIteratedArea() {
            ParentIndex = ParentIndex + 1;
            if (!AreaLevel[ParentIndex]) {
                let emptyObject = {AreaList: [], SelectedAreaLevel: {}};
                AreaLevel.push(emptyObject);
            }
            let id = officer?.DepartmentOfficial?.IteratedArea[ParentIndex - 1]?.ID;
            let areas2 = await getAllAreaList(id);
            let Areas = areas2?.items?.map(a => {
                return {value: a.ID, label: a.Name, Level: a.Level};
            });
            if (!AreaLevel[ParentIndex]) {
                let emptyObject = {AreaList: [], SelectedAreaLevel: {}};
                AreaLevel.push(emptyObject);
            }
            AreaLevel[ParentIndex].AreaList = Areas;
            AreaLevel[ParentIndex].SelectedAreaLevel =
                officer.DepartmentOfficial.IteratedArea[ParentIndex];
            AreaLevel[ParentIndex].SelectedArea =
                officer?.DepartmentOfficial?.IteratedArea[ParentIndex]?.ID;
            if (officer.DepartmentOfficial.IteratedArea.length > ParentIndex) {
                getIteratedArea();
            }
        }

        this.setState({
            OfficerDetails: officer,
            photo: officer.DepartmentOfficial?.PhotoURL,
            ProfileName: officer.DepartmentOfficial?.Name,
            Designations: designationList,
            Offices: officeList,
            name: officer.DepartmentOfficial?.Name,
            mobile1: officer.DepartmentOfficial?.MobileNumber1,
            mobile2: officer.DepartmentOfficial?.MobileNumber2,
            designation: officer.DepartmentOfficial?.WelfareDepartmentDesignation?.Name,
            office: officer.DepartmentOfficial?.Office?.Name,
            email: officer.DepartmentOfficial?.Email,
            designationId: officer.DepartmentOfficial?.WelfareDepartmentDesignation?.ID,
            officeId: officer.DepartmentOfficial?.Office?.ID,
            Areas,
            AreaLevels: AreaLevel,
        });
        Store.dispatch(setLoader(false));
    }

    addPhoto = async type => {
        const image = await ImagePicker[type]({
            cropping: true,
            mediaType: "photo",
            width: 360,
            height: 640,
            compressImageQuality: 0.8,
            cropperStatusBarColor: COLOR_CONSTANT.THEME_COLOR,
        });
        this.setState({photo: image.path});
        // Store.dispatch(setLoader(true));

        let imageUrl = await fileUpload(image);

        if (imageUrl) {
            this.setState({photo: imageUrl});
            setTimeout(() => {
                this.handleUpdate();
            }, 300);
        }
        // Store.dispatch(setLoader(false));
    };

    renderPhoto = () => {
        let {photo} = this.state;
        if (!photo) {
            return <Image style={styles.photo} resizeMode="cover" source={IMAGE_CONSTANT.USER} />;
        }
        return <Image style={styles.photo} resizeMode="cover" source={{uri: photo}} />;
    };

    onDesignationChange = async selectedDesignation => {
        let result = this.state.OfficerDetails;
        result.Officer.Designation.ID = selectedDesignation[0];
        this.setState({
            OfficerDetails: result,
        });
    };

    onOfficeChange = async selectedOffice => {
        let result = this.state.OfficerDetails;
        result.Officer.Office.ID = selectedOffice[0];
        this.setState({
            OfficerDetails: result,
        });
    };

    async handleUpdate() {
        Store.dispatch(setLoader(false));
        let {common} = this.props;

        let {name, mobile1, mobile2, email, designationId, officeId} = this.state;
        let mobileRegex = /^\d{10}$/;

        if (!this.state.mobile1.match(mobileRegex)) {
            Store.dispatch(setSnackbarText(common.labels.ENTER_VALID_MOBILE));

            return false;
        }
        if (this.state.mobile1.length < 10) {
            Store.dispatch(setSnackbarText(common.labels.ENTER_VALID_MOBILE));

            return false;
        }
        if (!officeId) {
            Store.dispatch(setSnackbarText(common.labels.SELECT_OFFICE));
            return false;
        }
        if (mobile2) {
            if (!this.state.mobile2.match(mobileRegex)) {
                Store.dispatch(setSnackbarText(common.labels.ENTER_VALID_MOBILE));

                return false;
            }
            if (this.state.mobile2.length < 10) {
                Store.dispatch(setSnackbarText(common.labels.ENTER_VALID_MOBILE));

                return false;
            }
        }

        let officer = this.state.OfficerDetails.DepartmentOfficial;
        let PhotoURL = "";

        if (this.state.photo) {
            PhotoURL = this.state.photo;
        }

        let updateObj = {};
        updateObj.Name = name;
        updateObj.MobileNumber1 = mobile1;
        updateObj.MobileNumber2 = mobile2;
        updateObj.Email = email;
        updateObj.DesignationID = designationId;
        updateObj.OfficeID = officeId;
        updateObj.PhotoURL = PhotoURL;

        let id = officer.ID;
        Store.dispatch(setLoader(true));

        let profileUpdateVal = await profileUpdate(id, updateObj);
        this.setState({
            IsEditable: false,
        });

        if (profileUpdateVal) {
            await setLocalUser(profileUpdateVal);
            this.getLocaluser();

            Store.dispatch(setSnackbarText(STRING_CONSTANTS.PROFILE_UPDATE));
        } else {
            Store.dispatch(setLoader(false));

            Store.dispatch(setSnackbarText("Couldn't update"));
        }
    }

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
                officeId: "",
            });
        }
    };

    render() {
        let {isCameraModalVisible, OfficerDetails, IsEditable, name, AreaLevels} = this.state;
        let {common} = this.props;

        return (
            <View style={{flex: 1}}>
                <View
                    style={{
                        height: getStatusBarHeight(),
                        backgroundColor: COLOR_CONSTANT.THEME_COLOR,
                        zIndex: 2,
                    }}
                >
                    {((Platform.Version > 22 && Platform.OS === "android") ||
                        Platform.OS === "ios") && (
                        <StatusBar backgroundColor="white" barStyle="dark-content" />
                    )}
                </View>
                <CustomHeader
                    back
                    title={common.labels.PROFILE_HEADER}
                    navigation={this.props.navigation}
                />
                <ScrollView style={{flex: 1}}>
                    <View style={{flex: 0.35}}>
                        <LinearGradient
                            colors={["#584BDD", "#8D51F3", "#AA55FF"]}
                            start={{x: 0.1, y: 0.0}}
                            end={{x: 0.0, y: 1}}
                            locations={[0.65, 0.85, 1]}
                            style={{flex: 1}}
                        >
                            <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
                                <View style={styles.photoContainer}>
                                    {this.renderPhoto()}
                                    <TouchableOpacity
                                        style={styles.cameraIconContainer}
                                        onPress={() => {
                                            this.setState({isCameraModalVisible: true});
                                        }}
                                        activeOpacity={0.8}
                                    >
                                        <Icon color="black" name="photo-camera" size={30} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{paddingTop: 20, paddingBottom: 20}}>
                                    <Text style={styles.nameStyle}>
                                        {OfficerDetails?.DepartmentOfficial?.Name}
                                    </Text>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                    <View style={{flex: 0.65}}>
                        <ScrollView>
                            <View style={styles.editIconContainer}>
                                <TouchableOpacity
                                    style={styles.editIcon}
                                    onPress={() => {
                                        this.setState({
                                            IsEditable: !this.state.IsEditable,
                                        });
                                    }}
                                    activeOpacity={0.8}
                                >
                                    <Icon color="white" name="edit" size={25} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.labelAndTextContainer}>
                                <View style={styles.iconContainer}>
                                    <Icon color="black" name="person" size={25} />
                                </View>
                                <View style={[styles.textContainer]}>
                                    <View style={styles.inputView}>
                                        <TextInput
                                            value={name}
                                            style={styles.inputText}
                                            returnKeyType={"done"}
                                            editable={IsEditable}
                                            selectTextOnFocus={true}
                                            onChangeText={text => {
                                                this.setState({name: text});
                                            }}
                                            textAlign="right"
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={styles.horozontalLine} />
                            <View style={styles.labelAndTextContainer}>
                                <View style={styles.iconContainer}>
                                    <DesginationIcon
                                        color="black"
                                        name="briefcase-variant-outline"
                                        size={25}
                                    />
                                </View>

                                <View style={styles.textContainer}>
                                    <View style={[styles.inputText]}>
                                        {IsEditable ? (
                                            <RNPickerSelect
                                                onValueChange={value => {
                                                    this.setState({designationId: value});
                                                }}
                                                items={this.state.Designations}
                                                style={{
                                                    inputAndroid: {
                                                        color: "black",
                                                        textAlign: "right",
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
                                                disabled={!IsEditable}
                                                textInputProps={{textAlign: "right"}}
                                                value={this.state.designationId}
                                            />
                                        ) : (
                                            <View
                                                style={{
                                                    justifyContent: "center",
                                                    height: "100%",
                                                    width: "96%",
                                                }}
                                            >
                                                <Text style={{textAlign: "right"}}>
                                                    {this.state.designation}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>
                            <View style={styles.horozontalLine} />
                            {AreaLevels &&
                                AreaLevels.length > 0 &&
                                AreaLevels.map((area, index) => {
                                    if (area?.SelectedArea) {
                                        return (
                                            <View>
                                                {IsEditable && index !== 0 ? (
                                                    <View
                                                        style={{
                                                            alignItems: "flex-end",
                                                            paddingRight: 10,
                                                            paddingTop: 5,
                                                        }}
                                                    >
                                                        <DeleteIcon
                                                            onPress={() => {
                                                                let result = AreaLevels;

                                                                let listDe = AreaLevels.filter(
                                                                    (a, i) => i < index,
                                                                );
                                                                this.setState({
                                                                    AreaLevels: listDe,
                                                                });
                                                                this.onAreasChange(
                                                                    result[index - 1].SelectedArea,
                                                                    index - 1,
                                                                );
                                                            }}
                                                            style={styles.expandView}
                                                            name="close-circle"
                                                            size={23}
                                                        />
                                                    </View>
                                                ) : null}

                                                <View
                                                    key={index}
                                                    style={styles.labelAndTextContainer}
                                                >
                                                    <View style={styles.iconContainer}>
                                                        <Icon
                                                            color="black"
                                                            name="push-pin"
                                                            size={25}
                                                        />
                                                    </View>

                                                    <View style={styles.textContainer}>
                                                        <View style={[styles.inputText]}>
                                                            {IsEditable ? (
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
                                                            ) : (
                                                                <View
                                                                    style={{
                                                                        justifyContent: "center",
                                                                        height: "100%",
                                                                        width: "96%",
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            textAlign: "right",
                                                                        }}
                                                                    >
                                                                        {
                                                                            area?.SelectedAreaLevel
                                                                                ?.Name
                                                                        }
                                                                    </Text>
                                                                </View>
                                                            )}
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={styles.horozontalLine} />
                                            </View>
                                        );
                                    }
                                    if (IsEditable && !area?.SelectedArea) {
                                        return (
                                            <View>
                                                <View
                                                    key={index}
                                                    style={styles.labelAndTextContainer}
                                                >
                                                    <View style={styles.iconContainer}>
                                                        <Icon
                                                            color="black"
                                                            name="push-pin"
                                                            size={25}
                                                        />
                                                    </View>

                                                    <View style={styles.textContainer}>
                                                        <View style={[styles.inputText]}>
                                                            {IsEditable ? (
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
                                                            ) : (
                                                                <View
                                                                    style={{
                                                                        justifyContent: "center",
                                                                        height: "100%",
                                                                        width: "96%",
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            textAlign: "right",
                                                                        }}
                                                                    >
                                                                        {
                                                                            area?.SelectedAreaLevel
                                                                                ?.Name
                                                                        }
                                                                    </Text>
                                                                </View>
                                                            )}
                                                        </View>
                                                    </View>
                                                </View>
                                                <View style={styles.horozontalLine} />
                                            </View>
                                        );
                                    }
                                })}

                            {/* {AreaLevels.length ? (
                                <View style={styles.labelAndTextContainer}>
                                   
                                </View>
                            ) : null} */}

                            <View style={styles.labelAndTextContainer}>
                                <View style={!IsEditable ? styles.iconContainer : styles.IconAlign}>
                                    <AreaIcon color="black" name="building-o" size={25} />
                                </View>
                                <View style={styles.textContainer}>
                                    <View style={[styles.inputText]}>
                                        {IsEditable ? (
                                            <RNPickerSelect
                                                onValueChange={value => {
                                                    this.setState({officeId: value});
                                                }}
                                                items={this.state.Offices}
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
                                                disabled={!IsEditable}
                                                textInputProps={{textAlign: "right"}}
                                                value={this.state.officeId}
                                            />
                                        ) : (
                                            <View
                                                style={{
                                                    justifyContent: "center",
                                                    height: "100%",
                                                    width: "96%",
                                                }}
                                            >
                                                <Text style={{textAlign: "right"}}>
                                                    {this.state.office}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>

                            <View style={styles.horozontalLine} />

                            <View style={styles.labelAndTextContainer}>
                                <View style={styles.iconContainer}>
                                    <Icon color="black" name="smartphone" size={25} />
                                </View>
                                <View style={[styles.textContainer]}>
                                    <View style={{alignItems: "flex-end", paddingRight: 10}}>
                                        {IsEditable ? (
                                            <Text style={{fontSize: 12, color: "red"}}>
                                                {common.labels.MOBILE_CANT_EDIT}
                                            </Text>
                                        ) : null}
                                    </View>
                                    <View style={styles.inputView}>
                                        <TextInput
                                            value={this.state.mobile1}
                                            style={styles.inputText}
                                            returnKeyType={"done"}
                                            editable={false}
                                            selectTextOnFocus={true}
                                            onChangeText={text => {
                                                this.setState({mobile1: text});
                                            }}
                                            textAlign="right"
                                            keyboardType="number-pad"
                                            maxLength={10}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.horozontalLine} />

                            <View style={styles.labelAndTextContainer}>
                                <View style={styles.iconContainer}>
                                    <Icon color="black" name="smartphone" size={25} />
                                </View>
                                <View style={[styles.textContainer]}>
                                    <View style={styles.inputView}>
                                        <TextInput
                                            value={this.state.mobile2}
                                            style={styles.inputText}
                                            returnKeyType={"done"}
                                            editable={IsEditable}
                                            selectTextOnFocus={true}
                                            onChangeText={text => {
                                                this.setState({mobile2: text});
                                            }}
                                            textAlign="right"
                                            maxLength={10}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={styles.horozontalLine} />

                            <View style={styles.labelAndTextContainer}>
                                <View style={styles.iconContainer}>
                                    <Icon color="black" name="mail-outline" size={25} />
                                </View>
                                <View style={[styles.textContainer]}>
                                    <View style={styles.inputView}>
                                        <TextInput
                                            value={this.state.email}
                                            style={styles.inputText}
                                            returnKeyType={"done"}
                                            editable={IsEditable}
                                            selectTextOnFocus={true}
                                            onChangeText={text => {
                                                this.setState({email: text});
                                            }}
                                            textAlign="right"
                                        />
                                    </View>
                                </View>
                            </View>
                            {IsEditable ? (
                                <View>
                                    <View style={styles.horozontalLine} />

                                    <View style={styles.buttonView}>
                                        <Button
                                            onPress={() => {
                                                this.handleUpdate();
                                            }}
                                            text={common.labels.UPDATE}
                                        />
                                    </View>
                                </View>
                            ) : (
                                <Text> </Text>
                            )}
                        </ScrollView>
                    </View>
                </ScrollView>
                <CameraModal
                    isVisible={isCameraModalVisible}
                    closeModal={type => {
                        this.setState({isCameraModalVisible: false}, () => {
                            if (type) {
                                this.addPhoto(type);
                            }
                        });
                    }}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {common: state.common};
};

export default connect(mapStateToProps, null)(ProfileScreen);

const styles = StyleSheet.create({
    horozontalLine: {
        borderBottomColor: "gray",
        borderBottomWidth: 0.5,
        marginHorizontal: 10,
    },
    labelStyle: {
        fontFamily: Platform.select({
            android: "Montserrat-SemiBold",
            ios: "Montserrat-SemiBold",
        }),
    },
    nameStyle: {
        fontFamily: Platform.select({
            android: "Montserrat-SemiBold",
            ios: "Montserrat-SemiBold",
        }),
        color: "white",
        fontSize: 18,
    },
    photoContainer: {
        height: 170,
        width: 170,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    cameraIconContainer: {
        width: 50,
        height: 50,
        backgroundColor: "white",
        position: "absolute",
        right: 0,
        bottom: 10,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    photo: {
        width: 170,
        height: 170,
        borderRadius: 100,
    },
    labelAndTextContainer: {
        // padding: 20,
        paddingVertical: 10,
        paddingLeft: 10,
        flexDirection: "row",
        width: "100%",
    },
    iconContainer: {
        width: "10%",
        alignItems: "center",
        justifyContent: "center",
    },
    IconAlign: {
        width: "10%",
        alignItems: "center",
        marginTop: 12,
    },
    textContainer: {
        width: "90%",
        // justifyContent: "center",
        // paddingLeft: 10,
    },
    inputView: {
        width: "100%",
        // borderRadius: 10,
        height: 50,
        justifyContent: "center",
        padding: 8,
        // marginLeft: 20,
        // marginRight: 20,
        // borderWidth: StyleSheet.hairlineWidth,
        // borderColor: "lightgray",
    },

    inputText: {
        height: 50,
        color: "black",
        width: "100%",
    },
    editIconContainer: {
        marginTop: 10,
        marginRight: 22,
        alignItems: "flex-end",
    },
    editIcon: {
        width: 40,
        height: 40,
        backgroundColor: COLOR_CONSTANT.THEME_COLOR,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonView: {
        margin: 10,
    },
});
