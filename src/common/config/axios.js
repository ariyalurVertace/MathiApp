import axios from "axios";
import CONFIG from "react-native-config";
import * as Config from "./config_constant";
import {getTokenFromStorage} from "../functions/local_storage";
import {setSnackbarText} from "../redux/common_reducer";
import {getStatusCodeMessage, checkIfInternetIsConnected} from "../functions/utils";
import * as STRING_CONSTANTS from "../constants/string_constants";

import Store from "../redux/store";

let authClient = null;

const request = async function(options) {
    if (!authClient)
        authClient = axios.create({
            baseURL: CONFIG.API_BASE_URL,
            timeout: Config.TIMEOUT,
        });

    authClient.defaults.headers["token"] = await getTokenFromStorage();

    const onSuccess = function(response) {
        return response.data.result;
    };
    const onError = function(error) {
        if (error) Store.dispatch(setSnackbarText(error));
        return Promise.reject(error);
    };

    const onTokenExpired = function async() {
        // logger(`Error api call: ${options.url} ${error}`, "e");
        // eslint-disable-next-line promise/catch-or-return
        // Promise.all([setLocalUser(""), setTokenToStorage("")]);
        // navigationService.navigateReset("login");
        Store.dispatch(setSnackbarText("Token expired. Please login again"));
        return Promise.reject("Token expired");
    };
    try {
        if (!(await checkIfInternetIsConnected())) {
            return onError(STRING_CONSTANTS.CHECK_INTERNET);
        }
        const response = await authClient(options);
        if (response?.data?.statusCode === "200") return onSuccess(response);
        if (response?.data?.statusCode === "401") return onTokenExpired(response);
        if (response?.data?.errors.length) return onError(response.data.errors[0].message);
        return onError(getStatusCodeMessage(response?.data?.statusCode, options.errors));
    } catch (error) {
        return onError();
    }
};

export default request;
