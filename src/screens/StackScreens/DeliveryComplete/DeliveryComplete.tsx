import { Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import ScreenLayout from '../../../components/ScreenLayout';
import styles from './styles';

const DeliveryComplete = ({ route, navigation }: any) => {

  return (
    <ScreenLayout>
      <View style={styles.mainContainer}>
        <View style={styles.topSection} />
        <View style={styles.bottomSection} />
        <View style={styles.successCard}>
          <View style={styles.imageWrapper}>
            <Image
              source={require('../../../assets/Images/WithdrawSuccessfully.png')}
              style={styles.successImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.confirmationText}>Great job! Delivery complete</Text>
        </View>
        <TouchableOpacity
          style={styles.deliverButton}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Text style={styles.deliverButtonText}>Get next order</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

export default DeliveryComplete;
