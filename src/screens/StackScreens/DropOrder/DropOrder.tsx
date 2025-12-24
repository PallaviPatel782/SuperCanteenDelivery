import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking, Alert, Image, Modal, FlatList, TouchableWithoutFeedback, ScrollView, Platform } from 'react-native';
import Header from '../../../components/Header';
import ScreenLayout from '../../../components/ScreenLayout';
import Colors from '../../../utils/Colors/Colors';
import { SF, SH, SW } from '../../../utils/Responsiveness/Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import SwipeButton from 'rn-swipe-button';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { BASE_URL } from '../../../utils/apis/BASE_URL';
import { useDispatch } from "react-redux";
import { reachedDropOrder } from "../../../redux/slices/assignedOrdersSlice";
import { showMessage } from "react-native-flash-message";

type DropOrderRouteProp = RouteProp<RootStackParamList, 'DropOrder'>;

const DropOrder: React.FC = () => {
  const dispatch = useDispatch<any>();
  const route = useRoute<DropOrderRouteProp>();
  const { OrderData } = route.params as any;
  console.log("OrderData", OrderData);

  const [showOrderModal, setShowOrderModal] = useState(false);
  const navigation = useNavigation<any>();

  const handleCall = () => {
    const contactNo = OrderData.shippingAddress.contactNo;
    if (contactNo) {
      Linking.openURL(`tel:${contactNo}`);
    } else {
      Alert.alert('No phone number available');
    }
  };

  const handleReachedDrop = async () => {
    const orderId = OrderData._id;

    const result = await dispatch(reachedDropOrder(orderId));

    if (reachedDropOrder.fulfilled.match(result)) {
      showMessage({
        message: result.payload.message,
        type: "success",
        icon: "success",
      });

      navigation.navigate("CashOnDelivery", { OrderData: OrderData });

    } else {
      showMessage({
        message: result.payload || "Failed to reach drop",
        type: "danger",
        icon: "danger",
      });
    }
  };

  const handleOpenMap = () => {
    const { currentLocation, address } = OrderData.shippingAddress;

    if (currentLocation?.lat && currentLocation?.lng) {
      const lat = currentLocation.lat;
      const lng = currentLocation.lng;

      const url = Platform.select({
        ios: `http://maps.apple.com/?ll=${lat},${lng}`,
        android: `geo:${lat},${lng}?q=${lat},${lng}`,
        default: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
      });

      Linking.openURL(url!).catch(() => {
        Alert.alert("Error", "Unable to open map.");
      });
    }
    if (address) {
      const encodedAddress = encodeURIComponent(address);
      const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

      Linking.openURL(url).catch(() => {
        Alert.alert("Error", "Unable to open map.");
      });
    }
    else {
      Alert.alert("Location not available");
    }
  };


  const getProductVariantText = (item: any) => {
    switch (item.productType) {
      case "Single":
        return "";

      case "WeightPack":
        return ` (${item.weightPack?.size})`;

      case "ColorSize":
        return ` (${item.colorSize?.color?.name}, Size: ${item.colorSize?.size})`;

      default:
        return "";
    }
  };


  return (
    <ScreenLayout>
      <Header title="Drop Order" showBack />
      <View style={{ flex: 1, paddingHorizontal: SW(10), paddingTop: SH(15) }}>
        {/* <TouchableOpacity
          style={styles.rejectBtn}
          onPress={() => navigation.navigate('LiveOrderHelp', { OrderData })}
        >
          <Text style={styles.rejectText}>Reject</Text>
          <AntDesign name="close" size={SF(12)} color="red" style={{ marginLeft: SW(4) }} />
        </TouchableOpacity> */}
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{OrderData.shippingAddress.name}</Text>
          <Text style={styles.address}>{OrderData.shippingAddress.address}</Text>
          <Text style={styles.address}>
            {`${OrderData.shippingAddress.city}, ${OrderData.shippingAddress.state} - ${OrderData.shippingAddress.postalCode}, ${OrderData.shippingAddress.country} (${OrderData.shippingAddress.addressType})`}
          </Text>

          {OrderData?.rescheduled === true && OrderData?.rescheduledAt && (
            <Text style={styles.reassignedText}>
              Rescheduled by admin on{' '}
              {new Date(OrderData.rescheduledAt).toLocaleString('en-IN', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          )}

          <Text style={styles.orderId}>Order ID: {OrderData.orderId}</Text>
        </View>
        <View style={styles.callMapRow}>
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <Ionicons name="call-outline" size={SF(14)} color={Colors.primary} />
            <Text style={styles.callButtonText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.mapButton} onPress={handleOpenMap}>
            <Ionicons name="navigate-outline" size={SF(14)} color={Colors.White} />
            <Text style={styles.mapButtonText}>Map</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.orderBox} onPress={() => setShowOrderModal(true)}>
          <View style={styles.orderHeader}>
            <Ionicons name="document-text-outline" size={16} color="black" />
            <Text style={styles.orderTitle}>Order Details</Text>
            <View style={{ flex: 1 }} />
            <Ionicons name="chevron-down-outline" size={14} color="black" />
          </View>
          <Text style={styles.restaurantName}>{OrderData.shippingAddress.name}</Text>

        </TouchableOpacity>
        <View style={{ marginTop: SH(15), flex: 1 }}>
          <SwipeButton
            containerStyles={{ borderRadius: SW(40), overflow: 'hidden' }}
            height={SH(45)}
            width={SW(350)}
            title="Reached Drop"
            titleStyles={{ color: '#fff', fontSize: SF(14), fontFamily: 'Inter-Medium', letterSpacing: 0.5 }}
            railBackgroundColor={Colors.dark_green}
            railFillBackgroundColor={Colors.dark_green}
            railBorderColor="transparent"
            railFillBorderColor="transparent"
            thumbIconBackgroundColor="#fff"
            thumbIconBorderColor="transparent"
            thumbIconStyles={{ width: SW(25), height: SH(25), borderRadius: SW(25), justifyContent: 'center', elevation: 4 }}
            thumbIconComponent={() => (
              <View style={{ flexDirection: 'row' }}>
                <Ionicons name="chevron-forward" size={SF(14)} color={Colors.dark_green} />
                <Ionicons name="chevron-forward" size={SF(14)} color={Colors.dark_green} style={{ marginLeft: -5 }} />
              </View>
            )}
            onSwipeSuccess={handleReachedDrop}
            shouldResetAfterSuccess={false}
          />
        </View>

        <Image source={require('../../../assets/Images/DropOrder.png')} style={styles.image} />
        <Modal visible={showOrderModal} animationType="slide" transparent onRequestClose={() => setShowOrderModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => setShowOrderModal(false)}>
              <View style={styles.overlayTouchable} />
            </TouchableWithoutFeedback>
            <View style={styles.bottomSheet}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Order Details</Text>
                <TouchableOpacity onPress={() => setShowOrderModal(false)}>
                  <Ionicons name="close-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>

              <View style={styles.orderCard}>
                <Ionicons name="document-text-outline" size={28} color={Colors.dark_green} style={styles.orderIcon} />
                <Text style={styles.orderId1}>Order ID: {OrderData.orderId}</Text>
                <View style={styles.divider} />

                <FlatList
                  data={OrderData.orderItems}
                  keyExtractor={(item) => item._id}
                  nestedScrollEnabled
                  style={{ maxHeight: SH(220) }}
                  renderItem={({ item }) => (
                    <View style={styles.itemRow}>
                      <Image
                        source={{
                          uri: `${BASE_URL}${item.images[0].startsWith('/')
                            ? item.images[0]
                            : '/' + item.images[0]
                            }`
                        }}
                        style={{
                          width: SW(40),
                          height: SH(40),
                          borderRadius: SW(4),
                          marginRight: SW(8)
                        }}
                      />

                      <View style={{ flex: 1 }}>
                        <Text style={styles.itemName}>
                          {item.name}
                          {getProductVariantText(item)}
                        </Text>

                        <Text style={[styles.itemName, { fontSize: SF(12), color: '#555' }]}>
                          Qty: {item.qty} × Price: {item.price.toFixed(2)} INR
                        </Text>

                        <Text
                          style={[
                            styles.itemName,
                            { fontSize: SF(12), color: '#555', fontWeight: 'bold' }
                          ]}
                        >
                          Subtotal: {(item.qty * item.price).toFixed(2)} INR
                        </Text>
                      </View>

                      <Text style={styles.itemPrice}>
                        {(item.qty * item.price).toFixed(2)} INR
                      </Text>
                    </View>
                  )}

                />

                <View style={styles.divider} />
                <View style={styles.totalRow}>
                  <Text style={styles.totalText}>Items Total</Text>
                  <Text style={styles.totalAmount}>{OrderData.itemsPrice.toFixed(2)} INR</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.totalText}>Shipping</Text>
                  <Text style={styles.totalAmount}>{OrderData.shippingPrice.toFixed(2)} INR</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={[styles.totalText]}>Total Bill</Text>
                  <Text style={[styles.totalAmount]}>{OrderData.totalPrice.toFixed(2)} INR</Text>
                </View>

              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScreenLayout>
  );
};

export default DropOrder;
