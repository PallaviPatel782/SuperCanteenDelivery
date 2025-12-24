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
  MapPin,
} from "lucide-react-native";
import { useFocusEffect } from "@react-navigation/native";

import ScreenLayout from "../../../components/ScreenLayout";
import Header from "../../../components/Header";
import CommonFilterModal from "../../../components/CommonFilterModal";
import EmptyState from "../../../components/EmptyState";
import InternetStatus from "../../../components/InternetStatus";

import Colors from "../../../utils/Colors/Colors";

import {
  OrderType,
  RootStackParamList,
} from "../../../navigation/AppNavigator";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchAssignedOrders } from "../../../redux/slices/assignedOrdersSlice";

import styles from "./styles";
import { SH, SW } from "../../../utils/Responsiveness/Dimensions";
import Fonts from "../../../utils/Fonts/Fonts";

type HomeScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const EMPTY_ICONS = { ORDERS: 'cart-outline' };

const PAGE_LIMIT = 10;

const NotDelivered: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: orders = [], loading } = useSelector(
    (state: RootState) => state.assignedOrders
  );

  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      console.log(" History focused → reset & load");

      setPage(1);
      setSelectedFilters([]);
      setStartDate(null);
      setEndDate(null);

      dispatch(
        fetchAssignedOrders({
          status: "Failed",
          page: 1,
          limit: PAGE_LIMIT,
        })
      );

      return () => {
        console.log(" Leaving History → clear filters");
        setSelectedFilters([]);
        setStartDate(null);
        setEndDate(null);
      };
    }, [])
  );


  const loadMore = () => {
    if (!loading && orders.length >= PAGE_LIMIT) {
      const nextPage = page + 1;
      console.log(" Load more triggered, page:", nextPage);

      setPage(nextPage);
      dispatch(
        fetchAssignedOrders({
          status: "Failed",
          page: nextPage,
          limit: PAGE_LIMIT,
        })
      );
    }
  };


  const onRefresh = async () => {
    console.log(" Pull to refresh");
    setRefreshing(true);
    setPage(1);

    await dispatch(
      fetchAssignedOrders({
        status: "Failed",
        page: 1,
        limit: PAGE_LIMIT,
      })
    );

    setRefreshing(false);
  };

  const applyFrontendFilters = (list: OrderType[]) => {
    return list.filter(order => {
      let match = true;
      const now = new Date();

      const orderDate = new Date(
        order.updatedAt || order.createdAt || Date.now()
      );

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
  };



  const filteredList = applyFrontendFilters(orders);

  useEffect(() => {
    console.log("📦 Total orders from API:", orders.length);
    console.log("✅ After filter:", filteredList.length);
  }, [orders, selectedFilters]);


  const formatDateShort = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  };


  const getFilterMessage = () => {
    if (selectedFilters.length === 0) return "All Records";

    const parts: string[] = [...selectedFilters];

    if (
      (selectedFilters.includes("COD") ||
        selectedFilters.includes("Prepaid")) &&
      filteredList.length
    ) {
      const total = filteredList.reduce(
        (sum, o) => sum + o.totalPrice,
        0
      );
      parts.push(`Total: ₹${total}`);
    }

    if (selectedFilters.includes("Custom Date") && startDate && endDate) {
      parts.push(
        `${formatDateShort(startDate)} - ${formatDateShort(endDate)}`
      );
    }

    return `Filtered: ${parts.join(" | ")}`;
  };

  if (loading && !refreshing) {
    return (
      <ScreenLayout>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={{ marginTop: 10, color: Colors.primary }}>Loading Not Delivery History...</Text>
        </View>
      </ScreenLayout>
    );
  }

  const renderItem = ({ item }: { item: OrderType }) => (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={() =>
        navigation.navigate('NotDeliveryRecordData', { order: item })
      }
    >
      <View style={[styles.ribbon, { backgroundColor: '#FEE2E2' }]}>
        <CheckCircle size={14} color="#DC2626" style={{ marginRight: SW(6) }} />
        <Text style={[styles.ribbonText, { color: '#991B1B' }]}>
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
            <Text style={styles.failedText}>
              {item.deliveryFailedReason}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenLayout scrollable={false}>
      <InternetStatus
        onReconnect={() =>
          dispatch(
            fetchAssignedOrders({
              status: "Delivered",
              page: 1,
              limit: PAGE_LIMIT,
            })
          )
        }
      />

      <Header
        title="Delivery Records"
        rightIcon="filter-outline"
        onRightPress={() => setModalVisible(true)}
      />

      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: SW(10), marginVertical: SH(10) }}>
        <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
        <Text style={{ marginHorizontal: SW(8), fontSize: SH(12), fontFamily: Fonts.Inter_Medium, color: Colors.darkGray }}>
          {getFilterMessage()}
        </Text>
        <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
      </View>

      <View style={{ paddingHorizontal: SW(10), paddingVertical: SH(10) }}>
        <FlatList
          data={filteredList}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
            />
          }
          ListEmptyComponent={
            !loading ? (
              <EmptyState message="No delivery records found." />
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
          console.log("Filters applied:", filters, dateRange);
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

export default NotDelivered;

