import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SH, SF} from '../utils/Responsiveness/Dimensions';
import Colors from '../utils/Colors/Colors';
import Fonts from '../utils/Fonts/Fonts';

import HomeScreen from '../screens/Tabs/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/Tabs/ProfileScreen/ProfileScreen';
import HistoryScreen from '../screens/Tabs/HistoryScreen/HistoryScreen';
import LoadingScreen from '../screens/StackScreens/Loading/LoadingScreen';
import Login from '../screens/StackScreens/AuthScreens/Login/Login';
import ForgotPassword from '../screens/StackScreens/AuthScreens/ForgotPassword/ForgotPassword';
import OtpVerification from '../screens/StackScreens/AuthScreens/OtpVerification/OtpVerification';
import DropOrder from '../screens/StackScreens/DropOrder/DropOrder';
import CashOnDelivery from '../screens/StackScreens/CashOnDelivery/CashOnDelivery';
import DeliveryComplete from '../screens/StackScreens/DeliveryComplete/DeliveryComplete';
import LiveOrderHelp from '../screens/StackScreens/LiveOrderHelp/LiveOrderHelp';
import PendingDeliveries from '../screens/StackScreens/PendingDeliveries/PendingDeliveries';
import AllDeliveryRecordData from '../screens/StackScreens/AllDeliveryRecordData/AllDeliveryRecordData';
import NotDelivered from '../screens/StackScreens/NotDelivered/NotDelivered';
import NotDeliveryRecordData from '../screens/StackScreens/NotDeliveryRecordData/NotDeliveryRecordData';
import ContactSupport from '../screens/StackScreens/ContactSupport/ContactSupport';
import TotalCodCollected from '../screens/StackScreens/TotalCodCollected/TotalCodCollected';
import { navigationRef } from './NavigationService';
import { OrderItem } from '../DummyData/OrdersData';

export type RootStackParamList = {
    Loading: undefined;
    Login: undefined;
    ForgotPassword: undefined;
    OtpVerification: undefined;
    MainTabs: {
        screen: keyof RootTabParamList;
        params?: any;
    };
    DropOrder: { OrderData: OrderItem };
    CashOnDelivery: { OrderData: OrderItem };
    DeliveryComplete: undefined;
    LiveOrderHelp: { OrderData: OrderItem };
    PendingDeliveries: undefined;
    NotDelivered: undefined;
    NotDeliveryRecordData: { order: OrderItem };
    ContactSupport: undefined;
    TotalCodCollected: undefined;
};

export type RootTabParamList = {
    Home: undefined;
    History: undefined;
    Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const HistoryStack = createNativeStackNavigator();
const HistoryStackNavigator = () => (
    <HistoryStack.Navigator screenOptions={{ headerShown: false }}>
        <HistoryStack.Screen name="HistoryMain" component={HistoryScreen} />
        <HistoryStack.Screen name="AllDeliveryRecordData" component={AllDeliveryRecordData} />
    </HistoryStack.Navigator>
);

const MainTabs: React.FC = () => {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: '#3c3c3c',
                tabBarStyle: {
                    height: SH(55) + insets.bottom,
                    backgroundColor: '#fff',
                    borderTopWidth: 0,
                    elevation: 10,
                },
                tabBarLabelStyle: {
                    fontSize: SF(10),
                    fontFamily: Fonts.Inter_Medium,
                },
                tabBarIcon: ({ focused, color }) => {
                    let iconName = '';
                    if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
                    else if (route.name === 'History') iconName = focused ? 'history' : 'history';
                    else if (route.name === 'Profile') iconName = focused ? 'account' : 'account-outline';

                    return <Icon name={iconName} size={22} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="History" component={HistoryStackNavigator} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

const RootNavigator: React.FC = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Loading">
                <Stack.Screen name="Loading" component={LoadingScreen} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="OtpVerification" component={OtpVerification} />
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen name="DropOrder" component={DropOrder} />
                <Stack.Screen name="CashOnDelivery" component={CashOnDelivery} />
                <Stack.Screen name="DeliveryComplete" component={DeliveryComplete} />
                <Stack.Screen name="LiveOrderHelp" component={LiveOrderHelp} />
                <Stack.Screen name="PendingDeliveries" component={PendingDeliveries} />
                <Stack.Screen name="NotDelivered" component={NotDelivered} />
                <Stack.Screen name="NotDeliveryRecordData" component={NotDeliveryRecordData} />
                <Stack.Screen name="ContactSupport" component={ContactSupport} />
                <Stack.Screen name="TotalCodCollected" component={TotalCodCollected} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default RootNavigator;