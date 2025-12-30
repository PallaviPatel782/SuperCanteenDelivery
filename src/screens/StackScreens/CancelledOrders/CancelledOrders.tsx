import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { XCircle, Package, UserCheck2Icon, MapPin } from "lucide-react-native";
import { useFocusEffect } from "@react-navigation/native";

import ScreenLayout from "../../../components/ScreenLayout";
import Header from "../../../components/Header";
import CommonFilterModal from "../../../components/CommonFilterModal";
import EmptyState from "../../../components/EmptyState";
import InternetStatus from "../../../components/InternetStatus";

import Colors from "../../../utils/Colors/Colors";
import { OrderType, RootStackParamList } from "../../../navigation/AppNavigator";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchAssignedOrders } from "../../../redux/slices/assignedOrdersSlice";

import styles from "./styles";
import { SH, SW } from "../../../utils/Responsiveness/Dimensions";
import Fonts from "../../../utils/Fonts/Fonts";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;
type Props = { navigation: HomeScreenNavigationProp };

export const EMPTY_ICONS = { ORDERS: 'cart-outline' };
const PAGE_LIMIT = 5;

const CancelledOrders: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const cancelledBucket = useSelector(
    (state: RootState) => state.assignedOrders.paginated.cancelled
  );

  const loading = useSelector(
    (state: RootState) => state.assignedOrders.loadingMap.cancelled
  );

  const orders = cancelledBucket.data;
  const currentPage = cancelledBucket.page;
  const hasMore = cancelledBucket.hasMore;

  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const fetchOrders = async (page = 1) => {
    await dispatch(
      fetchAssignedOrders({
        orderStatus: "Cancelled",
        page,
        limit: PAGE_LIMIT,
        listKey: "cancelled",
      })
    ).unwrap();
  };

  useFocusEffect(
    useCallback(() => {
      setSelectedFilters([]);
      setStartDate(null);
      setEndDate(null);
      fetchOrders(1);
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrders(1);
    setRefreshing(false);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchOrders(currentPage + 1);
    }
  };

  const applyFilters = (list: OrderType[]) => {
    return list.filter(order => {
      let match = true;
      const orderDate = new Date(
        order.updatedAt ?? order.createdAt ?? Date.now()
      );

      const paymentFilters = selectedFilters.filter(f => f === "COD" || f === "Prepaid");
      if (paymentFilters.length) match = match && paymentFilters.some(f => f === "COD" ? order.isCOD : !order.isCOD);

      if (selectedFilters.includes("Today")) match = match && orderDate.toDateString() === new Date().toDateString();
      if (selectedFilters.includes("Month")) {
        const now = new Date();
        match = match && orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
      }
      if (selectedFilters.includes("Custom Date") && startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        match = match && orderDate >= start && orderDate <= end;
      }

      return match;
    });
  };

  const filteredList = applyFilters(orders);

  const formatDateShort = (dateStr: string) => new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });

  const getFilterMessage = () => {
    if (!selectedFilters.length) return "All Records";

    const parts = [...selectedFilters];
    if ((selectedFilters.includes("COD") || selectedFilters.includes("Prepaid")) && filteredList.length) {
      const total = filteredList.reduce((sum, o) => sum + o.totalPrice, 0);
      parts.push(`Total: ₹${total}`);
    }
    if (selectedFilters.includes("Custom Date") && startDate && endDate) {
      parts.push(`${formatDateShort(startDate)} - ${formatDateShort(endDate)}`);
    }
    return `Filtered: ${parts.join(" | ")}`;
  };

  const renderOrderCard = ({ item }: { item: OrderType }) => (
    <TouchableOpacity style={styles.cardWrapper} onPress={() => navigation.navigate('NotDeliveryRecordData', { order: item })}>
      <View style={[styles.ribbon, { backgroundColor: item.status === "Cancelled" ? "#FFE5E5" : "#FAF1D1" }]}>
        <XCircle size={14} color={item.status === "Cancelled" ? "#D92D20" : "#FACC15"} style={{ marginRight: SW(6) }} />
        <Text style={[styles.ribbonText, { color: item.status === "Cancelled" ? "#D92D20" : "#FACC15", fontWeight: "600" }]}>
          {item.status === "Cancelled" ? "Cancelled" : item.deliveryStatus}
        </Text>
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
        <View style={styles.row}>
          <UserCheck2Icon size={14} color={Colors.primary} style={{ marginRight: SW(6) }} />
          <Text style={styles.customerName}>{item.shippingAddress?.name || item.user?.username}</Text>
        </View>
        <View style={styles.row}>
          <MapPin size={14} color={Colors.primary} style={{ marginRight: SW(6) }} />
          <Text style={styles.address} numberOfLines={1}>{item.shippingAddress?.address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading && orders.length === 0 && !refreshing) {
    return (
      <ScreenLayout>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={{ marginTop: 10, color: Colors.primary }}>
            Loading Cancelled Deliveries...
          </Text>
        </View>
      </ScreenLayout>
    );
  }


  return (
    <ScreenLayout scrollable={false}>
      <InternetStatus onReconnect={() => fetchOrders(1)} />

      <Header title="Cancelled Orders" rightIcon="filter-outline" onRightPress={() => setModalVisible(true)} />

      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: SW(10), marginVertical: SH(10) }}>
        <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
        <Text style={{ marginHorizontal: SW(8), fontSize: SH(12), fontFamily: Fonts.Inter_Medium, color: Colors.darkGray }}>
          {getFilterMessage()}
        </Text>
        <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
      </View>

      <View>
        <FlatList
          data={filteredList}
          renderItem={renderOrderCard}
          keyExtractor={(item, index) => item._id + "_" + index}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{
            paddingBottom: SH(120),
            paddingHorizontal: SW(10),
          }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
          ListEmptyComponent={!loading ? <EmptyState message="No delivery records found." icon={EMPTY_ICONS.ORDERS} /> : null}
          ListFooterComponent={
            loading && hasMore ? (
              <ActivityIndicator
                size="small"
                color={Colors.primary}
                style={{ marginVertical: SH(10) }}
              />
            ) : null
          }
        />
      </View>

      <CommonFilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        options={[
          { title: "Payment Type", data: ["COD", "Prepaid"] },
          { title: "Date", data: ["Today", "Month", "Custom Date"] },
        ]}
        selectedFilters={selectedFilters}
        startDate={startDate || undefined}
        endDate={endDate || undefined}
        onApply={(filters, dateRange) => {
          setSelectedFilters(filters);
          if (filters.includes("Custom Date") && dateRange) {
            const [start, end] = dateRange.split("|");
            setStartDate(start);
            setEndDate(end);
          } else {
            setStartDate(null);
            setEndDate(null);
          }
          setModalVisible(false);
        }}
      />
    </ScreenLayout>
  );
};


export default CancelledOrders;
