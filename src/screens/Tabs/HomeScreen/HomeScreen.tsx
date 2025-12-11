import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import ScreenLayout from '../../../components/ScreenLayout';
import { SH, SW } from '../../../utils/Responsiveness/Dimensions';
import Colors from '../../../utils/Colors/Colors';
import { Package, CheckCircle, UserCheck2Icon, MapPin } from 'lucide-react-native';
import styles from './styles';
import Header from '../../../components/Header';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssignedOrders } from '../../../redux/slices/assignedOrdersSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import { notDeliveredOrders } from '../../../DummyData/OrdersData';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {

  const dispatch = useDispatch<AppDispatch>();
  const { data: orders, loading, error } = useSelector((state: RootState) => state.assignedOrders);

  const pendingCount = orders.filter(o =>
    o.deliveryStatus === 'Assigned' && (o.status === 'Awaited' || o.status === 'Pending')
  ).length;

  const notDeliveredOrdersCount = notDeliveredOrders.filter(o => o.deliveryStatus === 'Not Delivered').length;

  const totalCODAmount = orders
    .filter(o => o.isCOD && o.status !== "Cancelled")
    .reduce((sum, order) => sum + (order.totalPrice || 0), 0);

  const recentOrders = orders
    ?.filter((o) => o.status !== "Cancelled")
    ?.slice(0, 3);

  useEffect(() => {
    dispatch(fetchAssignedOrders());
  }, []);

  const dashboardCards = [
    {
      title: 'Pending Deliveries',
      value: pendingCount,
      icon: <Package size={20} color="#FF9F43" />,
      bgColor: '#FFF4E6',
      screen: "PendingDeliveries",
    },
    {
      title: 'Not Delivered',
      value: notDeliveredOrdersCount,
      icon: <CheckCircle size={20} color="#0aa94cff" />,
      bgColor: '#E9F9F1',
      screen: 'NotDelivered',
    },
    {
      title: "Today's COD Collected",
      value: `₹${totalCODAmount}`,
      icon: <Icon name="rupee" size={20} color="#E74C3C" />,
      bgColor: '#FDECEF',
      screen: 'TotalCodCollected',
    }
  ];

  const renderOrderCard = ({ item }: any) => {

    return (
      <TouchableOpacity
        style={styles.cardWrapper}
        onPress={() => navigation.navigate('DropOrder', { OrderData: item })}
      >
        <View style={[styles.ribbon, { backgroundColor: '#faf1d1ff' }]}>
          <CheckCircle size={12} color="#FACC15" style={{ marginRight: 5 }} />
          <Text style={[styles.ribbonText, { color: "#FACC15" }]}>{item.status}</Text>
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
                { backgroundColor: item.isCOD ? '#FFF2F0' : '#E6F7FF' }
              ]}
            >
              <Text
                style={[
                  styles.paymentText,
                  { color: item.isCOD ? '#D9480F' : '#096DD9' }
                ]}
              >
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
            <Text style={styles.address} numberOfLines={1}>
              {item.shippingAddress.address}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  if (loading) {
    return (
      <ScreenLayout>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={{ marginTop: 10, color: Colors.primary }}>
            Loading orders...
          </Text>
        </View>
      </ScreenLayout>
    );
  }


  return (
    <ScreenLayout>
      <Header title="Delivery Summary" showBack={false} />

      <ScrollView contentContainerStyle={{ padding: SW(10) }}>
        <View style={styles.overviewContainer}>
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
        </View>
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Deliveries</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PendingDeliveries')}>
              <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={recentOrders}
            keyExtractor={item => item._id}
            renderItem={renderOrderCard}
            scrollEnabled={false}
            contentContainerStyle={{ marginTop: SH(10), paddingBottom: SH(20) }}
          />
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

export default HomeScreen;




// import React from 'react';
// import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
// import ScreenLayout from '../../../components/ScreenLayout';
// import { SH, SW } from '../../../utils/Responsiveness/Dimensions';
// import Colors from '../../../utils/Colors/Colors';
// import { Package, CheckCircle, UserCheck2Icon, MapPin } from 'lucide-react-native';
// import styles from './styles';
// import { OrderItem, pendingOrders, notDeliveredOrders, completedOrders } from '../../../DummyData/OrdersData';
// import Header from '../../../components/Header';
// import { RootStackParamList } from '../../../navigation/AppNavigator';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import Icon from 'react-native-vector-icons/FontAwesome';

// type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

// type Props = {
//   navigation: HomeScreenNavigationProp;
// };

// const HomeScreen: React.FC<Props> = ({ navigation }) => {
//   const pendingCount = pendingOrders.filter(o => o.status === 'Pending').length;
//   const notDeliveredOrdersCount = notDeliveredOrders.filter(o => o.deliveryStatus === 'Not Delivered').length;
//   const totalCODAmount = completedOrders
//     .filter(item => item.paymentType === 'COD')
//     .reduce((sum, item) => {
//       const finalAmount = item.orderItems?.reduce(
//         (a, b) => a + b.price * (b.quantity ?? 1),
//         0
//       ) || 0;

//       return sum + finalAmount;
//     }, 0);


//   const recentOrders = pendingOrders.slice(0, 3);

//   const dashboardCards = [
//     {
//       title: 'Pending Deliveries',
//       value: pendingCount,
//       icon: <Package size={20} color="#FF9F43" />,
//       bgColor: '#FFF4E6',
//       textColor: '#000',
//       screen: "PendingDeliveries",
//       message: pendingCount === 0
//         ? "All orders are up-to-date ✅"
//         : "New orders waiting to be delivered",
//     },
//     {
//       title: 'Not Delivered',
//       value: notDeliveredOrdersCount,
//       icon: <CheckCircle size={20} color="#0aa94cff" />,
//       bgColor: '#E9F9F1',
//       textColor: '#000',
//       screen: 'NotDelivered',
//       message: notDeliveredOrdersCount === 0
//         ? "No failed deliveries 🎉"
//         : "Orders failed delivery, need redelivery",
//     },
//     {
//       title: "Today's COD Collected",
//       value: `₹${totalCODAmount}`,
//       icon: <Icon name="rupee" size={20} color="#E74C3C" />,
//       bgColor: '#FDECEF',
//       textColor: '#000',
//       screen: 'TotalCodCollected',
//       message: totalCODAmount === 0
//         ? "No COD collected today"
//         : "Total cash collected for today",
//     },
//     // {
//     //   title: 'Total Hours',
//     //   value: `${totalHours} hrs`,
//     //   icon: <Calendar size={20} color="#128df8ff" />,
//     //   bgColor: 'rgba(205, 224, 244, 1)',
//     //   textColor: '#000',
//     //   message: "Total hours spent on deliveries today",
//     // },
//   ];

//   const renderOrderCard = ({ item }: { item: OrderItem }) => {
//     const ribbonStyles = {
//       bg: item.status === "Pending" ? "#faf1d1ff" : "#dbfae6ff",
//       text: item.status === "Pending" ? "#FACC15" : "#16A34A",
//       icon: item.status === "Pending" ? "#FACC15" : "#16A34A",
//     };

//     return (
//       <TouchableOpacity style={styles.cardWrapper} onPress={() => navigation.navigate('DropOrder', { OrderData: item })}>
//         <View style={[styles.ribbon, { backgroundColor: ribbonStyles.bg }]}>
//           <CheckCircle size={12} color={ribbonStyles.icon} style={{ marginRight: 5 }} />
//           <Text style={[styles.ribbonText, { color: ribbonStyles.text }]}>
//             {item.status}
//           </Text>
//         </View>
//         <View style={styles.historyCard}>
//           <View style={styles.rowBetween}>
//             <View style={styles.row}>
//               <Package size={14} color={Colors.primary} style={{ marginRight: SW(6) }} />
//               <Text style={styles.orderId}>{item.id}</Text>
//             </View>

//             <View
//               style={[
//                 styles.paymentBadge,
//                 { backgroundColor: item.paymentType === 'COD' ? '#FFF2F0' : '#E6F7FF' }
//               ]}
//             >
//               <Text
//                 style={[
//                   styles.paymentText,
//                   { color: item.paymentType === 'COD' ? '#D9480F' : '#096DD9' }
//                 ]}
//               >
//                 {item.paymentType}
//               </Text>
//             </View>
//           </View>
//           <View style={[styles.row, { marginTop: SH(6) }]}>
//             <UserCheck2Icon size={12} color={Colors.primary} style={{ marginRight: SW(6) }} />
//             <Text style={styles.customerName}>{item.name}</Text>
//           </View>
//           <View style={[styles.row, { marginTop: SH(6) }]}>
//             <MapPin size={12} color={Colors.primary} style={{ marginRight: SW(6) }} />
//             <Text style={styles.address} numberOfLines={1}>
//               {item.address}
//             </Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };


//   return (
//     <ScreenLayout>
//       <Header
//         showBack={false}
//         title="Delivery Summary"
//       />
//       <ScrollView contentContainerStyle={{ padding: SW(10) }}>
//         <View style={styles.overviewContainer}>
//           <View style={styles.overviewCardRow}>
//             {dashboardCards.map((card, index) => (
//               <TouchableOpacity key={index} style={[styles.overviewCard, { backgroundColor: card.bgColor }]}
//                 onPress={() => card.screen && navigation.navigate(card.screen as any)}>
//                 <View style={[styles.overviewCardIcon, { backgroundColor: '#fff' }]}>
//                   {card.icon}
//                 </View>
//                 <Text style={[styles.overviewCardTitle, { color: card.textColor }]}>{card.title}</Text>
//                 <Text style={[styles.overviewCardValue, { color: card.textColor }]}>{card.value}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//         <View>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Recent Deliveries</Text>
//             <TouchableOpacity onPress={() => navigation.navigate('PendingDeliveries')}>
//               <Text style={styles.sectionLink}>View All</Text>
//             </TouchableOpacity>
//           </View>
//           <FlatList
//             data={recentOrders}
//             keyExtractor={item => item.id}
//             renderItem={renderOrderCard}
//             scrollEnabled={false}
//             contentContainerStyle={{ marginTop: SH(10), paddingBottom: SH(20) }}
//           />
//         </View>
//       </ScrollView>
//     </ScreenLayout>
//   );
// };

// export default HomeScreen;
