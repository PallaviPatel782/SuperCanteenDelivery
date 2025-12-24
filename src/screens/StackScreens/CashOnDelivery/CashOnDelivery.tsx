import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  Linking,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Header from '../../../components/Header';
import ScreenLayout from '../../../components/ScreenLayout';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../../utils/Colors/Colors';
import styles from './styles';
import { SH, SW, SF } from '../../../utils/Responsiveness/Dimensions';
import SwipeButton from 'rn-swipe-button';
import { BASE_URL } from '../../../utils/apis/BASE_URL';
import { completeDeliveryOrder } from '../../../redux/slices/assignedOrdersSlice';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CashOnDelivery = ({ route, navigation }: any) => {
  const dispatch = useDispatch<any>();
  const { OrderData } = route.params || {};
  console.log("OrderData", OrderData);

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleCall = () => {
    const contactNo = OrderData?.shippingAddress?.contactNo;
    if (contactNo) {
      Linking.openURL(`tel:${contactNo}`);
    } else {
      Alert.alert('No phone number available');
    }
  };

  const handleOtpVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter valid 6-digit OTP");
      return;
    }

    setLoading(true);

    const result = await dispatch(
      completeDeliveryOrder({
        orderId: OrderData._id,
        otp,
      })
    );

    setLoading(false);

    if (completeDeliveryOrder.fulfilled.match(result)) {
      showMessage({
        message: result.payload.message,
        type: "success",
        icon: "success",
        position: "top",
        floating: true,
        style:{marginTop:SH(50)}
      });

      setShowOtpModal(false);
      navigation.navigate("DeliveryComplete");
    } else {
      showMessage({
        message: result.payload || "Failed to complete delivery",
        type: "danger",
        icon: "danger",
        position: "top",
        floating: true,
      });
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

  {
    loading && (
      <View style={styles.loaderOverlay}>
        <ActivityIndicator size="large" color={Colors.White} />
      </View>
    )
  }

  return (
    <ScreenLayout>
      <Header title="Cash On Delivery" showBack />
      <View style={{ flex: 1, paddingHorizontal: SW(10), paddingTop: SH(15) }}>
        <TouchableOpacity
          style={styles.rejectBtn}
          onPress={() => navigation.navigate('LiveOrderHelp', { OrderData })}
        >
          <Text style={styles.rejectText}>Reject</Text>
          <AntDesign name="close" size={SF(12)} color="red" style={{ marginLeft: SW(4) }} />
        </TouchableOpacity>

        <View style={styles.paymentRow}>
          <Ionicons name="checkmark-circle-outline" size={30} color={Colors.dark_green} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.paymentTitle}>
              Collect Cash {OrderData.totalPrice.toFixed(2)} INR
            </Text>
            <Text style={styles.paymentOrderId}>Order ID: {OrderData.orderId}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.customerRow}>
          <Ionicons name="person-circle-outline" size={26} color={'#BFBFBF'} />
          <Text style={styles.customerName}>{OrderData.shippingAddress.name}</Text>
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.callIconCircle} onPress={handleCall}>
            <Ionicons name="call-outline" size={16} color={'#0788E4'} />
          </TouchableOpacity>
        </View>

        <Text style={styles.customerAddress}>{OrderData.shippingAddress.address}</Text>
        <Text style={styles.customerAddress}>
          {`${OrderData.shippingAddress.city}, ${OrderData.shippingAddress.state} - ${OrderData.shippingAddress.postalCode}, ${OrderData.shippingAddress.country} (${OrderData.shippingAddress.addressType})`}
        </Text>

        <TouchableOpacity style={styles.orderBox} onPress={() => setShowOrderModal(true)}>
          <View style={styles.orderHeader}>
            <Ionicons name="document-text-outline" size={16} color={Colors.black} />
            <Text style={styles.orderTitle}>Order Details</Text>
            <View style={{ flex: 1 }} />
            <Ionicons name="chevron-down-outline" size={14} color={Colors.black} />
          </View>
          <Text style={styles.restaurantName}>{OrderData.shippingAddress.name}</Text>
        </TouchableOpacity>

        <View style={{ alignItems: 'center', marginTop: SH(15), flex: 1 }}>
          <SwipeButton
            containerStyles={{ borderRadius: SW(40), overflow: 'hidden' }}
            height={SH(45)}
            width={SW(350)}
            title="Order Delivered"
            titleStyles={{ color: '#fff', fontSize: SF(14), fontFamily: 'Inter-Medium' }}
            railBackgroundColor={Colors.dark_green}
            railFillBackgroundColor={Colors.dark_green}
            railBorderColor="transparent"
            thumbIconBackgroundColor="#fff"
            thumbIconBorderColor="transparent"
            thumbIconComponent={() => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="chevron-forward" size={14} color={Colors.dark_green} />
                <Ionicons name="chevron-forward" size={14} color={Colors.dark_green} style={{ marginLeft: -5 }} />
              </View>
            )}
            onSwipeSuccess={() => setShowOtpModal(true)}
            shouldResetAfterSuccess={true}
          />
        </View>

        <Modal visible={showOrderModal} animationType="slide" transparent onRequestClose={() => setShowOrderModal(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => setShowOrderModal(false)}>
              <View style={styles.overlayTouchable} />
            </TouchableWithoutFeedback>
            <View style={styles.bottomSheet}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Order Details</Text>
                <TouchableOpacity onPress={() => setShowOrderModal(false)}>
                  <Ionicons name="close-outline" size={24} color={Colors.black} />
                </TouchableOpacity>
              </View>

              <View style={styles.orderCard}>
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
                  <Text style={styles.totalText}>Total Bill</Text>
                  <Text style={styles.totalAmount}>{OrderData.totalPrice.toFixed(2)} INR</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <Modal visible={showOtpModal} transparent animationType="fade">
          <View style={styles.otpOverlay}>
            <View style={styles.otpCard}>
              <Ionicons name="shield-checkmark-outline" size={50} color={Colors.dark_green} />
              <Text style={styles.otpTitle}>Enter Delivery OTP</Text>
              <Text style={styles.otpSubtitle}>Customer will share a 6-digit OTP</Text>

              <TextInput
                value={otp}
                onChangeText={(t) => {
                  setOtp(t);
                  setError('');
                }}
                keyboardType="number-pad"
                maxLength={6}
                placeholder="Enter OTP"
                style={styles.otpInput}
              />
              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <TouchableOpacity
                style={[
                  styles.verifyBtn,
                  loading && { opacity: 0.7 }
                ]}
                onPress={handleOtpVerify}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.verifyBtnText}>
                    Verify & Complete Delivery
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setShowOtpModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScreenLayout>
  );
};

export default CashOnDelivery;
