import * as navigationService from "../../navigation/navigation_service";

// import {clearAll} from "../redux/common_action";
import Store from "../redux/store";
// import {CONFIRM_LOGOUT} from "../constants/string_constants";
import {removeAllLocalData} from "./local_storage";

export async function doLogout() {
    await removeAllLocalData();
    navigationService.navigateReset("officerLogin");
}

export async function checkIfLoggedIn() {
    const {user, token} = Store.getState().common;
    return user && token;
}

export function getAuth() {
    const commonState = Store.getState().common;
    return commonState?.token;
}
