import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SH, SF, SW } from '../utils/Responsiveness/Dimensions';
import Colors from '../utils/Colors/Colors';

import HomeScreen from '../screens/Tabs/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/Tabs/ProfileScreen/ProfileScreen';
import HistoryScreen from '../screens/Tabs/HistoryScreen/HistoryScreen';

import LoadingScreen from '../screens/StackScreens/Loading/LoadingScreen';
import Login from '../screens/StackScreens/AuthScreens/Login/Login';
import OtpVerification from '../screens/StackScreens/AuthScreens/OtpVerification/OtpVerification';
import DropOrder from '../screens/StackScreens/DropOrder/DropOrder';
import CashOnDelivery from '../screens/StackScreens/CashOnDelivery/CashOnDelivery';
import DeliveryComplete from '../screens/StackScreens/DeliveryComplete/DeliveryComplete';
import { OrderItem } from '../DummyData/OrdersData';
import LiveOrderHelp from '../screens/StackScreens/LiveOrderHelp/LiveOrderHelp';

import PendingDeliveries from '../screens/StackScreens/PendingDeliveries/PendingDeliveries';
import AllDeliveryRecordData from '../screens/StackScreens/AllDeliveryRecordData/AllDeliveryRecordData';
import Fonts from '../utils/Fonts/Fonts';
import NotDelivered from '../screens/StackScreens/NotDelivered/NotDelivered';
import ForgotPassword from '../screens/StackScreens/AuthScreens/ForgotPassword/ForgotPassword';
import NotDeliveryRecordData from '../screens/StackScreens/NotDeliveryRecordData/NotDeliveryRecordData';
import ContactSupport from '../screens/StackScreens/ContactSupport/ContactSupport';
import TotalCodCollected from '../screens/StackScreens/TotalCodCollected/TotalCodCollected';

export type RootStackParamList = {
    Loading: undefined;
    Login: undefined;
    ForgotPassword:undefined
    OtpVerification: undefined;
   MainTabs: {
  screen: keyof RootTabParamList;
  params?: any;
} | undefined;
    DropOrder: { OrderData: OrderItem };
    CashOnDelivery: { OrderData: OrderItem };
    DeliveryComplete: undefined;
    LiveOrderHelp: { OrderData: OrderItem };
    PendingDeliveries: undefined;
    NotDelivered: undefined;
    NotDeliveryRecordData:{ order: OrderItem };
    ContactSupport:undefined;
    TotalCodCollected:undefined;
};

export type HistoryStackParamList = {
    HistoryMain: undefined;
    CompletedDeliveries: undefined;
    AllDeliveryRecordData: { order: OrderItem };
};

export type RootTabParamList = {
    Home: undefined;
    History: undefined;
    Profile: undefined;
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

                    return (
                        <View style={{ alignItems: 'center' }}>
                            {focused && (
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: -5,
                                        width: SW(50),
                                        height: SH(4),
                                        borderBottomLeftRadius: 10,
                                        borderBottomRightRadius: 10,
                                        backgroundColor: Colors.primary,
                                    }}
                                />
                            )}
                            <Icon name={iconName} size={22} color={color} style={{ marginTop: SH(5) }} />
                        </View>
                    );
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
        <NavigationContainer>
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

const styles = StyleSheet.create({});
