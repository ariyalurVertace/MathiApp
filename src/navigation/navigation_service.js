import * as React from "react";

export const navigationRef = React.createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export function navigateReset(name, params) {
    navigationRef.current?.resetRoot({
        index: 0,
        routes: [{name, params}],
    });
}

export function goBack() {
    navigationRef.current?.goBack();
}
