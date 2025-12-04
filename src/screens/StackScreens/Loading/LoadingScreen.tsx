import React, { useEffect, useRef } from 'react';
import { View, Animated, Image, StyleSheet } from 'react-native';
import { SH, SW } from '../../../utils/Responsiveness/Dimensions';
import Colors from '../../../utils/Colors/Colors';

const LoadingScreen = ({ navigation }: any) => {
  const logoScaleAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(logoScaleAnimation, {
      toValue: 1,     
      duration: 900,  
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [logoScaleAnimation, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: logoScaleAnimation }],
          },
        ]}
      >
        <Image
          source={require('../../../assets/Images/DeliveryLogo.jpeg')}
          style={styles.logo}
        />
      </Animated.View>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: SW(200),
    height: SW(200),
    resizeMode: 'contain',
  },
});
