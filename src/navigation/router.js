import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import HomeScreen from "../screens/home";
import StationLoginScreen from "../screens/stationLogin";
import OfficerLoginScreen from "../screens/officerLoginScreen";
import DetailsScreen from "../screens/details";
import SplashScreen from "../screens/splash";
import EbeatScreen from "../screens/ebeat";
import Scan from "../screens/scan";
import FeedbackScreen from "../screens/feedback";
import RequestScreen from "../screens/request";
import EbeatDetailsScreen from "../screens/eBeatDetails";
import SettingsScreen from "../screens/settings";
import ReachmeScreen from "../screens/reachme";
import RequestDetails from "../screens/requestDetails";
import ProfileScreen from "../screens/profile";
import VolunteersViewScreen from "../screens/volunteersView";
import AddRequestScreen from "../screens/addRequest";
import FeedbackListScreen from "../screens/feedbackList";
import FeedbackViewScreen from "../screens/feedbackview";
import ImageSlider from "../screens/imageSlider";
import FeedbackFilter from "../screens/feedbackFilterDrawer";
import RequestFilter from "../screens/requestFilter";
import SignUp from "../screens/signUp";
import SignUpSuccess from "../screens/signUpSuccess";
import LocationsScreen from "../screens/locations";
import LocationScreen from "../screens/location";
import LocationViewScreen from "../screens/viewLocation";
import CheckinsScreen from "../screens/chekins";
import WelfareRequestdetailsScreen from "../screens/welfareRequestDetails";
import OfficerDirectoryScreen from "../screens/officerDirectory";
import DepartmentofficersScreen from "../screens/departmentOfficerList";
import OfficerViewScreen from "../screens/officerView";
import LineItemDetailsScreen from "../screens/lineItemDetails";
import LineItemHistoryScreen from "../screens/lineItemHistory";

import RequestListScreen from "../screens/requestList";
import PersonListScreen from "../screens/personList";
import PersonScreen from "../screens/persons";
import PersonDetail from "../screens/personDetail";
import SubTypeList from "../screens/subTypeList";
import Subtype from "../screens/subtype";
import AssignTo from "../screens/assignTo";
import ReachmeVolunteersScreen from "../screens/reachmeVolunteertab";
import ReachmeVolunteerDetailsScreen from "../screens/reachmeVoluteerDetails";
import {navigationRef} from "./navigation_service";
import {setNavigationFilterrHome} from "../common/functions/drawerFunction";
import VolunteerList from "../screens/volunteerList";
import PeopleDirectoryScreen from "../screens/peopleDirectory";
import ViewPeopleScreen from "../screens/viewPeople";
import AboutScreen from "../screens/about";
import PoliceOfficerDirectoryScreen from "../screens/policeOfficerDirectory";
import CheckinsHistoryScreen from "../screens/checkinHistory";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function feedbackstack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="FeedbackListScreen"
                component={FeedbackListScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
function requeststack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="RequestListScreen"
                component={RequestListScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}

function FeedbackFilterStack() {
    return (
        <Drawer.Navigator
            drawerContent={props => <FeedbackFilter {...props} />}
            drawerPosition="right"
            screenOptions={({navigation}) => {
                setNavigationFilterrHome(navigation);
            }}
        >
            <Drawer.Screen
                name="Filter"
                options={{drawerLabel: "Filter"}}
                component={feedbackstack}
            />
        </Drawer.Navigator>
    );
}

function RequestFilterStack() {
    return (
        <Drawer.Navigator
            drawerContent={props => <RequestFilter {...props} />}
            drawerPosition="right"
            screenOptions={({navigation}) => {
                setNavigationFilterrHome(navigation);
            }}
        >
            <Drawer.Screen
                name="Filter"
                options={{drawerLabel: "Filter"}}
                component={requeststack}
            />
        </Drawer.Navigator>
    );
}
//Add this code to filter drawer

// function FilterStack() {
//     return (
//         <Drawer.Navigator
//             // drawerContentOptions={{
//             //     activeTintColor: "#e91e63",
//             //     itemStyle: {marginVertical: 5},
//             // }}
//             drawerContent={props => <FilterComponent {...props} />}
//             drawerPosition="right"
//             screenOptions={({navigation, route}) => {
//                 setNavigationFilterrHome(navigation);
//             }}
//         >
//             <Drawer.Screen
//                 name="Filter"
//                 options={{drawerLabel: "Filter"}}
//                 component={DrawerStack}
//             />
//         </Drawer.Navigator>
//     );
// }

function App() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="splash">
                <Stack.Screen
                    name="splash"
                    component={SplashScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="stationLoginScreen"
                    component={StationLoginScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="officerLogin"
                    component={OfficerLoginScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="home"
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="feedbackList"
                    component={FeedbackFilterStack}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="requestList"
                    component={RequestFilterStack}
                    options={{
                        headerShown: false,
                    }}
                />
                {/* <Stack.Screen
                    name="requestList"
                    component={RequesetListScreen}
                    options={{
                        headerShown: false,
                    }}
                /> */}
                <Stack.Screen
                    name="details"
                    component={DetailsScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="eBbeat"
                    component={EbeatScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="eBbeatDetails"
                    component={EbeatDetailsScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="scan"
                    component={Scan}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="feedback"
                    component={FeedbackScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="request"
                    component={RequestScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="settings"
                    component={SettingsScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="reachme"
                    component={ReachmeScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="requestDetails"
                    component={RequestDetails}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="profile"
                    component={ProfileScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="volunteersView"
                    component={VolunteersViewScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="addRequest"
                    component={AddRequestScreen}
                    options={{
                        headerShown: false,
                    }}
                />

                {/* <Stack.Screen
                    name="feedbackList"
                    component={FeedbackListScreen}
                    options={{
                        headerShown: false,
                    }}
                /> */}
                <Stack.Screen
                    name="feedbackView"
                    component={FeedbackViewScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="imageSlider"
                    component={ImageSlider}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="locations"
                    component={LocationsScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="location"
                    component={LocationScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="locationView"
                    component={LocationViewScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Checkins"
                    component={CheckinsScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="personList"
                    component={PersonListScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="person"
                    component={PersonScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="personDetail"
                    component={PersonDetail}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="subtypeList"
                    component={SubTypeList}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="subtype"
                    component={Subtype}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="departmentofficers"
                    component={DepartmentofficersScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="signUp"
                    component={SignUp}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="signUpSuccess"
                    component={SignUpSuccess}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="officerView"
                    component={OfficerViewScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="LineItemDetails"
                    component={LineItemDetailsScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="welfareRequestdetails"
                    component={WelfareRequestdetailsScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="officerDirectory"
                    component={OfficerDirectoryScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="assignTo"
                    component={AssignTo}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="LineItemHistory"
                    component={LineItemHistoryScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="ReachmeVolunteers"
                    component={ReachmeVolunteersScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="ReachmeVolunteerDetails"
                    component={ReachmeVolunteerDetailsScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="volunteerList"
                    component={VolunteerList}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="peopleDirectory"
                    component={PeopleDirectoryScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="viewPeople"
                    component={ViewPeopleScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="about"
                    component={AboutScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="policeOfficerDirectory"
                    component={PoliceOfficerDirectoryScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="checkinsHistory"
                    component={CheckinsHistoryScreen}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
