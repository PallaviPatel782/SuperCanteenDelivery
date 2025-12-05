import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, View } from 'react-native';
import Colors from '../utils/Colors/Colors';
import { SH, SW, SF } from '../utils/Responsiveness/Dimensions';

type CustomButtonProps<Screen extends string = string> = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  Icon?: React.ReactNode;
  disabled?: boolean;
};

const CustomButton = <Screen extends string>({
  title,
  onPress,
  Icon,
  disabled,
}: CustomButtonProps<Screen>) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && { opacity: 0.6 }]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <View style={styles.content}>
        {Icon && <View style={styles.iconContainer}>{Icon}</View>}
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: SH(12),
    paddingHorizontal: SW(5),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    marginVertical: SH(10),
    marginBottom: SH(25)
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: SW(8),
  },
  text: {
    color: '#ffffff',
    fontSize: SF(15),
    fontFamily: 'Ubuntu-Regular',
  },
});

export default CustomButton;
