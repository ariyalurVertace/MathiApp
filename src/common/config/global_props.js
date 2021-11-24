import {Platform} from "react-native";
import {setCustomText} from "react-native-global-props";

// eslint-disable-next-line import/prefer-default-export
export function setGlobalProps() {
    const customTextProps = {
        style: {
            fontFamily: Platform.select({
                android: "Montserrat-Regular",
                ios: "Montserrat-Regular",
            }),
        },
    };
    setCustomText(customTextProps);
}
