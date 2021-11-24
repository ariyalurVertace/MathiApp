import {Dimensions} from "react-native";
import lodashAssign from "lodash/assign";
import NetInfo from "@react-native-community/netinfo";
import lodashCloneDeep from "lodash/cloneDeep";
import {statusCodes} from "../config/config_constant";
import * as STRING_CONSTANTS from "../constants/string_constants";
import Store from "../redux/store";
import {setSnackbarText} from "../redux/common_reducer";

export function getHeightFromPercentage(value) {
    let {height} = Dimensions.get("window");
    return Math.round((height * value) / 100);
}

export function getWidthFromPercentage(value) {
    const {width} = Dimensions.get("window");
    return Math.round((width * value) / 100);
}

export function convertToString(value = "") {
    if (typeof value !== "string") return JSON.stringify(value);
    return value;
}

export function copyArray(arr = []) {
    return JSON.parse(JSON.stringify(arr));
}

export function getStatusCodeMessage(statusCode, errors) {
    const statusCodeMessages = lodashAssign(STRING_CONSTANTS, errors);

    switch (statusCode) {
        case statusCodes.SUCCESS:
            return "";
        case statusCodes.NOTFOUND:
            return statusCodeMessages.NOT_FOUND_MESSSGE;
        case statusCodes.DUPLICATE:
            return statusCodeMessages.DUPLICATE_MESSAGE;
        case statusCodes.NOT_AUTHORIZED:
            return statusCodeMessages.UNAUTHORIZED_MESSAGE;
        case statusCodes.SERVER_ERROR:
            return statusCodeMessages.SOMETHING_WENT_WRONG;
        case statusCodes.INVALID_DATA:
            return statusCodeMessages.INVALID_DATA_MESSAGE;

        default:
            return statusCodeMessages.SOMETHING_WENT_WRONG;
    }
}

export async function checkIfInternetIsConnected(show = true) {
    try {
        const isConnected = await NetInfo.fetch();
        if (isConnected.isConnected) return true;

        if (show) {
            // Snackbar.show({
            //     title: STRING_CONSTANTS.TURN_ON_INTERNET,
            //     duration: Snackbar.LENGTH_LONG,
            // });
            Store.dispatch(setSnackbarText(STRING_CONSTANTS.TURN_ON_INTERNET));
        }
        return false;
    } catch (error) {
        if (show) {
            // Snackbar.show({
            //     title: STRING_CONSTANTS.CHECK_INTERNET,
            //     duration: Snackbar.LENGTH_LONG,
            // });
            Store.dispatch(setSnackbarText(STRING_CONSTANTS.CHECK_INTERNET));
        }
        return false;
    }
}

export function getNewObject(object = {}) {
    return lodashCloneDeep(object);
}

export function areObjectsEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
