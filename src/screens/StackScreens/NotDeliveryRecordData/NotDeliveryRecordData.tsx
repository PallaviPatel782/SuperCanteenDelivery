import { Image, Text, View, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList, Linking } from 'react-native';
import React, { useState } from 'react';
import Header from '../../../components/Header';
import Colors from '../../../utils/Colors/Colors';
import { SH, SW, SF } from '../../../utils/Responsiveness/Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { OrderType } from '../../../navigation/AppNavigator';
import { BASE_URL } from '../../../utils/apis/BASE_URL';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

type Props = {
    navigation: HomeScreenNavigationProp;
    route: any;
};

const NotDeliveryRecordData: React.FC<Props> = ({ route }) => {
    const { order } = route.params;
    const invoiceUrl = order?.invoiceProforma
        ? `${BASE_URL}${order.invoiceProforma}`
        : null;


    const [showOrderModal, setShowOrderModal] = useState(false);

    const getProductVariantText = (item: OrderType['orderItems'][0]) => {
        switch (item.productType) {
            case 'Single':
                return '';
            case 'WeightPack':
                return ` (${item.weightPack?.size})`;
            case 'ColorSize':
                return ` (${item.colorSize?.color?.name}, Size: ${item.colorSize?.size})`;
            default:
                return '';
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <Header title={`Order: ${order.orderId}`} />

            <ScrollView contentContainerStyle={{ padding: SW(10) }}>
                <Image source={require('../../../assets/Images/NotDelivered.jpeg')} style={styles.image} />

                <View style={styles.infoCard}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Customer Name:</Text>
                        <Text style={styles.value}>{order.shippingAddress?.name || order.user.username}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Payment Type:</Text>
                        <Text style={[styles.value, order.isCOD ? styles.paymentTypeCOD : styles.paymentTypePrepaid]}>
                            {order.paymentMethod}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Status:</Text>
                        <Text style={[styles.value, { color: 'green', fontFamily: 'Inter-Bold' }]}>{order.status}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Delivery Address:</Text>
                        <Text style={styles.value}>{order.shippingAddress?.address}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Invoice:</Text>

                        {invoiceUrl ? (
                            <TouchableOpacity onPress={() => Linking.openURL(invoiceUrl)}>
                                <Text
                                    style={[
                                        styles.value,
                                        { color: Colors.primary, textDecorationLine: "underline" },
                                    ]}
                                >
                                    View Invoice
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <Text style={styles.value}>Not Available</Text>
                        )}
                    </View>
                </View>

                <TouchableOpacity style={styles.orderBox} onPress={() => setShowOrderModal(true)}>
                    <View style={styles.orderHeader}>
                        <Ionicons name="document-text-outline" size={16} color={Colors.black} />
                        <Text style={styles.orderTitle}>Order Details</Text>
                        <View style={{ flex: 1 }} />
                        <Ionicons name="chevron-down-outline" size={14} color={Colors.black} />
                    </View>
                    <Text style={styles.restaurantName}>{order.shippingAddress?.name || order.user.username}</Text>
                </TouchableOpacity>
            </ScrollView>

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
                            <Text style={styles.orderId1}>Order ID: {order.orderId}</Text>
                            <View style={styles.divider} />

                            <FlatList
                                data={order.orderItems}
                                keyExtractor={(item) => item._id}
                                nestedScrollEnabled
                                style={{ maxHeight: SH(220) }}
                                renderItem={({ item }) => (
                                    <View style={styles.itemRow}>
                                        <Image
                                            source={{
                                                uri: `${BASE_URL}${item.images[0].startsWith('/') ? item.images[0] : '/' + item.images[0]}`,
                                            }}
                                            style={{ width: SW(40), height: SH(40), borderRadius: SW(4), marginRight: SW(8) }}
                                        />
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.itemName}>
                                                {item.name}
                                                {getProductVariantText(item)}
                                            </Text>
                                            <Text style={[styles.itemName, { fontSize: SF(12), color: '#555' }]}>
                                                Qty: {item.qty} × Price: {item.price.toFixed(2)} INR
                                            </Text>
                                            <Text style={[styles.itemName, { fontSize: SF(12), color: '#555', fontWeight: 'bold' }]}>
                                                Subtotal: {(item.qty * item.price).toFixed(2)} INR
                                            </Text>
                                        </View>
                                        <Text style={styles.itemPrice}>{(item.qty * item.price).toFixed(2)} INR</Text>
                                    </View>
                                )}
                            />

                            <View style={styles.divider} />
                            <View style={styles.totalRow}>
                                <Text style={styles.totalText}>Items Total</Text>
                                <Text style={styles.totalAmount}>{order.itemsPrice.toFixed(2)} INR</Text>
                            </View>
                            <View style={styles.totalRow}>
                                <Text style={styles.totalText}>Shipping</Text>
                                <Text style={styles.totalAmount}>{order.shippingPrice.toFixed(2)} INR</Text>
                            </View>
                            <View style={styles.totalRow}>
                                <Text style={[styles.totalText]}>Total Bill</Text>
                                <Text style={[styles.totalAmount]}>{order.totalPrice.toFixed(2)} INR</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default NotDeliveryRecordData;