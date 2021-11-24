/* eslint-disable max-classes-per-file */
import React, {Component} from "react";
import {getStatusBarHeight} from "react-native-status-bar-height";
import {
    View,
    StyleSheet,
    Platform,
    TouchableWithoutFeedback,
    Animated,
    Keyboard,
    StatusBar,
    Text,
    TextInput,
    Dimensions,
    PixelRatio,
    Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
// import FastImage from "react-native-fast-image";
import Button from "../common/components/button";
import * as IMAGE from "../common/constants/image_constants";
import * as STRING_CONSTANT from "../common/constants/string_constants";
import {setLanguage, setLabels, setUser, setSnackbarText} from "../common/redux/common_reducer";
import {
    setLanguageFromLocal,
    setLocalUser,
    setTokenToStorage,
} from "../common/functions/local_storage";
import Store from "../common/redux/store";
import * as navigationService from "../navigation/navigation_service";
import {getOtp, login} from "../helper/api_helper";
import * as COLOR_CONSTANT from "../common/constants/color_constants";

let Height = Dimensions.get("window").height;
let statusBarHeight = getStatusBarHeight();
let pageHeight = Height + statusBarHeight;

class FadeInView extends React.Component {
    state = {
        fadeAnim: new Animated.Value(0), // Initial value for opacity: 0
    };

    componentDidMount() {
        Animated.timing(
            // Animate over time
            this.state.fadeAnim, // The animated value to drive
            {
                toValue: 1, // Animate to opacity: 1 (opaque)
                duration: 1500, // Make it take a while
            },
        ).start(); // Starts the animation
    }

    render() {
        let {fadeAnim} = this.state;

        return (
            <Animated.View // Special animatable View
                style={{
                    ...this.props.style,
                    opacity: fadeAnim, // Bind opacity to animated value
                }}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}

class OfficerLoginScreen extends Component {
    INITIAL_STATE = {
        bottomContainerHeight: 0,
        hidePassword: true,
        containerHeight: new Animated.Value(pageHeight),
        maxTopContainerHeight: new Animated.Value(0),
        keyboardVisible: false,
        LOGO_CONTAINER_HEIGHT: PixelRatio.get() <= 2 ? 135 : 165,
        LOGO_CONTAINER_WIDTH: PixelRatio.get() <= 2 ? 135 : 165,
        password: "",
        mobile: "",
        isOtpGenerated: false,
        isButtonLoading: false,
    };

    constructor(props) {
        super(props);
        this.state = this.INITIAL_STATE;
    }

    componentWillUnmount() {
        if (this.keyboardDidShowListener) this.keyboardDidShowListener.remove();
        if (this.keyboardDidHideListener) this.keyboardDidHideListener.remove();
    }

    componentWillMount() {
        if (Platform.OS === "ios") {
            this.keyboardDidShowListener = Keyboard.addListener(
                "keyboardWillShow",
                this.keyboardDidShow.bind(this),
            );
            this.keyboarDidHideListener = Keyboard.addListener(
                "keyboardWillHide",
                this.keyboardDidHide.bind(this),
            );
        } else {
            this.keyboardDidShowListener = Keyboard.addListener(
                "keyboardDidShow",
                this.keyboardDidShow.bind(this),
            );
            this.keyboarDidHideListener = Keyboard.addListener(
                "keyboardDidHide",
                this.keyboardDidHide.bind(this),
            );
        }
        this.state.maxTopContainerHeight.addListener(value => {
            this._value = value;
        });
    }

    runTimer = () => {
        const {timer} = this.state;
        const newTimer = timer > 1 ? timer - 1 : 0;
        this.setState(
            {
                timer: newTimer,
            },
            () => {
                const shouldStopTimer = newTimer === 0;
                if (shouldStopTimer) this.stopOtpTimer();
            },
        );
    };

    stopOtpTimer = () => {
        if (this.otpTimer) {
            clearInterval(this.otpTimer);
        }
    };

    getOtpText = () => {
        const {timer} = this.state;

        if (timer) return `Wait ${timer} sec`;
        return "RESEND OTP";
    };

    startOtpTimer = () => {
        this.setState(
            {
                timer: 60,
            },
            () => {
                this.otpTimer = setInterval(() => {
                    this.runTimer();
                }, 1000);
            },
        );
    };

    keyboardDidShow = event => {
        this.setState({
            keyboardVisible: true,
            keyboardHeight: event.endCoordinates.height,
        });
        Animated.parallel([
            Animated.spring(this.state.containerHeight, {
                toValue: pageHeight - event.endCoordinates.height,
            }),
        ]).start();
    };

    keyboardDidHide = () => {
        this.setState({
            keyboardVisible: false,
            keyboardHeight: 0,
        });
        Animated.parallel([
            Animated.spring(this.state.containerHeight, {
                toValue: pageHeight,
            }),
        ]).start();
    };

    async generateOtp() {
        this.setState({isButtonLoading: true});
        let result = await getOtp(this.state.mobile);
        this.setState({isButtonLoading: false});
        if (result === "true") {
            this.setState({isOtpGenerated: true});
            this.startOtpTimer();
        } else if (result === "invalid") {
            Store.dispatch(setSnackbarText("Invalid mobile number"));
        } else if (result === "noInternet") {
            Store.dispatch(setSnackbarText(STRING_CONSTANT.CHECK_INTERNET));
        } else {
            Store.dispatch(setSnackbarText("Somthing went wrong. please try again"));
        }
    }

    async authenticate() {
        this.setState({isButtonLoading: true});
        Keyboard.dismiss();

        let result = await login(this.state.mobile, this.state.password);
        this.setState({isButtonLoading: false});
        if (result.token) {
            await setLocalUser(result);
            await setTokenToStorage(result.token);
            Store.dispatch(setUser(result));

            Store.dispatch(setLanguage("English"));
            Store.dispatch(setLabels(STRING_CONSTANT.EN));
            await setLanguageFromLocal("English");
            // this.props.navigation.navigate("home");
            navigationService.navigateReset("home");
        } else if (result === "noInternet") {
            Store.dispatch(setSnackbarText(STRING_CONSTANT.CHECK_INTERNET));
        } else {
            Store.dispatch(setSnackbarText("Login Failed. Invalid OTP"));
        }

        // setTimeout(async () => {
        //     let user = {
        //         Name: "Shiyamala Marimuthu",
        //         MobileNumber: "8526892173",
        //         Email: "shiyamala@vertace.com",
        //         Photo: "",
        //     };
        //     await setLocalUser(user);
        //     Store.dispatch(setUser(user));

        //     Store.dispatch(setLanguage("English"));
        //     Store.dispatch(setLabels(STRING_CONSTANT.EN));
        //     await setLanguageFromLocal("English");
        //     // this.props.navigation.navigate("home");
        //     navigationService.navigateReset("home");
        // }, 2000);
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Animated.View style={[styles.container, {maxHeight: this.state.containerHeight}]}>
                    <LinearGradient
                        colors={["#584BDD", "#8D51F3", "#AA55FF"]}
                        start={{x: 0.0, y: 1.0}}
                        end={{x: 1.0, y: 0}}
                        locations={[0.65, 0.85, 1]}
                        style={{flex: 1}}
                    >
                        <View style={{height: getStatusBarHeight()}}>
                            <StatusBar
                                backgroundColor="transparent"
                                translucent
                                barStyle="light-content"
                            />
                        </View>
                        <Animated.View
                            style={[
                                styles.topContainer,
                                {
                                    height: this.state.maxTopContainerHeight,
                                    // backgroundColor: 'pink'
                                },
                                this.state.maxTopContainerHeight.__getValue() > 0 ? {} : {flex: 1},
                                !this.state.keyboardVisible
                                    ? {
                                          justifyContent: "flex-start",
                                          paddingTop: 25 + statusBarHeight,
                                      }
                                    : {
                                          justifyContent: "center",
                                          paddingVertical: 5,
                                          //   paddingTop: statusBarHeight,
                                      },
                            ]}
                        >
                            <View
                                style={[
                                    styles.logoColorContainer,
                                    {
                                        height: this.state.maxTopContainerHeight.__getValue() - 20,
                                        maxHeight: this.state.LOGO_CONTAINER_HEIGHT,
                                        maxWidth: this.state.LOGO_CONTAINER_WIDTH,
                                        borderRadius: 30,
                                    },
                                    this.state.maxTopContainerHeight.__getValue() > 0
                                        ? {}
                                        : {flex: 1},
                                ]}
                            >
                                <Image
                                    resizeMode="contain"
                                    source={IMAGE.APP_LOGO}
                                    style={[styles.logoStyle]}
                                />
                            </View>
                            {!this.state.keyboardVisible && (
                                <View style={{paddingTop: 20}}>
                                    <Text style={styles.headerText}>
                                        {STRING_CONSTANT.APP_NAME}
                                    </Text>
                                </View>
                            )}
                        </Animated.View>
                        <View
                            style={[
                                styles.bottomContainer,
                                this.state.maxTopContainerHeight.__getValue() > 0
                                    ? {}
                                    : {flexShrink: 2},
                            ]}
                            onLayout={event => {
                                let maxTopContainerHeight =
                                    pageHeight -
                                    event.nativeEvent.layout.height -
                                    statusBarHeight -
                                    // eslint-disable-next-line react/no-access-state-in-setstate
                                    this.state.keyboardHeight;

                                if (!maxTopContainerHeight) maxTopContainerHeight = 0;
                                if (
                                    this.state.maxTopContainerHeight.__getValue() === 0 &&
                                    maxTopContainerHeight > 0
                                )
                                    this.state.maxTopContainerHeight.setValue(
                                        maxTopContainerHeight + this.state.keyboardHeight,
                                    );
                                if (maxTopContainerHeight > 0)
                                    Animated.parallel([
                                        Animated.spring(this.state.maxTopContainerHeight, {
                                            toValue: maxTopContainerHeight,
                                            // toValue: maxTopContainerHeight > 0 ? maxTopContainerHeight : 1
                                        }),
                                    ]).start();
                                else
                                    this.state.maxTopContainerHeight.setValue(
                                        maxTopContainerHeight,
                                    );
                            }}
                        >
                            {!this.state.keyboardVisible && (
                                <View style={styles.headerUnderLine}>
                                    <Text style={styles.headerText}>{"LOGIN"}</Text>
                                </View>
                            )}

                            <View style={styles.inputParentContainer}>
                                <View style={styles.inputHintContainer}>
                                    <Text style={styles.inputHint}>{"MOBILE NUMBER"}</Text>
                                </View>
                                <View
                                    style={[
                                        styles.inputChildContainer,
                                        this.props.mobileError
                                            ? {
                                                  backgroundColor: "#FAF1EF",
                                                  borderColor: "#FF6C4C",
                                                  borderWidth: 1,
                                              }
                                            : {
                                                  backgroundColor: "#F5F5F5",
                                                  borderWidth: 0,
                                              },
                                    ]}
                                >
                                    <TextInput
                                        autoCorrect={false}
                                        ref={mobile => {
                                            this.mobile = mobile;
                                        }}
                                        editable={!this.props.isButtonLoading}
                                        style={[
                                            styles.inputText,
                                            this.props.mobileError
                                                ? {color: "#FF6C4C"}
                                                : {color: "#444444"},
                                        ]}
                                        paddingLeft={10}
                                        keyboardType="numeric"
                                        containerStyle={{
                                            textAlignVertical: "center",
                                            alignSelf: "center",
                                        }}
                                        returnKeyType="next"
                                        blurOnSubmit={false}
                                        onSubmitEditing={() => {
                                            Keyboard.dismiss();
                                            // if (this.props.isOtpGenerated) this.password.focus();
                                            // else {
                                            //     this.props.generateOtp();
                                            // }
                                        }}
                                        underlineColorAndroid="transparent"
                                        maxLength={10}
                                        placeholder={"Enter mobile number"}
                                        placeholderTextColor={
                                            this.props.mobileError ? "#FF6C4C" : "#44444420"
                                        }
                                        onChangeText={text => this.setState({mobile: text})}
                                        value={this.state.mobile}
                                    />
                                </View>
                                {this.state.isOtpGenerated && (
                                    <FadeInView>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                paddingVertical: 5,
                                                marginLeft: 20,
                                            }}
                                        >
                                            <Text style={styles.inputHint}>{"OTP"}</Text>
                                            <Text
                                                onPress={() => {
                                                    //Snackbar displays behind keyboard in ios #BUG#
                                                    if (!this.state.timer) {
                                                        Keyboard.dismiss();
                                                        this.generateOtp(true);
                                                    }
                                                }}
                                                style={[
                                                    styles.inputHint,
                                                    {
                                                        marginRight: 20,
                                                        textDecorationLine: "underline",
                                                    },
                                                ]}
                                            >
                                                {this.getOtpText()}
                                            </Text>
                                        </View>
                                        <View
                                            style={[
                                                styles.inputChildContainer,
                                                this.props.passwordError
                                                    ? {
                                                          backgroundColor: "#FAF1EF",
                                                          borderColor: "#FF6C4C",
                                                          borderWidth: 1,
                                                      }
                                                    : {
                                                          backgroundColor: "#F5F5F5",
                                                          borderWidth: 0,
                                                      },
                                            ]}
                                        >
                                            <TextInput
                                                autoCorrect={false}
                                                ref={password => {
                                                    this.password = password;
                                                }}
                                                editable={!this.props.isButtonLoading}
                                                style={[
                                                    styles.inputText,
                                                    this.props.passwordError
                                                        ? {
                                                              color: "#FF6C4C",
                                                          }
                                                        : {
                                                              color: "#444444",
                                                          },
                                                ]}
                                                keyboardType="numeric"
                                                paddingLeft={10}
                                                containerStyle={{
                                                    textAlignVertical: "center",
                                                    alignSelf: "center",
                                                }}
                                                maxLength={4}
                                                returnKeyType="done"
                                                onSubmitEditing={() => {
                                                    // this.props.authenticate();
                                                    //Snackbar displays behind keyboard in ios #BUG#
                                                    if (Platform.OS === "ios") Keyboard.dismiss();
                                                }}
                                                placeholderTextColor={
                                                    this.props.passwordError
                                                        ? "#FF6C4C"
                                                        : "#44444420"
                                                }
                                                placeholder={"Enter OTP"}
                                                underlineColorAndroid="transparent"
                                                onChangeText={text =>
                                                    this.setState({password: text})
                                                }
                                                value={this.state.password}
                                            />
                                        </View>
                                    </FadeInView>
                                )}
                            </View>

                            <Button
                                loading={!!this.state.isButtonLoading}
                                disabled={
                                    this.state.mobile.length <= 9
                                        ? true
                                        : this.state.isButtonLoading
                                        ? true
                                        : !!(
                                              this.state.password.length !== 4 &&
                                              this.state.isOtpGenerated
                                          )
                                }
                                text={this.state.isOtpGenerated ? "LOGIN" : "SEND OTP"}
                                onPress={() => {
                                    //Snackbar displays behind keyboard in ios #BUG#
                                    Keyboard.dismiss();
                                    this.state.isOtpGenerated
                                        ? this.authenticate()
                                        : this.generateOtp();
                                }}
                                containerStyle={{
                                    marginHorizontal: 15,
                                    marginTop: 5,
                                    //  marginBottom: 30,
                                }}
                            />
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "black",
                                    margin: 10,
                                    // bottom: 10,
                                }}
                            >
                                {"Don't have an account ? "}
                                <Text
                                    onPress={() => this.props.navigation.navigate("signUp")}
                                    style={styles.registerText}
                                >
                                    Register
                                </Text>
                            </Text>
                            <Text style={{paddingBottom: 6, textAlign: "center"}}>
                                {"Powered by Vertace"}
                            </Text>

                            {
                                // !this.state.keyboardVisible &&
                                <View
                                    style={[
                                        styles.bottomBehindContainer,
                                        this.state.keyboardVisible ? {top: "45%"} : {top: "60%"},
                                    ]}
                                />
                            }
                        </View>
                    </LinearGradient>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

export default OfficerLoginScreen;

const styles = StyleSheet.create({
    container: {
        zIndex: -1,
        flex: 1,
        backgroundColor: "#8951F1",
    },
    topContainer: {
        zIndex: 1,
        alignItems: "center",
    },
    bottomBehindContainer: {
        position: "absolute",
        backgroundColor: "#FFFFFF",
        zIndex: -1,
        left: 0,
        right: 0,
        bottom: 0,
    },
    bottomContainer: {
        zIndex: 1,
        justifyContent: "flex-end",
    },
    inputContainer: {
        flex: 3,
        marginBottom: 10,
    },
    iconDisplay: {
        width: 110,
        height: 100,
    },
    logoContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logoColorContainerWrapper: {
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        elevation: 10,
        shadowColor: "#00000040",
        shadowOffset: {width: 0, height: 15},
        shadowOpacity: 1,
        shadowRadius: 20,
    },
    logoColorContainer: {
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
    },
    headerUnderLine: {
        alignItems: "flex-start",
        borderBottomWidth: 2,
        borderColor: "#fff",
        alignSelf: "flex-start",
        paddingRight: 10,
        paddingBottom: 5,
        marginLeft: 20,
        marginBottom: 30,
    },
    headerText: {
        color: "#fff",
        fontSize: 20,
        fontFamily: Platform.select({
            android: "Montserrat-SemiBold",
            ios: "Montserrat-SemiBold",
        }),
    },
    inputParentContainer: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 15,
        marginBottom: 10,
        borderRadius: 5,
        elevation: 3,
        shadowColor: "#00000025",
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 1,
        shadowRadius: 20,
        paddingBottom: 10,
    },
    inputHintContainer: {
        alignItems: "flex-start",
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 5,
    },
    inputHint: {
        fontSize: 12,
        color: COLOR_CONSTANT.THEME_COLOR,
        fontFamily: Platform.OS === "ios" ? "SFProDisplay-Semibold" : "sfprodisplay_semibold",
    },
    inputChildContainer: {
        backgroundColor: "#F5F5F5",
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
    },
    inputText: {
        flex: 1,
        width: "100%",
        borderRadius: 5,
        textAlignVertical: "center",
    },
    childFooterContainer: {
        flex: 1,
        justifyContent: "flex-end",
        paddingBottom: 10,
        backgroundColor: "#FFFFFF",
        zIndex: 1,
    },
    childFooterTextContainer: {
        alignItems: "center",
        marginBottom: 10,
    },
    childFooterTextStyle: {
        color: "#623DEE",
        fontSize: 12,
        fontFamily: Platform.OS === "ios" ? "SFProDisplay-Bold" : "sfprodisplay_bold",
    },
    logoStyle: {
        flex: 1,
        width: "85%",
        height: "85%",
        transform: [{rotate: "-45deg"}],
    },
    signUp: {
        // color: "#fff",
        textAlign: "right",
    },
    registerText: {
        fontFamily: Platform.select({
            android: "Montserrat-SemiBold",
            ios: "Montserrat-SemiBold",
        }),
        color: COLOR_CONSTANT.THEME_COLOR,
    },
});
