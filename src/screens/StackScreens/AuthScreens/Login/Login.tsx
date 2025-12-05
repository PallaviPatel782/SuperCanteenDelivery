import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import KeyboardAvoidWrapper from '../../../../components/KeyboardAvoidWrapper';
import CustomButton from '../../../../components/CustomButton';
import GlobalStyles from '../../../../utils/GlobalStyles/GlobalStyles';
import styles from './styles';
import { SH } from '../../../../utils/Responsiveness/Dimensions';
import Colors from '../../../../utils/Colors/Colors';
import { Lock, Eye, EyeOff } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LOGIN_API } from '../../../../utils/apis/BASE_URL';
import { showMessage } from "react-native-flash-message";

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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleContinue = async () => {
    if (contact.length !== 10 || password.length < 4) {
      showMessage({
        message: "Please enter valid login details",
        type: "danger",
        icon: "danger",
      });
      return;
    }

    try {
      setLoading(true);

      const payload = {
        contactNo: contact,
        password: password,
      };

      console.log("payload", payload);
      console.log("LOGIN_API",LOGIN_API);
      const res = await axios.post(LOGIN_API, payload);
      console.log("res.data", res.data);

      if (res.data?.success) {
        await AsyncStorage.setItem("authToken", res.data.token);
        await AsyncStorage.setItem("userInfo", JSON.stringify(res.data.deliveryBoy));

        showMessage({
          message: "Login Successful 🎉",
          description: `Welcome back ${res.data.deliveryBoy.name}`,
          type: "success",
          icon: "success",
        });

        navigation.navigate("MainTabs");
      } else {
        showMessage({
          message: "Login Failed",
          description: res.data?.message || "Something went wrong",
          type: "danger",
          icon: "danger",
        });
      }
    } catch (error: any) {
      console.log("LOGIN ERROR", error?.response?.data);
      showMessage({
        message: "Login Error",
        description: error?.response?.data?.message || "Something went wrong",
        type: "danger",
        icon: "danger",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <KeyboardAvoidWrapper
      bottomComponent={
        <View style={{ marginBottom: SH(200) }}>
          <CustomButton
            title={loading ? "Please wait..." : "Login"}
            onPress={handleContinue}
            Icon={<Lock size={18} color="#fff" />}
            disabled={loading}
          />
        </View>
      }
    >
      <View style={styles.container}>
        <Image
          source={require('../../../../assets/Images/DeliveryBackgroundImage1.jpg')}
          style={styles.topImage}
          resizeMode="contain"
        />

        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back 👋</Text>
          <Text style={styles.subtitle}>Access your delivery dashboard by logging in</Text>

          {/* Mobile */}
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

          {/* Password */}
          <View style={GlobalStyles.textInputContainer}>
            <Text style={GlobalStyles.inputLabel}>Password</Text>

            <View style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: Colors.light_gray,
              borderRadius: 8,
              paddingHorizontal: 10
            }}>
              <TextInput
                style={[GlobalStyles.textInput, { flex: 1, borderWidth: 0 }]}
                placeholder="Enter your password"
                placeholderTextColor={Colors.light_gray}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
                {showPassword ? (
                  <Eye size={20} color={Colors.darkGray} />
                ) : (
                  <EyeOff size={20} color={Colors.darkGray} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.forgotContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotLink}>Forgot password ?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidWrapper>
  );
};

export default Login;
