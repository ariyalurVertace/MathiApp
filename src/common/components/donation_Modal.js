import React from "react";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/FontAwesome";
import Slider from "@react-native-community/slider";
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    Platform,
    Dimensions,
    Alert,
} from "react-native";

import * as COLOR_CONSTANTS from "../constants/color_constants";
import {copyArray} from "../functions/utils";

const {width, height} = Dimensions.get("window");

class ItemDonationModal extends React.Component {
    state = {
        requestId: null,
        items: [],
        values: [],
        selectedItem: [],
    };

    checkValuesChanged() {
        const {values, items, requestId} = this.state;

        if (!requestId) return false;
        if (items.length === 0) return false;
        if (values.length === 0) return false;

        return true;
    }

    setInitialState = () => {
        const {requestId, itemsData} = this.props;
        this.setState({
            requestId,
            items: itemsData,
        });
    };

    handleClose = (isSave = false) => {
        const {closeModal} = this.props;
        const {values} = this.state;

        setTimeout(() => {
            this.setState({
                requestId: null,
                values: [],
                selceteddata: [],
            });
        }, 1000);

        closeModal(isSave ? values : []);
    };

    getSliderValue = item => {
        const {values} = this.state;
        const itemIndex = values.findIndex(x => x?.Item?.toString() === item?._id);
        if (itemIndex > -1) {
            return values[itemIndex].DonatedCount;
        }
        return 0;
    };

    isIncDisabled = item => {
        const {values} = this.state;
        const itemIndex = values.findIndex(x => x?.Item?.toString() === item?._id);
        if (itemIndex > -1) return values[itemIndex].DonatedCount >= item.quantity;

        return item.quantity <= 0;
    };

    isDecDisabled = item => {
        const {values} = this.state;
        const itemIndex = values.findIndex(x => x?.Item?.toString() === item?._id);
        if (itemIndex > -1) return values[itemIndex].DonatedCount <= 0;

        return true;
    };

    incSlider = item => {
        const {values} = this.state;
        const itemIndex = values.findIndex(x => x?.Item?.toString() === item?._id);

        let val = 1;
        let newValues = copyArray(values);
        if (itemIndex > -1) {
            val = newValues[itemIndex].DonatedCount + 1;
            newValues.splice(itemIndex, 1);
        }

        newValues.push({Item: item._id, DonatedCount: val >= item.quantity ? item.quantity : val});

        this.setState({
            values: newValues,
        });
    };

    decSlider = item => {
        const {values} = this.state;
        const itemIndex = values.findIndex(x => x?.Item?.toString() === item?._id);

        let val = 0;
        let newValues = copyArray(values);
        if (itemIndex > -1) {
            val = newValues[itemIndex].DonatedCount - 1;
            newValues.splice(itemIndex, 1);
        }

        if (val > 0) newValues.push({Item: item._id, DonatedCount: val});

        this.setState({
            values: newValues,
        });
    };

    dragSlider = (val, item) => {
        const {values} = this.state;
        const itemIndex = values.findIndex(x => x?.Item?.toString() === item?._id);

        let newValues = copyArray(values);
        if (itemIndex > -1) newValues.splice(itemIndex, 1);

        if (val !== 0) newValues.push({Item: item._id, DonatedCount: val});

        this.setState({
            values: newValues,
        });
    };

