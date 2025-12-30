import React, { useState, useCallback } from "react";
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
import { CheckCircle, Package, UserCheck2Icon, MapPin } from "lucide-react-native";
import { useFocusEffect } from "@react-navigation/native";

import ScreenLayout from "../../../components/ScreenLayout";
import Header from "../../../components/Header";
import CommonFilterModal from "../../../components/CommonFilterModal";
import EmptyState from "../../../components/EmptyState";
import InternetStatus from "../../../components/InternetStatus";

import Colors from "../../../utils/Colors/Colors";
import Fonts from "../../../utils/Fonts/Fonts";
import { SH, SW } from "../../../utils/Responsiveness/Dimensions";

import { OrderType, RootStackParamList } from "../../../navigation/AppNavigator";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchAssignedOrders } from "../../../redux/slices/assignedOrdersSlice";

import styles from "./styles";

type NavProp = NativeStackNavigationProp<RootStackParamList, "MainTabs">;
type Props = { navigation: NavProp };

const PAGE_LIMIT = 5;

const NotDelivered: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();

  const failedBucket = useSelector(
    (state: RootState) => state.assignedOrders.paginated.failed
  );

  const loading = useSelector(
    (state: RootState) => state.assignedOrders.loadingMap.failed
  );

  const orders = failedBucket.data;
  const currentPage = failedBucket.page;
  const hasMore = failedBucket.hasMore;

  const [refreshing, setRefreshing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const fetchOrders = async (page = 1) => {
    await dispatch(
      fetchAssignedOrders({
        status: "Failed",
        page,
        limit: PAGE_LIMIT,
        listKey: "failed",
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


  const filteredList = orders.filter(order => {
    let match = true;
    const now = new Date();
    let orderDate: Date;

    if (order.updatedAt) {
      orderDate = new Date(order.updatedAt);
    } else if (order.createdAt) {
      orderDate = new Date(order.createdAt);
    } else {
      orderDate = new Date();
    }

    const paymentFilters = selectedFilters.filter(
      f => f === "COD" || f === "Prepaid"
    );

    if (paymentFilters.length) {
      match =
        match &&
        paymentFilters.some(f =>
          f === "COD" ? order.isCOD : !order.isCOD
        );
    }

    if (selectedFilters.includes("Today")) {
      match = match && orderDate.toDateString() === now.toDateString();
    }

    if (selectedFilters.includes("Month")) {
      match =
        match &&
        orderDate.getMonth() === now.getMonth() &&
        orderDate.getFullYear() === now.getFullYear();
    }

    if (selectedFilters.includes("Custom Date") && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      match = match && orderDate >= start && orderDate <= end;
    }

    return match;
  });

  if (loading && orders.length === 0 && !refreshing) {
    return (
      <ScreenLayout>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={{ marginTop: 10, color: Colors.primary }}>
            Loading Failed Deliveries...
          </Text>
        </View>
      </ScreenLayout>
    );
  }

  const renderItem = ({ item }: { item: OrderType }) => (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={() =>
        navigation.navigate("NotDeliveryRecordData", { order: item })
      }
    >
      <View style={[styles.ribbon, { backgroundColor: "#FEE2E2" }]}>
        <CheckCircle size={14} color="#DC2626" style={{ marginRight: SW(6) }} />
        <Text style={[styles.ribbonText, { color: "#991B1B" }]}>
          Delivery Failed
        </Text>
      </View>

      <View style={styles.historyCard}>
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <Package size={14} color={Colors.primary} style={{ marginRight: SW(6) }} />
            <Text style={styles.orderId}>{item.orderId}</Text>
          </View>

          <View
            style={[
              styles.paymentBadge,
              { backgroundColor: item.isCOD ? "#FFF2F0" : "#E6F7FF" },
            ]}
          >
            <Text
              style={[
                styles.paymentText,
                { color: item.isCOD ? "#D9480F" : "#096DD9" },
              ]}
            >
              {item.isCOD ? "COD" : "Prepaid"}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <UserCheck2Icon size={14} color={Colors.primary} style={{ marginRight: SW(6) }} />
          <Text style={styles.customerName}>
            {item.shippingAddress?.name || item.user?.username}
          </Text>
        </View>

        <View style={styles.row}>
          <MapPin size={14} color={Colors.primary} style={{ marginRight: SW(6) }} />
          <Text style={styles.address} numberOfLines={1}>
            {item.shippingAddress?.address}
          </Text>
        </View>

        {item.deliveryFailedReason && (
          <View style={styles.failedBox}>
            <Text style={styles.failedText}>{item.deliveryFailedReason}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenLayout scrollable={false}>
      <InternetStatus onReconnect={() => fetchOrders(1)} />

      <Header
        title="Delivery Records"
        rightIcon="filter-outline"
        onRightPress={() => setModalVisible(true)}
      />

      <FlatList
        data={filteredList}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          !loading ? <EmptyState message="No delivery records found." /> : null
        }
        ListFooterComponent={
          loading && hasMore ? (
            <ActivityIndicator
              size="small"
              color={Colors.primary}
              style={{ marginVertical: SH(10) }}
            />
          ) : null
        }
        contentContainerStyle={{ padding: SW(10), paddingBottom: SH(20) }}
      />

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
            const [s, e] = dateRange.split("|");
            setStartDate(s);
            setEndDate(e);
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

export default NotDelivered;
