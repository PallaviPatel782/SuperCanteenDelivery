import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import ScreenLayout from '../../../components/ScreenLayout';
import { SF, SH, SW } from '../../../utils/Responsiveness/Dimensions';
import Colors from '../../../utils/Colors/Colors';
import { Package, CheckCircle, UserCheck2Icon, MapPin, XCircle } from 'lucide-react-native';
import styles from './styles';
import Header from '../../../components/Header';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssignedOrders } from '../../../redux/slices/assignedOrdersSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import EmptyState from '../../../components/EmptyState';
import InternetStatus from '../../../components/InternetStatus';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const EMPTY_ICONS = {
  ORDERS: "cube-outline",
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.assignedOrders);
  const [refreshing, setRefreshing] = useState(false);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const hasFetchedOnce = useRef(false);

  useEffect(() => {
    if (!hasFetchedOnce.current) {
      fetchOrders();
      hasFetchedOnce.current = true;
    }
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };

  const pendingOrders = allOrders.filter(order =>
    order.isCOD &&
    !['Delivered', 'Cancelled'].includes(order.status) &&
    ['Assigned', 'ReachedDrop'].includes(order.deliveryStatus)
  );

  const notDeliveredOrders = allOrders.filter(order => order.deliveryStatus === 'Failed');
  const cancelledOrders = allOrders.filter(order => order.status === 'Cancelled');

  const totalCODAmount = allOrders
    ?.filter(o => o.isCOD && o.status === 'Delivered' && o.deliveredAt && new Date(o.deliveredAt).toDateString() === new Date().toDateString())
    ?.reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  const recentOrders = allOrders
    ?.filter(o => ['Awaited', 'Processing', 'Confirmed', 'Confirm'].includes(o.status) && o.deliveryStatus !== 'Failed')
    ?.slice(0, 5);

          console.log("allOrders",allOrders)

  const fetchOrders = async () => {
    try {
      const pendingAssigned = await dispatch(fetchAssignedOrders({ status: 'Assigned'})).unwrap();
      const pendingReachedDrop = await dispatch(fetchAssignedOrders({ status: 'ReachedDrop' })).unwrap();
      const notDelivered = await dispatch(fetchAssignedOrders({ status: 'Failed',  })).unwrap();
      const cancelled = await dispatch(fetchAssignedOrders({ status: 'Cancelled', })).unwrap();
       const Delivered = await dispatch(fetchAssignedOrders({ status: 'Delivered', })).unwrap();
        
      console.log("pendingAssigned",pendingAssigned);
      console.log("Delivered",Delivered);
      console.log("pendingReachedDrop",pendingReachedDrop);
      console.log("notDelivered",notDelivered);
      console.log("cancelled",cancelled);

      setAllOrders([
        ...pendingAssigned.orders,
        ...pendingReachedDrop.orders,
        ...notDelivered.orders,
        ...Delivered.orders,
        ...cancelled.orders
      ]);
    } catch (err) {
      console.log('Error fetching orders:', err);
    }
  };

  const dashboardCards = [
    { title: 'Pending Deliveries', value: pendingOrders.length, icon: <Package size={20} color="#FF9F43" />, bgColor: '#FFF4E6', screen: "PendingDeliveries" },
    { title: 'Not Delivered', value: notDeliveredOrders.length, icon: <CheckCircle size={20} color="#D92D20" />, bgColor: '#FEE4E2', screen: 'NotDelivered' },
    { title: 'Cancelled Orders', value: cancelledOrders.length, icon: <XCircle size={20} color="#667085" />, bgColor: '#F2F4F7', screen: 'CancelledOrders' },
    { title: "Today's COD Collected", value: `₹${totalCODAmount}`, icon: <Icon name="rupee" size={20} color="#067647" />, bgColor: '#ECFDF3', screen: 'TotalCodCollected' },
  ];

  const renderOrderCard = ({ item }: any) => {
    const handlePress = () => {
      if (item.deliveryStatus === "ReachedDrop") {
        navigation.navigate("CashOnDelivery", { OrderData: item });
      } else {
        navigation.navigate("DropOrder", { OrderData: item });
      }
    };


    return (
      <TouchableOpacity style={styles.cardWrapper} onPress={handlePress} activeOpacity={0.8}>
        <View style={[styles.ribbon, { backgroundColor: '#faf1d1ff' }]}>
          <CheckCircle size={12} color="#FACC15" style={{ marginRight: 5 }} />
          <Text style={[styles.ribbonText, { color: "#FACC15" }]}>{item.deliveryStatus}</Text>
        </View>

        <View style={styles.historyCard}>
          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <Package size={14} color={Colors.primary} style={{ marginRight: SW(6) }} />
              <Text style={styles.orderId}>{item.orderId}</Text>
            </View>
            <View style={[styles.paymentBadge, { backgroundColor: item.isCOD ? '#FFF2F0' : '#E6F7FF' }]}>
              <Text style={[styles.paymentText, { color: item.isCOD ? '#D9480F' : '#096DD9' }]}>
                {item.isCOD ? 'COD' : 'Prepaid'}
              </Text>
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
          <Text style={{ marginTop: 10, color: Colors.primary }}>Loading orders...</Text>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <InternetStatus onReconnect={fetchOrders} />
      <Header title="Delivery Summary" showBack={false} />
      <ScrollView contentContainerStyle={{ padding: SW(10) }} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.primary]} tintColor={Colors.primary} />
      }>
        <View style={styles.overviewContainer}>
          <View style={styles.overviewCardRow}>
            {dashboardCards.map((card, index) => (
              <TouchableOpacity key={index} style={[styles.overviewCard, { backgroundColor: card.bgColor }]} onPress={() => navigation.navigate(card.screen as any)}>
                <View style={[styles.overviewCardIcon, { backgroundColor: '#fff' }]}>{card.icon}</View>
                <Text style={styles.overviewCardTitle}>{card.title}</Text>
                <Text style={styles.overviewCardValue}>{card.value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Deliveries</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PendingDeliveries')}>
              <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </View>

          {recentOrders.length === 0 ? (
            <EmptyState message="No orders are currently assigned to you." icon={EMPTY_ICONS.ORDERS} />
          ) : (
            <FlatList
              data={recentOrders}
              keyExtractor={(item) => item._id}
              renderItem={renderOrderCard}
              scrollEnabled={false}
              contentContainerStyle={{ marginTop: SH(10), paddingBottom: SH(20) }}
            />
          )}
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

export default HomeScreen;
