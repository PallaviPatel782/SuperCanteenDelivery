import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { RootState } from '../../../redux/store';

import ScreenLayout from '../../../components/ScreenLayout';
import Header from '../../../components/Header';
import styles from './styles';
import Colors from '../../../utils/Colors/Colors';
import Fonts from '../../../utils/Fonts/Fonts';
import { SH, SW } from '../../../utils/Responsiveness/Dimensions';
import CommonFilterModal from '../../../components/CommonFilterModal';
import { useFocusEffect } from '@react-navigation/native';

import { CheckCircle, Package, UserCheck2Icon, Calendar } from 'lucide-react-native';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'TotalCodCollected'>;

interface Props {
  navigation: NavProp;
}

const TotalCodCollected: React.FC<Props> = ({ navigation }) => {
  const { data: orders = [] } = useSelector(
    (state: RootState) => state.assignedOrders
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      setSelectedFilters([]);
      setStartDate(null);
      setEndDate(null);
    }, [])
  );

  const baseList = orders.filter(o =>
    o.isCOD &&
    o.status === 'Delivered' &&
    o.deliveredAt &&
    new Date(o.deliveredAt).toDateString() === new Date().toDateString()
  );

  const parseLocalDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  const filteredList = baseList.filter(order => {
    let match = true;
    const orderDate = new Date(order.deliveredAt);

    if (selectedFilters.includes("Today")) {
      match = match && orderDate.toDateString() === new Date().toDateString();
    }

    if (selectedFilters.includes("Custom Date") && startDate && endDate) {
      const start = parseLocalDate(startDate);
      const end = parseLocalDate(endDate);
      end.setHours(23, 59, 59, 999);
      match = match && orderDate >= start && orderDate <= end;
    }

    return match;
  });

  const totalCODAmount = filteredList.reduce(
    (sum, o) => sum + (o.totalPrice || 0),
    0
  );

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={() =>
        navigation.navigate('MainTabs', {
          screen: 'History',
          params: {
            screen: 'AllDeliveryRecordData',
            params: { order: item },
          },
        })
      }
    >
      <View style={styles.ribbon}>
        <CheckCircle size={12} color="#fff" style={{ marginRight: 5 }} />
        <Text style={styles.ribbonText}>Delivered</Text>
      </View>

      <View style={styles.historyCard}>
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <Package size={11} color={Colors.primary} style={{ marginRight: 6 }} />
            <Text style={styles.orderId}>{item.orderId}</Text>
          </View>

          <View style={[styles.paymentBadge, { backgroundColor: '#FFF2F0' }]}>
            <Text style={[styles.paymentText, { color: '#D9480F' }]}>COD</Text>
          </View>
        </View>

        <View style={styles.row}>
          <UserCheck2Icon size={11} color={Colors.primary} style={{ marginRight: 6 }} />
          <Text style={styles.customerName}>{item.shippingAddress?.name}</Text>
        </View>

        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <Calendar size={11} color={Colors.primary} style={{ marginRight: 4 }} />
            <Text style={styles.date}>
              {new Date(item.deliveredAt).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>₹{item.totalPrice}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenLayout scrollable={false}>
      <Header
        showBack
        title="COD Records"
        // rightIcon="filter-outline"
        // onRightPress={() => setModalVisible(true)}
      />

      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: SW(10), marginVertical: SH(10) }}>
        <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
        <Text style={{ marginHorizontal: SW(8), fontSize: SH(12), fontFamily: Fonts.Inter_Medium, color: Colors.darkGray }}>
          Total ₹{totalCODAmount}
        </Text>
        <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
      </View>

      <FlatList
        data={filteredList}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SH(120), paddingHorizontal: SW(10) }}
      />

      <CommonFilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        options={[{ title: 'Date', data: ['Today', 'Custom Date'] }]}
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
