import Config from "react-native-config";

// eslint-disable-next-line import/prefer-default-export
export const statusCodes = {
    SUCCESS: "200",
    NOT_FOUND: "404",
    NOT_AUTHORIZED: "401",
    DUPLICATE: "409",
    SERVER_ERROR: "500",
    DATRA_MISSING: "412",
    INVALID_DATA: "422",
    TOO_MANY_REQUESTS: "429",
};

export const gracePeriod = 2 * 86400;

export const codePushOptions = {
    deploymentKey: Config.CODE_PUSH_KEY_ANDROID,
};
