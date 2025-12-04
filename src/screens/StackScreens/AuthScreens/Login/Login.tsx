import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import KeyboardAvoidWrapper from '../../../../components/KeyboardAvoidWrapper';
import CustomButton from '../../../../components/CustomButton';
import GlobalStyles from '../../../../utils/GlobalStyles/GlobalStyles';
import styles from './styles';
import { SH } from '../../../../utils/Responsiveness/Dimensions';
import Colors from '../../../../utils/Colors/Colors';
import { Lock } from 'lucide-react-native';

type RootStackParamList = {
  MainTabs: undefined;
  ForgotPassword: undefined;
};

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [contact, setContact] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleContinue = () => {
    // if (contact.length === 10 && password.length >= 4) {
    //   navigation.navigate('MainTabs');
    // } else {
    //   Alert.alert('Please enter valid login details');
    // }
    navigation.navigate('MainTabs');
  };

  return (
    <KeyboardAvoidWrapper
      bottomComponent={<View style={{ marginBottom: SH(100) }}>
        <CustomButton
          title="Login"
          onPress={handleContinue}
          Icon={<Lock size={18} color="#fff" />}
        />
      </View>}
    >
      <View style={styles.container}>
        <Image
          source={require('../../../../assets/Images/DeliveryBackgroundImage1.jpg')}
          style={styles.topImage}
          resizeMode="contain"
        />
        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back 👋</Text>

          <Text style={styles.subtitle}>
            Access your delivery dashboard by logging in
          </Text>
          <View style={GlobalStyles.textInputContainer}>
            <Text style={GlobalStyles.inputLabel}>Mobile Number</Text>

            <TextInput
              style={GlobalStyles.textInput}
              placeholder="Enter your phone number"
              placeholderTextColor={Colors.light_gray}
              keyboardType="phone-pad"
              value={contact}
              onChangeText={setContact}
              maxLength={10}
            />
          </View>
          <View style={GlobalStyles.textInputContainer}>
            <Text style={GlobalStyles.inputLabel}>Password</Text>

            <TextInput
              style={GlobalStyles.textInput}
              placeholder="Enter your password"
              placeholderTextColor={Colors.light_gray}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.forgotContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotLink}>Forgot password ? </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidWrapper>
  );
};

export default Login;
