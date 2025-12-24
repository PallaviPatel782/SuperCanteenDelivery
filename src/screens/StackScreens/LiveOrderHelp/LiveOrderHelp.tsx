import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Header';
import ScreenLayout from '../../../components/ScreenLayout';
import GlobalStyles from '../../../utils/GlobalStyles/GlobalStyles';
import styles from './styles';
import Colors from '../../../utils/Colors/Colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { customerUnavailableOrder } from '../../../redux/slices/assignedOrdersSlice';
import { useDispatch } from 'react-redux';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { showMessage } from 'react-native-flash-message';

type LiveOrderHelpProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "LiveOrderHelp"
  >;
  route: RouteProp<RootStackParamList, "LiveOrderHelp">;
};


const REASONS_MAP: Record<string, string> = {
  customerNotReachable: "Customer not reachable / answering",
  wrongAddress: "Customer address / location is wrong",
};

const LiveOrderHelp: React.FC<LiveOrderHelpProps> = ({ navigation, route }) => {
  const dispatch = useDispatch<any>();
  const { OrderData } = route.params || {};
  const [loading, setLoading] = useState<boolean>(false);

  const handleSelect = async (reasonKey: string) => {
    const reasonText = REASONS_MAP[reasonKey];

    try {
      setLoading(true);

      const result = await dispatch(
        customerUnavailableOrder({
          orderId: OrderData._id,
          reason: reasonText,
        })
      );

      setLoading(false);

      if (customerUnavailableOrder.fulfilled.match(result)) {
        showMessage({
          message: result.payload.message || "Customer marked as unavailable",
          type: "success",
          icon: "success",
        });

        navigation.navigate("NotDelivered", {
          OrderData: result.payload.order || result.payload,
          reason: reasonText,
        });
      } else if (customerUnavailableOrder.rejected.match(result)) {
        showMessage({
          message: result.payload || "Failed to send request",
          type: "danger",
          icon: "danger",
        });
      }
    } catch (error) {
      setLoading(false);
      showMessage({
        message: "Something went wrong",
        type: "danger",
        icon: "danger",
      });
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
            onPress={() => handleSelect("customerNotReachable")}
          >
            <Text style={styles.listText}>
              Customer not reachable / answering
            </Text>
            <Icon name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleSelect("wrongAddress")}
          >
            <Text style={styles.listText}>
              Customer address / location is wrong
            </Text>
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
