import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header';
import ScreenLayout from '../../../components/ScreenLayout';
import GlobalStyles from '../../../utils/GlobalStyles/GlobalStyles';
import styles from './styles';
import Colors from '../../../utils/Colors/Colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
    LiveOrderHelp: { OrderData: any };
    NotDelivered: { OrderData: any };
};

type LiveOrderHelpProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'LiveOrderHelp'>;
    route: RouteProp<RootStackParamList, 'LiveOrderHelp'>;
};

const LiveOrderHelp: React.FC<LiveOrderHelpProps> = ({ navigation, route }) => {
    const { OrderData } = route.params;
    const [loading, setLoading] = useState<boolean>(false);

    const handleSelect = async (reasonKey: string): Promise<void> => {
        try {
            setLoading(true);
            await new Promise<void>((resolve) => setTimeout(resolve, 2000));
            setLoading(false);
            Alert.alert('Request Sent', 'Admin will check your request soon.');
            navigation.navigate('NotDelivered', { OrderData });
        } catch (err) {
            setLoading(false);
            Alert.alert('Error', 'Something went wrong.');
        }
    };

    return (
        <ScreenLayout>
            <View style={GlobalStyles.container}>
                <Header title="Live Order Help" />

                <View style={styles.innerContainer}>
                    <View style={styles.titleContainer}>
                        <View style={styles.redLine} />
                        <Text style={styles.titleText}>Live Order Help</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.listItem}
                        onPress={() => handleSelect('customerNotReachable')}
                    >
                        <Text style={styles.listText}>Customer not reachable / answering</Text>
                        <Icon name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>

                    <View style={styles.divider} />
                    <TouchableOpacity
                        style={styles.listItem}
                        onPress={() => handleSelect('wrongAddress')}
                    >
                        <Text style={styles.listText}>Customer address / location is wrong</Text>
                        <Icon name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>

                    <View style={styles.divider} />
                </View>
                <Modal visible={loading} transparent animationType="fade">
                    <View style={styles.waitOverlay}>
                        <View style={styles.waitCard}>
                            <ActivityIndicator size="large" color={Colors.dark_green} />
                            <Text style={styles.waitTitle}>Please wait...</Text>
                            <Text style={styles.waitSubtitle}>Sending your request to admin.</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScreenLayout>
    );
};

export default LiveOrderHelp;
