import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import KeyboardAvoidWrapper from '../../../../components/KeyboardAvoidWrapper';
import CustomButton from '../../../../components/CustomButton';
import GlobalStyles from '../../../../utils/GlobalStyles/GlobalStyles';
import styles from './styles';
import { SH } from '../../../../utils/Responsiveness/Dimensions';
import Colors from '../../../../utils/Colors/Colors';
import { Lock, Eye, EyeOff } from 'lucide-react-native';
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../../redux/slices/authSlice';
import { RootState, AppDispatch } from '../../../../redux/store';

type RootStackParamList = {
  MainTabs: undefined;
  ForgotPassword: undefined;
};

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [contact, setContact] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleContinue = async () => {
    if (contact.length !== 10 || password.length < 4) {
      showMessage({
        message: "Please enter valid login details",
        type: "danger",
        icon: "danger",
      });
      return;
    }

    const result = await dispatch(
      loginUser({ contactNo: contact, password })
    );

    if (loginUser.fulfilled.match(result)) {
      showMessage({
        message: "Login Successful 🎉",
        description: `Welcome back ${result.payload.user.name}`,
        type: "success",
        icon: "success",
      });

      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });
    } else {
      showMessage({
        message: "Login Failed",
        description: result.payload as string,
        type: "danger",
        icon: "danger",
      });
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
          resizeMode="cover"
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
