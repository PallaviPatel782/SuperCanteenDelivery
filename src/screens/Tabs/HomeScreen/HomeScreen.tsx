import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import ScreenLayout from '../../../components/ScreenLayout';
import { SH, SW } from '../../../utils/Responsiveness/Dimensions';
import Colors from '../../../utils/Colors/Colors';
import {
  Package,
  CheckCircle,
  UserCheck2Icon,
  MapPin,
  XCircle,
} from 'lucide-react-native';
import styles from './styles';
import Header from '../../../components/Header';
import { OrderType, RootStackParamList } from '../../../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAssignedOrders } from '../../../redux/slices/assignedOrdersSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import EmptyState from '../../../components/EmptyState';
import InternetStatus from '../../../components/InternetStatus';
import { fetchProfile } from '../../../redux/slices/GetProfileSlice';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const EMPTY_ICONS = {
  ORDERS: 'cube-outline',
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();

  const allOrders = useSelector<RootState, OrderType[]>(
    (state) => state.assignedOrders.allData
  );
  console.log("allOrders", allOrders);

  const loading = useSelector((state: RootState) => state.assignedOrders.actionLoading);
  const profileData = useSelector((state: RootState) => state.profile.data);

  const pendingCodAmount = profileData?.pendingCodAmount ?? 0;
  const totalCodCollected = profileData?.totalCodCollected ?? 0;
  const lastSettlementAt = profileData?.lastSettlementAt;

  const [refreshing, setRefreshing] = useState(false);

  const formatDate = (date?: string) => {
    if (!date) return '--';
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const fetchOrders = async () => {
    try {
      await dispatch(fetchProfile()).unwrap();
      await dispatch(fetchAllAssignedOrders({})).unwrap();
    } catch (err) {
      console.log('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };

  // FILTERS
  const pendingOrders = allOrders.filter(
    (order) =>
      order.isCOD &&
      !['Delivered', 'Cancelled'].includes(order.status) &&
      ['Assigned', 'ReachedDrop'].includes(order.deliveryStatus)
  );

  const notDeliveredOrders = allOrders.filter(
    (order) => order.deliveryStatus === 'Failed'
  );

  const cancelledOrders = allOrders.filter(
    (order) => order.status === 'Cancelled'
  );

  const totalCODAmount = allOrders
    .filter(
      (o) =>
        o.isCOD &&
        o.status === 'Delivered' &&
        o.deliveredAt &&
        new Date(o.deliveredAt).toDateString() === new Date().toDateString()
    )
    .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  const recentOrders = allOrders
    .filter(
      (o) =>
        ['Awaited', 'Processing', 'Confirmed', 'Confirm'].includes(o.status) &&
        o.deliveryStatus !== 'Failed'
    )
    .slice(0, 5);


  const dashboardCards = [
    {
      title: 'Pending Deliveries',
      value: pendingOrders.length,
      icon: <Package size={20} color="#FF9F43" />,
      bgColor: '#FFF4E6',
      screen: 'PendingDeliveries',
    },
    {
      title: 'Not Delivered',
      value: notDeliveredOrders.length,
      icon: <CheckCircle size={20} color="#D92D20" />,
      bgColor: '#FEE4E2',
      screen: 'NotDelivered',
    },
    {
      title: 'Cancelled Orders',
      value: cancelledOrders.length,
      icon: <XCircle size={20} color="#667085" />,
      bgColor: '#F2F4F7',
      screen: 'CancelledOrders',
    },
    {
      title: "Today's COD Collected",
      value: `₹${totalCODAmount}`,
      icon: <Icon name="rupee" size={20} color="#067647" />,
      bgColor: '#ECFDF3',
      screen: 'TotalCodCollected',
    },
  ];

  const renderOrderCard = ({ item }: any) => {
    const handlePress = () => {
      if (item.deliveryStatus === 'ReachedDrop') {
        navigation.navigate('CashOnDelivery', { OrderData: item });
      } else {
        navigation.navigate('DropOrder', { OrderData: item });
      }
    };

    return (
      <TouchableOpacity
        style={styles.cardWrapper}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={[styles.ribbon, { backgroundColor: '#faf1d1ff' }]}>
          <CheckCircle size={12} color="#FACC15" />
          <Text style={[styles.ribbonText, { color: '#FACC15' }]}>
            {item.deliveryStatus}
          </Text>
        </View>

        <View style={styles.historyCard}>
          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <Package size={14} color={Colors.primary} />
              <Text style={styles.orderId}>{item.orderId}</Text>
            </View>

            <View
              style={[
                styles.paymentBadge,
                { backgroundColor: item.isCOD ? '#FFF2F0' : '#E6F7FF' },
              ]}
            >
              <Text
                style={[
                  styles.paymentText,
                  { color: item.isCOD ? '#D9480F' : '#096DD9' },
                ]}
              >
                {item.isCOD ? 'COD' : 'Prepaid'}
              </Text>
            </View>
          </View>

          <View style={[styles.row, { marginTop: SH(6) }]}>
            <UserCheck2Icon size={12} color={Colors.primary} />
            <Text style={styles.customerName}>
              {item.shippingAddress?.name ?? '--'}
            </Text>
          </View>

          <View style={[styles.row, { marginTop: SH(6) }]}>
            <MapPin size={12} color={Colors.primary} />
            <Text style={styles.address} numberOfLines={1}>
              {item.shippingAddress?.address ?? '--'}
            </Text>
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

      <ScrollView
        contentContainerStyle={{ padding: SW(10) }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Colors.primary]} tintColor={Colors.primary} />
        }
      >
        {/* Dashboard Cards */}
        <View style={styles.overviewCard1}>
          <View style={styles.overviewCardRow}>
            {dashboardCards.map((card, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.overviewCard, { backgroundColor: card.bgColor }]}
                onPress={() => navigation.navigate(card.screen as any)}
              >
                <View style={[styles.overviewCardIcon, { backgroundColor: '#fff' }]}>
                  {card.icon}
                </View>
                <Text style={styles.overviewCardTitle}>{card.title}</Text>
                <Text style={styles.overviewCardValue}>{card.value}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* COD Summary */}
          <View style={styles.codSummaryCard}>
            <View style={styles.codSection}>
              <Text style={styles.codLabel}>Pending COD</Text>
              <Text style={styles.codValue}>₹{pendingCodAmount}</Text>
            </View>

            <View style={styles.verticalDivider} />
            <View style={styles.codSection}>
              <Text style={styles.codLabel}>Total Settled</Text>
              <Text style={[styles.codValue, { color: '#067647' }]}>{totalCodCollected}</Text>
            </View>

            <View style={styles.verticalDivider} />
            <View style={styles.codSection}>
              <Text style={styles.codLabel}>Last Settlement</Text>
              <Text style={styles.codDate}>{formatDate(lastSettlementAt)}</Text>
            </View>
          </View>
        </View>

        {/* Recent Orders */}
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
              keyExtractor={(item) => item._id ?? Math.random().toString()}
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
