import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import {
  CheckCircle,
  Package,
  UserCheck2Icon,
  Calendar,
} from "lucide-react-native";

import { RootStackParamList } from "../../../navigation/AppNavigator";
import { RootState, AppDispatch } from "../../../redux/store";
import { fetchAssignedOrders } from "../../../redux/slices/assignedOrdersSlice";

import ScreenLayout from "../../../components/ScreenLayout";
import Header from "../../../components/Header";
import EmptyState from "../../../components/EmptyState";
import CommonFilterModal from "../../../components/CommonFilterModal";

import Colors from "../../../utils/Colors/Colors";
import Fonts from "../../../utils/Fonts/Fonts";
import { SH, SW } from "../../../utils/Responsiveness/Dimensions";
import styles from "./styles";

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  "TotalCodCollected"
>;

interface Props {
  navigation: NavProp;
}

const PAGE_LIMIT = 5;

const TotalCodCollected: React.FC<Props> = ({ navigation }) => {
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


  const filteredList = orders.filter((order) => {
    if (!order.isCOD || !order.deliveredAt) return false;

    const orderDate = new Date(order.deliveredAt);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    let match = true;

    if (selectedFilters.length === 0 || selectedFilters.includes("Today")) {
      match = orderDate >= todayStart && orderDate <= todayEnd;
    }

    if (selectedFilters.includes("Custom Date") && startDate && endDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);

      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      match = orderDate >= start && orderDate <= end;
    }

    return match;
  });

  const totalCODAmount = filteredList
    .reduce((sum, o) => sum + (o.totalPrice || 0), 0)
    .toFixed(2);


  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={() =>
        navigation.navigate("MainTabs", {
          screen: "History",
          params: {
            screen: "AllDeliveryRecordData",
            params: { order: item },
          },
        })
      }
    >
      <View style={styles.ribbon}>
        <CheckCircle size={12} color="#fff" />
        <Text style={styles.ribbonText}>Delivered</Text>
      </View>

      <View style={styles.historyCard}>
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <Package size={11} color={Colors.primary} />
            <Text style={styles.orderId}>{item.orderId}</Text>
          </View>

          <View style={[styles.paymentBadge, { backgroundColor: "#FFF2F0" }]}>
            <Text style={[styles.paymentText, { color: "#D9480F" }]}>
              COD
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <UserCheck2Icon size={11} color={Colors.primary} />
          <Text style={styles.customerName}>
            {item.shippingAddress?.name}
          </Text>
        </View>

        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <Calendar size={11} color={Colors.primary} />
            <Text style={styles.date}>
              {new Date(item.deliveredAt).toLocaleDateString()}
            </Text>
          </View>

          <Text style={styles.priceText}>₹{item.totalPrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenLayout scrollable={false}>
      <Header
        showBack
        title="COD Records"
        rightIcon="filter-outline"
        onRightPress={() => setModalVisible(true)}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: SW(10),
          marginVertical: SH(10),
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
        <Text
          style={{
            marginHorizontal: SW(8),
            fontSize: SH(12),
            fontFamily: Fonts.Inter_Medium,
            color: Colors.darkGray,
          }}
        >
          Total ₹{totalCODAmount}
        </Text>
        <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
      </View>

      <FlatList
        data={filteredList}
        renderItem={renderItem}
        keyExtractor={(item, index) => item._id + "_" + index}
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
          !loading ? <EmptyState message="No COD records found." /> : null
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
        contentContainerStyle={{
          paddingBottom: SH(120),
          paddingHorizontal: SW(10),
        }}
      />

      <CommonFilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        options={[{ title: "Date", data: ["Today", "Custom Date"] }]}
        selectedFilters={selectedFilters}
        startDate={startDate || undefined}
        endDate={endDate || undefined}
        onApply={(filters, range) => {
          setSelectedFilters(filters);
          if (filters.includes("Custom Date") && range) {
            const [s, e] = range.split("|");
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

export default TotalCodCollected;
