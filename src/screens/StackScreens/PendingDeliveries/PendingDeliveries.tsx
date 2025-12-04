import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import ScreenLayout from '../../../components/ScreenLayout';
import { SH, SW } from '../../../utils/Responsiveness/Dimensions';
import Colors from '../../../utils/Colors/Colors';
import { Package, CheckCircle, UserCheck2Icon, Calendar, MapPin } from 'lucide-react-native';
import styles from './styles';
import { OrderItem, pendingOrders } from '../../../DummyData/OrdersData';
import Header from '../../../components/Header';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

const PendingDeliveries: React.FC<Props> = ({ navigation }) => {

    const AllPendingOrders = pendingOrders;

    const renderOrderCard = ({ item }: { item: OrderItem }) => {
        const ribbonStyles = {
            bg: item.status === "Pending" ? "#faf1d1ff" : "#dbfae6ff",
            text: item.status === "Pending" ? "#FACC15" : "#16A34A",
            icon: item.status === "Pending" ? "#FACC15" : "#16A34A",
        };

        return (
            <TouchableOpacity style={styles.cardWrapper} onPress={() => navigation.navigate('DropOrder', { OrderData: item })}>
                <View style={[styles.ribbon, { backgroundColor: ribbonStyles.bg }]}>
                    <CheckCircle size={12} color={ribbonStyles.icon} style={{ marginRight: 5 }} />
                    <Text style={[styles.ribbonText, { color: ribbonStyles.text }]}>
                        {item.status}
                    </Text>
                </View>
                <View style={styles.historyCard}>
                    <View style={styles.rowBetween}>
                        <View style={styles.row}>
                            <Package size={14} color={Colors.primary} style={{ marginRight: SW(6) }} />
                            <Text style={styles.orderId}>{item.id}</Text>
                        </View>

                        <View
                            style={[
                                styles.paymentBadge,
                                { backgroundColor: item.paymentType === 'COD' ? '#FFF2F0' : '#E6F7FF' }
                            ]}
                        >
                            <Text
                                style={[
                                    styles.paymentText,
                                    { color: item.paymentType === 'COD' ? '#D9480F' : '#096DD9' }
                                ]}
                            >
                                {item.paymentType}
                            </Text>
                        </View>
                    </View>

                    {/* Customer Name */}
                    <View style={[styles.row, { marginTop: SH(6) }]}>
                        <UserCheck2Icon size={12} color={Colors.primary} style={{ marginRight: SW(6) }} />
                        <Text style={styles.customerName}>{item.name}</Text>
                    </View>

                    {/* Address Line */}
                    <View style={[styles.row, { marginTop: SH(6) }]}>
                        <MapPin size={12} color={Colors.primary} style={{ marginRight: SW(6) }} />
                        <Text style={styles.address} numberOfLines={1}>
                            {item.address}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };



    return (
        <ScreenLayout>
            <Header
                showBack={true}
                title="Pending Deliveries"
            // rightIcon="filter-outline"
            />
            <ScrollView contentContainerStyle={{ padding: SW(10) }}>

                <View>
                    <FlatList
                        data={AllPendingOrders}
                        keyExtractor={item => item.id}
                        renderItem={renderOrderCard}
                        scrollEnabled={false}
                        contentContainerStyle={{ marginTop: SH(10), paddingBottom: SH(20) }}
                    />
                </View>
            </ScrollView>
        </ScreenLayout>
    );
};

export default PendingDeliveries;
