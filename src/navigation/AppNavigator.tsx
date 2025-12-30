import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { RootState } from "../redux/store";
import { navigationRef } from "./NavigationService";
import { SH, SF } from "../utils/Responsiveness/Dimensions";
import Colors from "../utils/Colors/Colors";
import Fonts from "../utils/Fonts/Fonts";

import HomeScreen from "../screens/Tabs/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/Tabs/ProfileScreen/ProfileScreen";
import HistoryScreen from "../screens/Tabs/HistoryScreen/HistoryScreen";

import LoadingScreen from "../screens/StackScreens/Loading/LoadingScreen";
import Login from "../screens/StackScreens/AuthScreens/Login/Login";
import ForgotPassword from "../screens/StackScreens/AuthScreens/ForgotPassword/ForgotPassword";
import OtpVerification from "../screens/StackScreens/AuthScreens/OtpVerification/OtpVerification";

import DropOrder from "../screens/StackScreens/DropOrder/DropOrder";
import CashOnDelivery from "../screens/StackScreens/CashOnDelivery/CashOnDelivery";
import DeliveryComplete from "../screens/StackScreens/DeliveryComplete/DeliveryComplete";
import LiveOrderHelp from "../screens/StackScreens/LiveOrderHelp/LiveOrderHelp";
import PendingDeliveries from "../screens/StackScreens/PendingDeliveries/PendingDeliveries";
import AllDeliveryRecordData from "../screens/StackScreens/AllDeliveryRecordData/AllDeliveryRecordData";
import NotDelivered from "../screens/StackScreens/NotDelivered/NotDelivered";
import NotDeliveryRecordData from "../screens/StackScreens/NotDeliveryRecordData/NotDeliveryRecordData";
import ContactSupport from "../screens/StackScreens/ContactSupport/ContactSupport";
import TotalCodCollected from "../screens/StackScreens/TotalCodCollected/TotalCodCollected";
import CancelledOrders from "../screens/StackScreens/CancelledOrders/CancelledOrders";

export type ShippingAddress = {
    name: string;
    address: string;
    contact?: string;
};

export type OrderType = {
    _id: string;
    orderId: string;
    user: { username: string };
    paymentMethod: string;
    isCOD: boolean;
    status: string;
    itemsPrice: number;
    shippingPrice: number;
    totalPrice: number;
    deliveredAt: Date;
    shippingAddress?: ShippingAddress;
    orderItems: OrderItemType[];
    deliveryFailedReason: string;
    deliveryStatus: string;
    createdAt?: string;
    updatedAt?: string;
};

export type OrderItemType = {
    _id: string;
    name: string;
    qty: number;
    price: number;
    images: string[];
    productType?: "Single" | "WeightPack" | "ColorSize";
    weightPack?: { size: string };
    colorSize?: { color?: { name: string }; size?: string };
};

export type RootStackParamList = {
    Loading: undefined;
    Login: undefined;
    ForgotPassword: undefined;
    OtpVerification: undefined;
    MainTabs: {
        screen?: keyof RootTabParamList;
        params?: RootTabParamList[keyof RootTabParamList];
    };
    DropOrder: { OrderData: OrderType };
    CashOnDelivery: { OrderData: OrderType };
    DeliveryComplete: undefined;
    LiveOrderHelp: { OrderData: OrderType };
    PendingDeliveries: undefined;
    NotDelivered: {
        OrderData: OrderType;
        reason: string;
    };
    CancelledOrders: {
        OrderData: OrderType;
        reason: string;
    }
    NotDeliveryRecordData: { order: OrderType };
    ContactSupport: undefined;
    TotalCodCollected: undefined;
};

export type RootTabParamList = {
    Home: undefined;
    History: {
        screen: keyof HistoryStackParamList;
        params?: HistoryStackParamList[keyof HistoryStackParamList];
    };
    Profile: undefined;
};

export type HistoryStackParamList = {
    HistoryMain: undefined;
    AllDeliveryRecordData: { order: OrderType };
};


const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const HistoryStack = createNativeStackNavigator<HistoryStackParamList>();

const HistoryStackNavigator = () => (
    <HistoryStack.Navigator screenOptions={{ headerShown: false }}>
        <HistoryStack.Screen name="HistoryMain" component={HistoryScreen} />
        <HistoryStack.Screen name="AllDeliveryRecordData" component={AllDeliveryRecordData} />
    </HistoryStack.Navigator>
);

const MainTabs = () => {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: "#3c3c3c",
                tabBarStyle: {
                    height: SH(55) + insets.bottom,
                    backgroundColor: "#fff",
                    elevation: 10,
                },
                tabBarLabelStyle: {
                    fontSize: SF(10),
                    fontFamily: Fonts.Inter_Medium,
                },
                tabBarIcon: ({ focused, color }) => {
                    let iconName = "";

                    if (route.name === "Home")
                        iconName = focused ? "home" : "home-outline";
                    if (route.name === "History") iconName = "history";
                    if (route.name === "Profile")
                        iconName = focused ? "account" : "account-outline";

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

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} />
    </Stack.Navigator>
);

const AppStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="DropOrder" component={DropOrder} />
        <Stack.Screen name="CashOnDelivery" component={CashOnDelivery} />
        <Stack.Screen name="DeliveryComplete" component={DeliveryComplete} />
        <Stack.Screen name="LiveOrderHelp" component={LiveOrderHelp} />
        <Stack.Screen name="PendingDeliveries" component={PendingDeliveries} />
        <Stack.Screen name="NotDelivered" component={NotDelivered} />
        <Stack.Screen name="CancelledOrders" component={CancelledOrders} />
        <Stack.Screen
            name="NotDeliveryRecordData"
            component={NotDeliveryRecordData}
        />
        <Stack.Screen name="ContactSupport" component={ContactSupport} />
        <Stack.Screen name="TotalCodCollected" component={TotalCodCollected} />
    </Stack.Navigator>
);

const RootNavigator = () => {
    const { token, loading } = useSelector((state: RootState) => state.auth);
    console.log("token", token);

    return (
        <NavigationContainer ref={navigationRef}>
            {loading ? (
                <LoadingScreen />
            ) : token ? (
                <AppStack />
            ) : (
                <AuthStack />
            )}
        </NavigationContainer>
    );
};


export default RootNavigator;
