import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking, Alert, Platform, Image, TouchableWithoutFeedback, Modal, FlatList, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Header from '../../../components/Header';
import ScreenLayout from '../../../components/ScreenLayout';
import GlobalStyles from '../../../utils/GlobalStyles/GlobalStyles';
import Colors from '../../../utils/Colors/Colors';
import { SF, SH, SW } from '../../../utils/Responsiveness/Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import SwipeButton from 'rn-swipe-button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RootStackParamList } from '../../../navigation/AppNavigator';
type DropOrderRouteProp = RouteProp<RootStackParamList, 'DropOrder'>;

const DropOrder = () => {
  const route = useRoute<DropOrderRouteProp>();
  const { OrderData } = route.params;
  const currencySymbol = 'INR';
  const totalAmount = OrderData?.orderItems?.reduce(
    (sum: number, item: any) => sum + item.price,
    0
  );
  const [showOrderModal, setShowOrderModal] = useState(false);

  const navigation = useNavigation<any>();

  const handleCall = () => {
    if (OrderData?.contact) {
      Linking.openURL(`tel:${OrderData.contact}`);
    } else {
      Alert.alert('No phone number available');
    }
  };

  const handleOpenMap = () => {
    if (OrderData.drop.latitude && OrderData.drop.longitude) {
      const label = OrderData?.name || 'Pickup Location';
      const destinationLat = OrderData?.drop?.latitude ?? 18.6278;
      const destinationLng = OrderData?.drop?.longitude ?? 73.8007;

      const url = Platform.select({
        ios: `maps://app?saddr=${destinationLat},${destinationLng}&daddr=${destinationLat},${destinationLng} (${encodeURIComponent(label)})`,
        android: `google.navigation:q=${destinationLat},${destinationLng} (${encodeURIComponent(label)})`,
      });

      Linking.openURL(url!).catch(() => {
        Alert.alert('Error', 'Unable to open map.');
      });
    } else {
      Alert.alert('Location Error', 'Your current location is not available.');
    }
  };

  return (
    <ScreenLayout>
      <View style={GlobalStyles.container}>
        <Header title="Drop Order" />
        <View style={{ paddingHorizontal: SW(10), paddingVertical: SH(15) }}>
          <TouchableOpacity
            style={styles.rejectBtn}
            onPress={() => navigation.navigate('LiveOrderHelp', { OrderData })}>
            <Text style={styles.rejectText}>Reject</Text>
            <AntDesign name="close" size={SF(12)} color={"red"} style={{ marginLeft: SW(4) }} />
          </TouchableOpacity>
          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>{OrderData?.name}</Text>
            <Text style={styles.address}>{OrderData.drop.address}</Text>
            <Text style={styles.orderId}>Order ID: {OrderData?.id}</Text>
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
              <Ionicons name="document-text-outline" size={16} color={Colors.black} />
              <Text style={styles.orderTitle}>Order Details</Text>
              <View style={{ flex: 1 }} />
              <Ionicons name="chevron-down-outline" size={14} color={Colors.black} />
            </View>
            <Text style={styles.restaurantName}>{OrderData?.name}</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
        </View>
        <View style={{ marginTop: SH(15), flex: 1 }}>
          <SwipeButton
            containerStyles={{
              borderRadius: SW(40),
              overflow: 'hidden',
            }}
            height={SH(45)}
            width={SW(350)}
            title="Reached Drop"
            titleStyles={{
              color: '#fff',
              fontSize: SF(14),
              fontFamily: 'Inter-Medium',
              letterSpacing: 0.5,
            }}
            railBackgroundColor={Colors.dark_green}
            railFillBackgroundColor={Colors.dark_green}
            railBorderColor="transparent"
            railFillBorderColor="transparent"
            thumbIconBackgroundColor="#fff"
            thumbIconBorderColor="transparent"
            thumbIconStyles={{
              width: SW(25),
              height: SH(25),
              borderRadius: SW(25),
              justifyContent: 'center',

              elevation: 4,
            }}
            thumbIconComponent={() => (
              <View style={{ flexDirection: 'row', }}>
                <Ionicons
                  name="chevron-forward"
                  size={SF(14)}
                  color={Colors.dark_green}
                />
                <Ionicons
                  name="chevron-forward"
                  size={SF(14)}
                  color={Colors.dark_green}
                  style={{ marginLeft: -5 }}
                />
              </View>
            )}
            onSwipeSuccess={() => {
              navigation.navigate('CashOnDelivery', { OrderData })
            }}
            shouldResetAfterSuccess={false}
          />
        </View>
        <Image source={require('../../../assets/Images/DropOrder.png')} style={styles.image} />
      </View>
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
    </ScreenLayout>
  );
};

export default DropOrder;
