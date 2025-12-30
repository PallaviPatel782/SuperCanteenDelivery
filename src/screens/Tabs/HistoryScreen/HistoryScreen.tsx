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
import {
  CheckCircle,
  Package,
  UserCheck2Icon,
  Calendar,
} from "lucide-react-native";
import { useFocusEffect } from "@react-navigation/native";

import ScreenLayout from "../../../components/ScreenLayout";
import Header from "../../../components/Header";
import CommonFilterModal from "../../../components/CommonFilterModal";
import EmptyState from "../../../components/EmptyState";
import InternetStatus from "../../../components/InternetStatus";

import Colors from "../../../utils/Colors/Colors";

import {
  HistoryStackParamList,
  OrderType,
} from "../../../navigation/AppNavigator";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchAssignedOrders } from "../../../redux/slices/assignedOrdersSlice";

import styles from "./styles";
import { SH, SW } from "../../../utils/Responsiveness/Dimensions";
import Fonts from "../../../utils/Fonts/Fonts";

export type HistoryNavProp = NativeStackNavigationProp<
  HistoryStackParamList,
  "HistoryMain"
>;

const PAGE_LIMIT = 5;

const HistoryScreen: React.FC<{ navigation: HistoryNavProp }> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const deliveredBucket = useSelector(
    (state: RootState) => state.assignedOrders.paginated.delivered
  );

  const loading = useSelector(
    (state: RootState) => state.assignedOrders.loadingMap.delivered
  );

  const orders = deliveredBucket.data;
  const currentPage = deliveredBucket.page;
  const hasMore = deliveredBucket.hasMore;
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  console.log("paginatedData", orders);

  const fetchOrders = async (page = 1) => {
    await dispatch(
      fetchAssignedOrders({
        status: "Delivered",
        page,
        limit: PAGE_LIMIT,
        listKey: "delivered",
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
    return list.filter((order) => {
      let match = true;
      const orderDate = new Date(
        order.deliveredAt ??
        order.updatedAt ??
        order.createdAt ??
        Date.now()
      );
      const now = new Date();

      const paymentFilters = selectedFilters.filter(f => f === "COD" || f === "Prepaid");
      if (paymentFilters.length) match = match && paymentFilters.some(f => f === "COD" ? order.isCOD : !order.isCOD);

      if (selectedFilters.includes("Today")) match = match && orderDate.toDateString() === now.toDateString();
      if (selectedFilters.includes("Month")) match = match && orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
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

  const renderItem = ({ item }: { item: OrderType }) => (
    <TouchableOpacity style={styles.cardWrapper} onPress={() => navigation.navigate("AllDeliveryRecordData", { order: item })}>
      <View style={styles.ribbon}>
        <CheckCircle size={12} color="#fff" />
        <Text style={styles.ribbonText}>{item.status}</Text>
      </View>

      <View style={styles.historyCard}>
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <Package size={11} color={Colors.primary} />
            <Text style={styles.orderId}>{item.orderId}</Text>
          </View>

          <View style={[styles.paymentBadge, { backgroundColor: item.isCOD ? "#FFF2F0" : "#E6F7FF" }]}>
            <Text style={[styles.paymentText, { color: item.isCOD ? "#D9480F" : "#096DD9" }]}>{item.isCOD ? "COD" : "Prepaid"}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <UserCheck2Icon size={11} color={Colors.primary} />
          <Text style={styles.customerName}>{item.shippingAddress?.name || item.user.username}</Text>
        </View>

        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <Calendar size={11} color={Colors.primary} />
            <Text style={styles.date}>{item.deliveredAt ? new Date(item.deliveredAt).toLocaleDateString("en-GB") : "N/A"}</Text>
          </View>

          <Text style={styles.priceText}>₹{item.totalPrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenLayout scrollable={false}>
      <InternetStatus onReconnect={() => fetchOrders(1)} />

      <Header title="Delivery Records" rightIcon="filter-outline" onRightPress={() => setModalVisible(true)} />

      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: SW(10), marginVertical: SH(10) }}>
        <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
        <Text style={{ marginHorizontal: SW(8), fontSize: SH(12), fontFamily: Fonts.Inter_Medium, color: Colors.darkGray }}>{getFilterMessage()}</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
      </View>

      <View>
        <FlatList
          data={filteredList}
          renderItem={renderItem}
          scrollEnabled={true}
          keyExtractor={(item, index) => item._id + "_" + index}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{
            paddingBottom: SH(120),
            paddingHorizontal: SW(10),
          }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
          ListEmptyComponent={!loading ? <EmptyState message="No delivery records found." /> : null}
          // ListFooterComponent={
          //   !loading && hasMore ? (
          //     <TouchableOpacity style={styles.loadMoreBtn} onPress={loadMore}>
          //       <Text style={styles.loadMoreText}>Load More</Text>
          //     </TouchableOpacity>
          //   ) : loading && hasMore ? (
          //     <ActivityIndicator size="small" color={Colors.primary} style={{ marginVertical: SH(10) }} />
          //   ) : null
          // }
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

export default HistoryScreen;