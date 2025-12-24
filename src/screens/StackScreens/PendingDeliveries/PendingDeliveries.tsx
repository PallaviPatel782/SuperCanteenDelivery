import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { Package, CheckCircle, UserCheck2Icon, MapPin } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';

import ScreenLayout from '../../../components/ScreenLayout';
import Header from '../../../components/Header';
import EmptyState from '../../../components/EmptyState';
import InternetStatus from '../../../components/InternetStatus';

import Colors from '../../../utils/Colors/Colors';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchAssignedOrders } from '../../../redux/slices/assignedOrdersSlice';
import { SH, SW } from '../../../utils/Responsiveness/Dimensions';
import styles from './styles';

type PendingDeliveriesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PendingDeliveries'>;
type Props = { navigation: PendingDeliveriesNavigationProp };

const PAGE_LIMIT = 5;
export const EMPTY_ICONS = { ORDERS: 'cart-outline' };

const PendingDeliveries: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.assignedOrders.loading);

    const [allOrders, setAllOrders] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);

    const hasFetchedOnce = React.useRef(false);

    const fetchOrders = async () => {
        try {
            const assigned = await dispatch(fetchAssignedOrders({ status: 'Assigned' })).unwrap();
            const reachedDrop = await dispatch(fetchAssignedOrders({ status: 'ReachedDrop' })).unwrap();

            const merged = [...assigned.orders, ...reachedDrop.orders];

            const filtered = merged.filter(order =>
                order.isCOD &&
                !['Delivered', 'Cancelled'].includes(order.status) &&
                ['Assigned', 'ReachedDrop'].includes(order.deliveryStatus)
            );

            setAllOrders(filtered);
            setPage(1);
        } catch (err) {
            console.log('Error:', err);
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (!hasFetchedOnce.current) {
                fetchOrders();
                hasFetchedOnce.current = true;
            }
        }, [])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchOrders();
        setRefreshing(false);
    };

    const loadMore = () => {
        if (page * PAGE_LIMIT < allOrders.length) {
            setPage(prev => prev + 1);
        }
    };

    const paginatedOrders = allOrders.slice(0, page * PAGE_LIMIT);

    const renderOrderCard = ({ item }: any) => {
        const handlePress = () => {
            if (item.deliveryStatus === 'ReachedDrop') {
                navigation.navigate('CashOnDelivery', { OrderData: item });
            } else {
                navigation.navigate('DropOrder', { OrderData: item });
            }
        };

        return (
            <TouchableOpacity style={styles.cardWrapper} onPress={handlePress} activeOpacity={0.8}>
                <View style={[styles.ribbon, { backgroundColor: '#faf1d1ff' }]}>
                    <CheckCircle size={12} color="#FACC15" style={{ marginRight: 5 }} />
                    <Text style={[styles.ribbonText, { color: '#FACC15' }]}>{item.deliveryStatus}</Text>
                </View>
                <View style={styles.historyCard}>
                    <View style={styles.rowBetween}>
                        <View style={styles.row}>
                            <Package size={14} color={Colors.primary} style={{ marginRight: SW(6) }} />
                            <Text style={styles.orderId}>{item.orderId}</Text>
                        </View>
                        <View style={[styles.paymentBadge, { backgroundColor: item.isCOD ? '#FFF2F0' : '#E6F7FF' }]}>
                            <Text style={[styles.paymentText, { color: item.isCOD ? '#D9480F' : '#096DD9' }]}>{item.isCOD ? 'COD' : 'Prepaid'}</Text>
                        </View>
                    </View>
                    <View style={[styles.row, { marginTop: SH(6) }]}>
                        <UserCheck2Icon size={12} color={Colors.primary} style={{ marginRight: SW(6) }} />
                        <Text style={styles.customerName}>{item.shippingAddress.name}</Text>
                    </View>
                    <View style={[styles.row, { marginTop: SH(6) }]}>
                        <MapPin size={12} color={Colors.primary} style={{ marginRight: SW(6) }} />
                        <Text style={styles.address} numberOfLines={1}>{item.shippingAddress.address}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        );
    };

    if (loading && !refreshing) {
        return (
            <ScreenLayout>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                    <Text style={{ marginTop: 10, color: Colors.primary }}>Loading Pending Deliveries...</Text>
                </View>
            </ScreenLayout>
        );
    }

    return (
        <ScreenLayout>
            <InternetStatus onReconnect={() => fetchOrders()} />
            <Header showBack={true} title="Pending Deliveries" />
            <FlatList
                data={paginatedOrders}
                renderItem={renderOrderCard}
                keyExtractor={(item) => item._id}
                onEndReached={loadMore}
                onEndReachedThreshold={0.8}
                ListFooterComponent={
                    page * PAGE_LIMIT < allOrders.length ? (
                        <TouchableOpacity
                            style={styles.loadMoreBtn}
                            onPress={loadMore}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.loadMoreText}>Load More</Text>
                        </TouchableOpacity>
                    ) : null
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={Colors.primary}
                    />
                }
                ListEmptyComponent={
                    !loading ? (
                        <EmptyState
                            message="No orders are currently assigned to you."
                            icon={EMPTY_ICONS.ORDERS}
                        />
                    ) : null
                }
                contentContainerStyle={{ padding: SW(10), paddingBottom: SH(20) }}
            />


        </ScreenLayout>
    );
};

export default PendingDeliveries;
