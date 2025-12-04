import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import ScreenLayout from '../../../components/ScreenLayout';
import { SF, SH, SW } from '../../../utils/Responsiveness/Dimensions';
import Colors from '../../../utils/Colors/Colors';
import { Package, CheckCircle, UserCheck2Icon, MapPin } from 'lucide-react-native';
import { OrderItem, notDeliveredOrders } from '../../../DummyData/OrdersData';
import Header from '../../../components/Header';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from './styles';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const NotDelivered: React.FC<Props> = ({ navigation }) => {
  const AllPendingOrders = notDeliveredOrders;

  const renderOrderCard = ({ item }: { item: OrderItem }) => {
    const isRedelivery = item.redelivery;

    return (
      <TouchableOpacity
        style={{
          backgroundColor: Colors.White,
          borderRadius: SH(8),
          marginBottom: SH(12),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
          overflow: 'hidden',
        }}
        onPress={() => navigation.navigate('NotDeliveryRecordData', { order: item })}
      >
        <View
          style={{
            ...styles.ribbon,
            backgroundColor: isRedelivery ? '#FEF3C7' : '#D1FAE5', 
          }}
        >
          <CheckCircle
            size={14}
            color={isRedelivery ? '#B45309' : '#10B981'}
            style={{ marginRight: SW(6) }}
          />
          <Text
            style={{
              ...styles.ribbonText,
              color: isRedelivery ? '#B45309' : '#047857',
            }}
          >
            {isRedelivery ? 'Redelivery Pending' : item.status}
          </Text>
        </View>
        <View style={styles.historyCard}>
          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <Package size={16} color={Colors.primary} style={{ marginRight: SW(6) }} />
              <Text style={styles.orderId}>{item.id}</Text>
            </View>

            <View
              style={{
                ...styles.paymentBadge,
                backgroundColor: item.paymentType === 'COD' ? '#FFF2F0' : '#E6F7FF',
              }}
            >
              <Text
                style={{
                  ...styles.paymentText,
                  color: item.paymentType === 'COD' ? '#D9480F' : '#096DD9',
                }}
              >
                {item.paymentType}
              </Text>
            </View>
          </View>
          <View style={{ ...styles.row}}>
            <UserCheck2Icon size={14} color={Colors.primary} style={{ marginRight: SW(6) }} />
            <Text style={styles.customerName}>{item.name}</Text>
          </View>
          <View style={{ ...styles.row }}>
            <MapPin size={14} color={Colors.primary} style={{ marginRight: SW(6) }} />
            <Text style={styles.address} numberOfLines={1}>
              {item.drop.address}
            </Text>
          </View>
          {isRedelivery && (
            <View
              style={{
                marginTop: SH(8),
                backgroundColor: '#f2e6e6ff',
                padding: SH(6),
                borderRadius: SH(4),
              }}
            >
              {item.message && (
                <Text style={{ color: 'rgba(253, 2, 2, 1)', fontSize: SF(10), marginTop: SH(2) }}>
                  {item.message}
                </Text>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenLayout>
      <Header showBack={true} title="Not Delivered Orders" />

      <ScrollView contentContainerStyle={{ padding: SW(10) }}>
        <FlatList
          data={AllPendingOrders}
          keyExtractor={item => item.id}
          renderItem={renderOrderCard}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: SH(20) }}
        />
      </ScrollView>
    </ScreenLayout>
  );
};

export default NotDelivered;
