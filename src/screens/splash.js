import React, {Component} from "react";
import {View, Text, StyleSheet, Image, StatusBar} from "react-native";
import CodePush from "react-native-code-push";
import LinearGradient from "react-native-linear-gradient";
import {CommonActions} from "@react-navigation/native";
import * as IMAGE_CONSTANTS from "../common/constants/image_constants";
import * as STRING_CONSTANTS from "../common/constants/string_constants";
import {getLocalUser, getLanguageFromLocal} from "../common/functions/local_storage";
import {codePushOptions} from "../common/constants/config_constant";
// import {setLanguage, setLabels} from "../common/redux/common_reducer";
import Store from "../common/redux/store";
import {setLanguage, setLabels, setUser} from "../common/redux/common_reducer";
import DeviceInfo from "react-native-device-info";

let version = "-";

export default class SplashScreen extends Component {
    async checkCodePushUpdate() {
        try {
            this.setState({silentUpdate: true});
            const update = await CodePush.checkForUpdate(codePushOptions.deploymentKey);
            if (update && update.isMandatory) {
                this.setState({silentUpdate: false});
                CodePush.sync(
                    {
                        installMode: CodePush.InstallMode.IMMEDIATE,
                        ...codePushOptions,
                    },
                    this.codePushStatusDidChange.bind(this),
                    this.codePushDownloadDidProgress.bind(this),
                );
            } else if (update && !update.isMandatory) {
                this.setState({silentUpdate: true});
                CodePush.sync({
                    ...codePushOptions,
                });
            }
        } catch (error) {
            console.log(`Error in code push update : ${JSON.stringify(error)}`);
        }
    }

    codePushStatusDidChange(syncStatus) {
        switch (syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                this.setState({
                    syncMessage: "Checking for update.",
                    updateProgress: false,
                });
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                this.setState({
                    syncMessage: STRING_CONSTANTS.DOWNLOADING_PACKAGE,
                    updateProgress: true,
                });
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                this.setState({
                    syncMessage: STRING_CONSTANTS.INSTALLING_PACKAGE,
                    updateProgress: true,
                });
                break;
            default: {
                this.setState({
                    syncMessage: STRING_CONSTANTS.UPDATING,
                    updateProgress: false,
                });
            }
        }
    }

    codePushDownloadDidProgress(progress) {
        this.setState({progress});
    }

    async componentDidMount() {
        let versionNumber = DeviceInfo.getVersion();

        let update = await CodePush.getUpdateMetadata(CodePush.UpdateState.LATEST);
        if (update) {
            versionNumber += `.${update.label}`;
        } else {
            versionNumber += ".v0";
        }

        version = versionNumber;
        await this.checkCodePushUpdate();
        let user = await getLocalUser();

        Store.dispatch(setUser(user));

        let language = await getLanguageFromLocal();
        if (language) {
            Store.dispatch(setLanguage(language));

            if (language === "தமிழ்") {
                Store.dispatch(setLabels(STRING_CONSTANTS.TA));
            } else if (language === "English") {
                Store.dispatch(setLabels(STRING_CONSTANTS.EN));
            }
        }
        if (user) {
            // navigationService.navigateReset("home");
            this.props.navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{name: "home"}],
                }),
            );
        } else {
            this.props.navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{name: "officerLogin"}],
                }),
            );
            // navigationService.navigateReset("stationLoginScreen");
        }
    }

    render() {
        return (
            <LinearGradient
                colors={["#584BDD", "#8D51F3", "#AA55FF"]}
                start={{x: 0.0, y: 1.0}}
                end={{x: 1.0, y: 0}}
                locations={[0.65, 0.85, 1]}
                style={{flex: 1}}
            >
                <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
                <View style={{flex: 1}}>
                    <View
                        style={{
                            zIndex: 1,
                            alignItems: "center",
                            justifyContent: "flex-end",
                            flex: 0.7,
                        }}
                    >
                        <View
                            style={{
                                aspectRatio: 1,
                                backgroundColor: "#FFFFFF",
                                alignItems: "center",
                                justifyContent: "center",
                                elevation: 10,
                                shadowColor: "#00000040",
                                shadowOffset: {width: 0, height: 15},
                                shadowOpacity: 1,
                                shadowRadius: 20,
                                transform: [{rotate: "45deg"}],
                                borderRadius: 30,
                            }}
                        >
                            <View
                                style={{
                                    width: 220,
                                    height: 220,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Image style={styles.logo} source={IMAGE_CONSTANTS.APP_LOGO} />
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop: "20%", alignItems: "center"}}>
                        <Text style={styles.nameStyle}>{STRING_CONSTANTS.APP_NAME}</Text>
                    </View>
                </View>
                <View style={{alignItems: "center"}}>
                    <Text
                        style={{color: "white", fontSize: 12, paddingBottom: 5}}
                    >{`VERSION ${version}`}</Text>
                    <Text style={{color: "white", paddingBottom: 5}}>{"Powered by Vertace"}</Text>
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 200,
        resizeMode: "contain",
        transform: [{rotate: "-45deg"}],
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    nameContainer: {
        marginTop: 10,
    },
    nameStyle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "white",
    },
});
