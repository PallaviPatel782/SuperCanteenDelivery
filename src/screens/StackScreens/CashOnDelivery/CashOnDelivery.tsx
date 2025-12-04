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
  ScrollView,
} from 'react-native';
import Header from '../../../components/Header';
import ScreenLayout from '../../../components/ScreenLayout';
import GlobalStyles from '../../../utils/GlobalStyles/GlobalStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../../utils/Colors/Colors';
import styles from './styles';
import { SH, SW, SF } from '../../../utils/Responsiveness/Dimensions';
import SwipeButton from 'rn-swipe-button';

const CashOnDelivery = ({ route, navigation }: any) => {
  const { OrderData } = route.params || {};
  const amount = OrderData?.amount || 970;
  const currencySymbol = 'INR';

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const totalAmount = OrderData?.orderItems?.reduce(
    (sum: number, item: any) => sum + item.price,
    0
  );

  const handleCall = () => {
    if (OrderData?.contact) {
      Linking.openURL(`tel:${OrderData.contact}`);
    } else {
      Alert.alert('No phone number available');
    }
  };

  const handleOtpVerify = () => {
    setShowOtpModal(false);
    navigation.navigate('DeliveryComplete', { OrderData });
  };

  return (
    <ScreenLayout>
      <View style={GlobalStyles.container}>
        <Header title="Deliver" />
        <View style={{ paddingHorizontal: SW(10), paddingVertical: SW(15) }}>
          <View style={styles.paymentRow}>
            <Ionicons name="checkmark-circle-outline" size={30} color={Colors.dark_green} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.paymentTitle}>
                Collect Cash {amount} {currencySymbol}
              </Text>
              <Text style={styles.paymentOrderId}>Order Id: {OrderData?.id}</Text>
            </View>
          </View>

          <View style={styles.divider} />
          <View style={styles.customerRow}>
            <Ionicons name="person-circle-outline" size={26} color={'#BFBFBF'} />
            <Text style={styles.customerName}>{OrderData?.name}</Text>

            <View style={{ flex: 1 }} />
            <TouchableOpacity style={styles.callIconCircle} onPress={handleCall}>
              <Ionicons name="call-outline" size={16} color={'#0788E4'} />
            </TouchableOpacity>
          </View>

          <Text style={styles.customerAddress}>{OrderData?.drop?.address}</Text>
          <Text style={styles.customerOrderId}>Order Id: {OrderData?.id}</Text>
          <TouchableOpacity style={styles.orderBox} onPress={() => setShowOrderModal(true)}>
            <View style={styles.orderHeader}>
              <Ionicons name="document-text-outline" size={16} color={Colors.black} />
              <Text style={styles.orderTitle}>Order Details</Text>
              <View style={{ flex: 1 }} />
              <Ionicons name="chevron-down-outline" size={14} color={Colors.black} />
            </View>
            <Text style={styles.restaurantName}>{OrderData?.name}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', marginTop: SH(15), flex: 1 }}>
          <SwipeButton
            containerStyles={{ borderRadius: SW(40), overflow: 'hidden' }}
            height={SH(45)}
            width={SW(350)}
            title="Order Delivered"
            titleStyles={{
              color: '#fff',
              fontSize: SF(14),
              fontFamily: 'Inter-Medium',
            }}
            railBackgroundColor={Colors.dark_green}
            railFillBackgroundColor={Colors.dark_green}
            railBorderColor="transparent"
            thumbIconBackgroundColor="#fff"
            thumbIconBorderColor="transparent"
            thumbIconComponent={() => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="chevron-forward" size={14} color={Colors.dark_green} />
                <Ionicons
                  name="chevron-forward"
                  size={14}
                  color={Colors.dark_green}
                  style={{ marginLeft: -5 }}
                />
              </View>
            )}
            onSwipeSuccess={() => setShowOtpModal(true)}
            shouldResetAfterSuccess={true}
          />
        </View>
        <Image source={require('../../../assets/Images/CashOnDelivery.png')} style={styles.image} />
        <Modal visible={showOtpModal} transparent animationType="fade">
          <View style={styles.otpOverlay}>
            <View style={styles.otpCard}>
              <Ionicons name="shield-checkmark-outline" size={50} color={Colors.dark_green} />

              <Text style={styles.otpTitle}>Enter Delivery OTP</Text>
              <Text style={styles.otpSubtitle}>Customer will share a 4-digit OTP</Text>

              <TextInput
                value={otp}
                onChangeText={(t) => {
                  setOtp(t);
                  setError('');
                }}
                keyboardType="number-pad"
                maxLength={4}
                placeholder="Enter OTP"
                style={styles.otpInput}
              />

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <TouchableOpacity style={styles.verifyBtn} onPress={handleOtpVerify}>
                <Text style={styles.verifyBtnText}>Verify & Complete Delivery</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setShowOtpModal(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
          <Modal
                visible={showOrderModal}
                animationType="slide"
                transparent
                onRequestClose={() => setShowOrderModal(false)}
            >
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
                            <Ionicons
                                name="document-text-outline"
                                size={28}
                                color={Colors.dark_green}
                                style={styles.orderIcon}
                            />
                            <Text style={styles.orderId1}>Order ID: {OrderData.id}</Text>
                            <View style={styles.divider} />
                            <View style={{ maxHeight: SH(300) }}>
                                <FlatList
                                    data={OrderData.orderItems}
                                    keyExtractor={(item, index) => index.toString()}
                                    nestedScrollEnabled
                                    showsVerticalScrollIndicator={true}
                                    renderItem={({ item }) => (
                                        <View style={styles.itemRow}>
                                            <Text style={styles.itemName}>
                                                {item.quantity > 1
                                                    ? `${item.quantity} × ${item.itemName}`
                                                    : item.itemName}
                                            </Text>
                                            <Text style={styles.itemPrice}>{item.price.toFixed(2)} INR</Text>
                                        </View>
                                    )}
                                />
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.totalRow}>
                                <Text style={styles.totalText}>Total Bill</Text>
                                <Text style={styles.totalAmount}>{totalAmount.toFixed(2)} INR</Text>
                            </View>

                        </View>
                    </View>

                </View>
            </Modal>
      </View>
    </ScreenLayout>
  );
};

export default CashOnDelivery;
