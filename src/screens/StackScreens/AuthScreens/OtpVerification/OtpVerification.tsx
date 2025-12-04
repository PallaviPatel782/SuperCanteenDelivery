import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import KeyboardAvoidWrapper from '../../../../components/KeyboardAvoidWrapper';
import Header from '../../../../components/Header';
import CustomButton from '../../../../components/CustomButton';
import Colors from '../../../../utils/Colors/Colors';
import styles from './styles';
import GlobalStyles from '../../../../utils/GlobalStyles/GlobalStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SH, SW } from '../../../../utils/Responsiveness/Dimensions';

const OtpVerification = ({ navigation }: any) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [timer, setTimer] = useState(45);

  const refs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) refs.current[index + 1]?.focus();
      if (!value && index > 0) refs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const code = otp.join('');
    console.log("OTP:", code);
    navigation.navigate("MainTabs");
  };

  return (
    <KeyboardAvoidWrapper
      bottomComponent={<CustomButton title="Continue" onPress={handleSubmit} />}
    >
      <View style={GlobalStyles.container}>
        <Header title="OTP Verification" />

        <View style={styles.content}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.title}>Verification Code</Text>
            <FontAwesome
              name="check-circle"
              color={Colors.green}
              size={25}
              style={{ marginLeft: SW(8), marginBottom: SH(10) }}
            />
          </View>

          <Text style={styles.subtitle}>We have sent the verification code to your mobile number.</Text>

          <View style={styles.otpContainer}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                ref={el => {
                  refs.current[index] = el;
                }}
                value={value}
                keyboardType="number-pad"
                maxLength={1}
                onChangeText={text => handleChange(index, text)}
                style={[
                  styles.otpBox,
                  { borderColor: activeIndex === index ? "green" : '#ccc' },
                ]}
                textAlign="center"
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(null)}
              />
            ))}
          </View>

          <Text style={{ marginTop: 20, color: Colors.darkGray }}>
            Resend OTP in 0:{timer < 10 ? `0${timer}` : timer}
          </Text>
        </View>
      </View>
    </KeyboardAvoidWrapper>
  );
};

export default OtpVerification;
