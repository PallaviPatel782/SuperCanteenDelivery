import { Image, Text, View, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList } from 'react-native';
import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '../../../components/Header';
import Colors from '../../../utils/Colors/Colors';
import { SH, SW } from '../../../utils/Responsiveness/Dimensions';
import { HistoryStackParamList } from '../../../navigation/AppNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

type Props = NativeStackScreenProps<HistoryStackParamList, 'AllDeliveryRecordData'>;

const AllDeliveryRecordData: React.FC<Props> = ({ route }) => {
    const { order } = route.params;
    const [showOrderModal, setShowOrderModal] = useState(false);
    const totalAmount = order?.orderItems?.reduce(
        (sum: number, item: any) => sum + item.price,
        0
    );
    return (
        <View style={{ flex: 1 }}>
            <Header title={`Order: ${order.id}`} />

            <ScrollView contentContainerStyle={{ padding: SW(10) }}>
                <Image source={require('../../../assets/Images/SucessDelivery.jpeg')} style={styles.image} />
                <View style={styles.infoCard}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Customer Name:</Text>
                        <Text style={styles.value}>{order.name}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Payment Type:</Text>
                        <Text style={[styles.value, order.paymentType === 'COD' ? styles.paymentTypeCOD : styles.paymentTypePrepaid]}>
                            {order.paymentType}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Status:</Text>
                        <Text style={[styles.value, { color: "green", fontFamily: "Inter-Bold" }]}>{order.status}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Delivery Address:</Text>
                        <Text style={styles.value}>{order.drop?.address || order.address}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.orderBox} onPress={() => setShowOrderModal(true)}>
                    <View style={styles.orderHeader}>
                        <Ionicons name="document-text-outline" size={16} color={Colors.black} />
                        <Text style={styles.orderTitle}>Order Details</Text>
                        <View style={{ flex: 1 }} />
                        <Ionicons name="chevron-down-outline" size={14} color={Colors.black} />
                    </View>
                    <Text style={styles.restaurantName}>{order?.name}</Text>
                </TouchableOpacity>
            </ScrollView>
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
                            <Text style={styles.orderId1}>Order ID: {order.id}</Text>
                            <View style={styles.divider} />
                            <View style={{ maxHeight: SH(300) }}>
                                <FlatList
                                    data={order.orderItems}
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
    );
};

export default AllDeliveryRecordData;