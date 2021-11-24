import {Linking, Platform} from "react-native";

export function callMobile(mobileNumber) {
    if (mobileNumber && mobileNumber !== "-") Linking.openURL(`tel:${mobileNumber}`);
}

export async function openMaps(address) {
    if (!address) return;
    const label = "Custom Label";
    const url = Platform.select({
        ios: `maps:0,0?q=${address}${label}`,
        android: `geo:0,0?q=${address}${label}`,
    });
    const isOpenable = await Linking.canOpenURL(url);
    if (isOpenable) Linking.openURL(url);
}

export async function openEmail(email) {
    if (!email) return;
    const url = `mailto:${email}`;
    const isOpenable = await Linking.canOpenURL(url);
    if (isOpenable) Linking.openURL(url);
}

export async function openUrl(url) {
    if (!url) return;
    const isOpenable = await Linking.canOpenURL(url);
    if (isOpenable) Linking.openURL(url);
}

export const getStartingUrl = async () => {
    return Linking.getInitialURL();
};

export function getRouteFromurl(url) {
    const route = url.replace(/.*?:\/\//g, "");
    return route;
}
