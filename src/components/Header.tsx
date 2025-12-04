import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SF, SW, SH } from '../utils/Responsiveness/Dimensions';
import Colors from '../utils/Colors/Colors';
import Fonts from '../utils/Fonts/Fonts';

type HeaderProps = {
  title: string;
  showBack?: boolean;
  rightIcon?: string;
  onRightPress?: () => void;
  onBackPress?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  title,
  showBack = true,
  rightIcon,
  onRightPress,
  onBackPress,
}) => {

  const navigation = useNavigation<any>();

  const handleBackPress = () => {
    if (onBackPress) onBackPress();
    else if (navigation.canGoBack()) navigation.goBack();
    else BackHandler.exitApp();
    return true;
  };

  useEffect(() => {
    StatusBar.setBackgroundColor(Colors.primary);
    StatusBar.setBarStyle('light-content');
  }, []);

  return (
    <View style={styles.container}>

      {showBack ? (
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={SF(18)} color={'#fff'} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text style={styles.title}>{title}</Text>

      {rightIcon ? (
        <TouchableOpacity onPress={onRightPress} style={styles.rightButton}>
          <Ionicons name={rightIcon} size={SF(20)} color={'#fff'} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primary, 
    paddingHorizontal: SW(10),
    paddingVertical:SH(10),
    elevation: 5,
  },
  backButton: {
    padding: SW(6),
    borderRadius: SW(25),
    backgroundColor: '#ffffff20', 
  },
  rightButton: {
    padding: SW(6),
    borderRadius: SW(25),
    backgroundColor: '#ffffff20',
  },
  placeholder: {
    width: SW(25),
  },
  title: {
    fontSize: SF(16),
    color: '#fff',
    fontFamily: Fonts.Inter_Medium,
  },
});

export default Header;
