import React from "react";
import {SafeAreaView} from "react-native";
import {Provider} from "react-redux";
import CodePush from "react-native-code-push";
import {ModalPortal} from "react-native-modals";
import Router from "./src/navigation/router";
import Store from "./src/common/redux/store";
import Loader from "./src/common/components/loader_component";
import Snackbar from "./src/common/components/snackbar";
import {setGlobalProps} from "./src/common/config/global_props";

const codePushOptions = {
    checkFrequency: CodePush.CheckFrequency.MANUAL,
    ...codePushOptions,
};

setGlobalProps();

const App = CodePush(codePushOptions)(() => {
    return (
        <Provider store={Store}>
            <SafeAreaView style={{flex: 1, backgroundColor: "#ffffff"}}>
                <Router />
                <Loader />
                <Snackbar />
                <ModalPortal />
            </SafeAreaView>
        </Provider>
    );
});

export default App;
