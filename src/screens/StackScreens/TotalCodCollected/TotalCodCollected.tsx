import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import ScreenLayout from '../../../components/ScreenLayout';
import Header from '../../../components/Header';
import Colors from '../../../utils/Colors/Colors';
import { SH, SW } from '../../../utils/Responsiveness/Dimensions';
import { CheckCircle, Package, UserCheck2Icon, Calendar } from 'lucide-react-native';
import CommonFilterModal from '../../../components/CommonFilterModal';
import Fonts from '../../../utils/Fonts/Fonts';
import { completedOrders } from '../../../DummyData/OrdersData';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/AppNavigator';

// -------- Correct Prop Type --------
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TotalCodCollected'>;
};

export type HistoryItem = any;

const TotalCodCollected: React.FC<Props> = ({ navigation }) => {

  const [filterType, setFilterType] = useState<
    'ALL' | 'COD' | 'Prepaid' | 'Today' | 'Month' | 'Custom'
  >('ALL');

  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
    });
  };

  const getTotalCODAmount = (list: HistoryItem[]) => {
    const filteredCOD = list.filter(item => item.paymentType === 'COD');
    return filteredCOD.reduce((acc, item) => {
      const amountNumber = Number(item.amount.replace(/[^0-9]/g, ''));
      return acc + amountNumber;
    }, 0);
  };

  const getFilterMessage = (list: HistoryItem[]) => {
    const totalCOD = getTotalCODAmount(list);

    if (filterType === 'COD') return `Your COD Records - Total ₹${totalCOD}`;
    if (filterType === 'Prepaid') return `Your Paid Records${totalCOD ? ` - COD ₹${totalCOD}` : ''}`;
    if (filterType === 'Today') return `Your Today's Records${totalCOD ? ` - COD ₹${totalCOD}` : ''}`;
    if (filterType === 'Month') return `Your This Month Records${totalCOD ? ` - COD ₹${totalCOD}` : ''}`;

    if (filterType === 'Custom' && startDate && endDate) {
      return `Your Records from ${formatDate(startDate)} to ${formatDate(endDate)}${totalCOD
        ? ` - COD ₹${totalCOD}`
        : ''}`;
    }

    return `All Records${totalCOD ? ` - COD ₹${totalCOD}` : ''}`;
  };

  const filteredList = completedOrders.filter(i => i.paymentType === 'COD');


  const renderItem = ({ item }: { item: HistoryItem }) => (
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
        <Text style={styles.ribbonText}>{item.status}</Text>
      </View>

      <View style={styles.historyCard}>
        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <Package size={11} color={Colors.primary} style={{ marginRight: 6 }} />
            <Text style={styles.orderId}>{item.id}</Text>
          </View>

          <View
            style={[
              styles.paymentBadge,
              { backgroundColor: item.paymentType === 'COD' ? '#FFF2F0' : '#E6F7FF' },
            ]}
          >
            <Text
              style={[
                styles.paymentText,
                { color: item.paymentType === 'COD' ? '#D9480F' : '#096DD9' },
              ]}
            >
              {item.paymentType}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <UserCheck2Icon size={11} color={Colors.primary} style={{ marginRight: 6 }} />
          <Text style={styles.customerName}>{item.name}</Text>
        </View>

        <View style={styles.rowBetween}>
          <View style={styles.row}>
            <Calendar size={11} color={Colors.primary} style={{ marginRight: 4 }} />
            <Text style={styles.date}>{item.time}</Text>
          </View>

          <View style={styles.priceTag}>
            <Text style={styles.priceText}>{item.amount}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenLayout scrollable={false}>
      <Header showBack={true} title="COD Records" />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: SW(10),
          marginVertical: SH(10),
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />

        <Text
          style={{
            marginHorizontal: SW(8),
            fontSize: SH(12),
            fontFamily: Fonts.Inter_Medium,
            color: Colors.darkGray,
            textAlign: 'center',
          }}
        >
          {getFilterMessage(filteredList)}
        </Text>

        <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
      </View>

      <View style={{ flex: 1, paddingHorizontal: SW(10) }}>
        <FlatList
          data={filteredList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: SH(120) }}
        />
      </View>

      <CommonFilterModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        options={[
          { title: 'Payment Type', data: ['COD', 'Prepaid'] },
          { title: 'Date', data: ['Today', 'Month', 'Custom Date'] },
        ]}
        onSelect={(value, dateRange) => {
          if (value === 'Custom Date' && dateRange) {
            const [start, end] = dateRange.split('|');
            setStartDate(start);
            setEndDate(end);
            setFilterType('Custom');
          } else {
            setFilterType(value as any);
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
