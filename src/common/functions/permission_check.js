/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/prefer-await-to-then */
/* eslint-disable promise/no-nesting */
import {BackHandler, Alert} from "react-native";
import {
    PERMISSIONS,
    checkMultiple,
    requestMultiple,
    check,
    request,
} from "react-native-permissions";

export async function permissionCheck(permission, header, message, wantToExit = false) {
    let fineLocationStatus = await check(permission);
    if (fineLocationStatus !== "granted") {
        Alert.alert(
            header,
            message,
            [
                {
                    text: "Quit",
                    onPress: () => {
                        if (wantToExit) {
                            BackHandler.exitApp();
                        }
                        return false;
                    },
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: async () => {
                        fineLocationStatus = await request(permission);
                        if (fineLocationStatus !== "granted") {
                            if (wantToExit) {
                                Alert.alert("", "Please enable location access");
                                BackHandler.exitApp();
                            }
                            return false;
                        }
                        return true;
                    },
                },
            ],
            {cancelable: false},
        );
    } else {
        return true;
    }
}

function checkIfMultiplePermissionsGranted(permissions) {
    // let status = Object.keys(permissions).every(
    //     key => permissions[key] === "granted" || permissions[key] === "unavailable",
    // );

    let status = Object.values(permissions).some(a => a === "granted");

    console.log(`bgLocationResult ${JSON.stringify(permissions)}`);
    console.log(`bgLocationStatus ${status}`);
    return status ? "granted" : "denied";
}

export async function handleLocationPermission() {
    const permissionsRequired = [
        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ];

    let bgLocationResult = await checkMultiple(permissionsRequired);
    let bgLocationStatus = checkIfMultiplePermissionsGranted(bgLocationResult);

    if (bgLocationStatus !== "granted") {
        bgLocationResult = await requestMultiple(permissionsRequired);

        bgLocationStatus = checkIfMultiplePermissionsGranted(bgLocationResult);

        if (bgLocationStatus !== "granted") {
            Alert.alert("", "Please enable background location access");

            return false;
        }
    }

    return true;
}
