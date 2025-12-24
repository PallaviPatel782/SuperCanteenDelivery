import React, { useEffect, useRef } from "react";
import { View, Animated, Image, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { SH, SW } from "../../../utils/Responsiveness/Dimensions";
import Colors from "../../../utils/Colors/Colors";
import { restoreAuth } from "../../../redux/slices/authSlice";
import { AppDispatch } from "../../../redux/store";

const LoadingScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const logoScaleAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(logoScaleAnimation, {
      toValue: 1,
      duration: 900,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      dispatch(restoreAuth());
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ scale: logoScaleAnimation }],
        }}
      >
        <Image
          source={require("../../../assets/Images/DeliveryLogo.jpeg")}
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
