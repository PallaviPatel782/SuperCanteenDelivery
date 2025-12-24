import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import KeyboardAvoidWrapper from '../../../../components/KeyboardAvoidWrapper';
import CustomButton from '../../../../components/CustomButton';
import GlobalStyles from '../../../../utils/GlobalStyles/GlobalStyles';
import styles from './styles';
import { SH } from '../../../../utils/Responsiveness/Dimensions';
import Colors from '../../../../utils/Colors/Colors';
import { Lock, Send } from 'lucide-react-native';

type RootStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
};

type ForgotProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const ForgotPassword: React.FC<ForgotProps> = ({ navigation }) => {
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [newPass, setNewPass] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = () => {
    if (contact.length !== 10) {
      Alert.alert('Enter valid mobile number');
      return;
    }
    setOtpSent(true);
  };

  const handleResetPassword = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidWrapper
      bottomComponent={
        <View style={{ marginBottom: SH(100) }}>
          <CustomButton
            title="Reset Password"
            onPress={handleResetPassword}
            Icon={<Lock size={18} color="#fff" />}
          />
        </View>
      }
    >
      <View style={styles.container}>
        {/* TOP IMAGE */}
        <Image
          source={require('../../../../assets/Images/DeliveryBackgroundImage1.jpg')}
          style={styles.topImage}
          resizeMode="cover"
        />

        <View style={styles.card}>
          <Text style={styles.title}>Forgot Password 🔒</Text>

          <Text style={styles.subtitle}>
            Reset your delivery dashboard password
          </Text>
          <View style={GlobalStyles.textInputContainer}>
            <Text style={GlobalStyles.inputLabel}>Mobile Number</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={[GlobalStyles.textInput, { flex: 1 }]}
                placeholder="Enter phone number"
                placeholderTextColor={Colors.light_gray}
                keyboardType="phone-pad"
                value={contact}
                maxLength={10}
                onChangeText={setContact}
              />

              <TouchableOpacity
                onPress={handleSendOtp}
                style={{
                  paddingVertical: SH(7),
                  paddingHorizontal: SH(14),
                  backgroundColor: Colors.dark_green,
                  borderRadius: SH(6),
                  marginLeft: SH(10),
                }}
              >
                <Text style={styles.buttonText}>Send Otp </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={GlobalStyles.textInputContainer}>
            <Text style={GlobalStyles.inputLabel}>Enter OTP</Text>
            <TextInput
              style={GlobalStyles.textInput}
              placeholder="Enter OTP"
              keyboardType="number-pad"
              placeholderTextColor={Colors.light_gray}
              maxLength={6}
              value={otp}
              onChangeText={setOtp}
            />
          </View>
          <View style={GlobalStyles.textInputContainer}>
            <Text style={GlobalStyles.inputLabel}>New Password</Text>
            <TextInput
              style={GlobalStyles.textInput}
              placeholder="Enter new password"
              placeholderTextColor={Colors.light_gray}
              secureTextEntry
              value={newPass}
              onChangeText={setNewPass}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidWrapper>
  );
};

export default ForgotPassword;
