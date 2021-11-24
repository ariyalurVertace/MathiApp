import AsyncStorage from "@react-native-async-storage/async-storage";
import {convertToString} from "./utils";

export async function removeAllLocalData() {
    await AsyncStorage.multiRemove(["user", "token", "language"]);
}

export async function getLocalUser() {
    const user = await AsyncStorage.getItem("user");
    return JSON.parse(user);
    // return user;
}

export async function setLocalUser(user) {
    await AsyncStorage.setItem("user", convertToString(user));
}

export async function setTokenToStorage(token) {
    await AsyncStorage.setItem("token", convertToString(token));
}

export async function getTokenFromStorage() {
    const token = await AsyncStorage.getItem("token");
    return token || null;
}

export async function setFCMTokenToStorage(token) {
    await AsyncStorage.setItem("fcmtoken", convertToString(token));
}

export async function getFCMTokenFromStorage() {
    const token = await AsyncStorage.getItem("fcmtoken");
    return token || null;
}

export async function getLanguageFromLocal() {
    const user = await AsyncStorage.getItem("language");
    // return JSON.parse(user);
    return user;
}

export async function setLanguageFromLocal(lan) {
    await AsyncStorage.setItem("language", convertToString(lan));
}