    renderContent = () => {
        const {items} = this.state;

        return (
            <View style={styles.itemsContainer}>
                {items.map(item => {
                    return (
                        <View key={item._id} style={styles.groupContainer}>
                            <View style={styles.headerContainer}>
                                <Text style={styles.headerText}>{`${
                                    item.name
                                } (${this.getSliderValue(item)})`}</Text>
                            </View>
                            <View style={styles.groupItemContainer}>
                                <TouchableHighlight
                                    disabled={this.isDecDisabled(item)}
                                    onPress={() => {
                                        this.decSlider(item);
                                    }}
                                    underlayColor={"white"}
                                    style={[
                                        styles.groupActionContainer,
                                        this.isDecDisabled(item)
                                            ? styles.disabledGroupActionContainer
                                            : undefined,
                                    ]}
                                >
                                    <Icon name={"angle-left"} size={30} color="black" />
                                </TouchableHighlight>
                                <View style={styles.groupLabelContainer}>
                                    <Text style={styles.groulLabel}>0</Text>
                                </View>
                                <Slider
                                    style={styles.slider}
                                    minimumValue={0}
                                    onValueChange={val => {
                                        this.dragSlider(val, item);
                                    }}
                                    maximumValue={item.quantity}
                                    step={1}
                                    thumbTintColor={"#0076d5"}
                                    minimumTrackTintColor="#0076d5"
                                    maximumTrackTintColor="#0076d5"
                                    value={this.getSliderValue(item)}
                                />
                                <View style={styles.groupLabelContainer}>
                                    <Text style={styles.groulLabel}>{item.quantity}</Text>
                                </View>
                                <TouchableHighlight
                                    disabled={this.isIncDisabled(item)}
                                    onPress={() => {
                                        this.incSlider(item);
                                    }}
                                    underlayColor={"white"}
                                    style={[
                                        styles.groupActionContainer,
                                        this.isIncDisabled(item)
                                            ? styles.disabledGroupActionContainer
                                            : undefined,
                                    ]}
                                >
                                    <Icon name={"angle-right"} size={30} color="black" />
                                </TouchableHighlight>
                            </View>
                            <View style={styles.headerContainer}>
                                <Text style={styles.normalText}>
                                    {`${item.name} Amount (per ${item.unit} Rs. ${item.amount}) : Rs. `}
                                    {item.amount * this.getSliderValue(item)}
                                </Text>
                            </View>
                        </View>
                    );
                })}

                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>
                        Total Amount : Rs. {this.renderTotal(items)}
                    </Text>
                </View>
            </View>
        );
    };

    renderTotal = items => {
        let Total = items.map(item => {
            return item.amount * this.getSliderValue(item);
        });
        const arrSum = Total.reduce((a, b) => a + b, 0);

        return arrSum;
    };

    render() {
        const {isVisible} = this.props;

        const isSaveDisabled = !this.checkValuesChanged();

        return (
            <Modal
                onModalShow={() => this.setInitialState()}
                style={styles.modal}
                onBackdropPress={() => this.handleClose()}
                onBackButtonPress={() => this.handleClose()}
                useNativeDriver={false}
                animationIn="fadeInUp"
                isVisible={isVisible}
            >
                <View style={styles.container}>
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
                                Alert.alert(
                                    "Confirm",
                                    `You are donating items worth Rs.${this.renderTotal(
                                        this.state.items,
                                    )}, \nPlease confirm`,
                                    [
                                        {text: "Cancel", onPress: () => null, style: "cancel"},
                                        {
                                            text: "OK",
                                            onPress: async () => {
                                                this.handleClose(true);
                                            },
                                        },
                                    ],
                                );
                            }}
                            style={styles.actionContainer}
                        >
                            <Text
                                style={[
                                    styles.actionText,
                                    isSaveDisabled ? styles.disabledActionText : undefined,
                                ]}
                            >
                                {"DONATE"}
                            </Text>
                        </TouchableHighlight>
                    </View>
                    {this.renderContent()}
                </View>
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
    searchContainer: {
        marginBottom: 5,
    },
    bedsContainer: {
        marginBottom: 5,
    },
    groupContainer: {
        marginVertical: 10,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    headerContainer: {
        justifyContent: "center",
    },
    itemsContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
    },
    groupItemContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
    },
    groupLabelContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
    },
    disabledGroupActionContainer: {
        opacity: 0.5,
    },
    groupActionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
    },
    groulLabel: {
        fontSize: 14,
        textAlign: "center",
        textAlignVertical: "center",
    },
    itemContainer: {
        marginRight: 5,
        height: 45,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "red",
        flexWrap: "wrap",
        flexDirection: "row",
        paddingHorizontal: 10,
        backgroundColor: "white",
        borderRadius: 6,
        elevation: 5,
        shadowColor: "#00000030",
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 1,
        shadowRadius: 10,
    },
    slider: {
        width: 150,
        height: 45,
    },
    modal: {
        margin: 0,
        marginTop: height / 2,
        elevation: 5,
        backgroundColor: "transparent",
    },
    headerText: {
        fontSize: 16,
        color: "gray",
        fontFamily: Platform.select({
            android: "Montserrat-SemiBold",
            ios: "Montserrat-SemiBold",
        }),
    },
    normalText: {
        fontSize: 13,
        color: "gray",
    },
    itemText: {
        fontSize: 12,
        color: "gray",
        textAlign: "center",
        textAlignVertical: "center",
    },
    selectedItemText: {
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
});

styles.slider.width =
    width - styles.modal.marginHorizontal * 2 - styles.container.paddingHorizontal * 2 - 150;

export default ItemDonationModal;
