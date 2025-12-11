import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import ScreenLayout from '../../../components/ScreenLayout';
import { SH, SW } from '../../../utils/Responsiveness/Dimensions';
import Colors from '../../../utils/Colors/Colors';
import { Package, CheckCircle, UserCheck2Icon, MapPin } from 'lucide-react-native';
import styles from './styles';
import Header from '../../../components/Header';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

const PendingDeliveries: React.FC<Props> = ({ navigation }) => {

    const { data: orders = [] } = useSelector((state: RootState) => state.assignedOrders);

    const pendingOrders = orders.filter(o =>
        o.deliveryStatus === 'Assigned' &&
        (o.status === 'Awaited' || o.status === 'Pending')
    );

    const renderOrderCard = ({ item }: any) => {
        const ribbonStyles = {
            bg: "#faf1d1ff",
            text: "#FACC15",
            icon: "#FACC15",
        };

        return (
            <TouchableOpacity
                style={styles.cardWrapper}
                onPress={() => navigation.navigate('DropOrder', { OrderData: item })}
            >
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

                    {/* Customer Name */}
                    <View style={[styles.row, { marginTop: SH(6) }]}>
                        <UserCheck2Icon size={12} color={Colors.primary} style={{ marginRight: SW(6) }} />
                        <Text style={styles.customerName}>{item.shippingAddress.name}</Text>
                    </View>

                    {/* Address */}
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

    return (
        <ScreenLayout>
            <Header
                showBack={true}
                title="Pending Deliveries"
            />

            <ScrollView contentContainerStyle={{ padding: SW(10) }}>
                <FlatList
                    data={pendingOrders}
                    keyExtractor={(item) => item._id}
                    renderItem={renderOrderCard}
                    scrollEnabled={false}
                    contentContainerStyle={{ marginTop: SH(10), paddingBottom: SH(20) }}
                />
            </ScrollView>
        </ScreenLayout>
    );
};

export default PendingDeliveries;
