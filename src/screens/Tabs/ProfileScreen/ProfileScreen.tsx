import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import KeyboardAvoidWrapper from '../../../components/KeyboardAvoidWrapper';
import CustomButton from '../../../components/CustomButton';
import styles from './styles';
import { SH, SW } from '../../../utils/Responsiveness/Dimensions';
import { LogOut, Phone } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/AppNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const ProfileScreen: React.FC<Props> = ({ navigation }) => {

  const handleLogout = () => {
    console.log("Logout tapped");
  };

  return (
    <KeyboardAvoidWrapper
      bottomComponent={
        <View
          style={{
            marginBottom: SH(10),
            flexDirection: "row",
            justifyContent: "space-between",
            gap: SW(5)
          }}
        >
          <View style={{ flex: 1 }}>
            <CustomButton
              title="Logout"
              onPress={handleLogout}
              Icon={<LogOut size={18} color="#fff" />}
            />
          </View>

          <View style={{ flex: 1 }}>
            <CustomButton
              title="Contact Support"
              onPress={() => navigation.navigate('ContactSupport')}
              Icon={<Phone size={18} color="#fff" />}
            />
          </View>
        </View>
      }

    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../../assets/Images/DeliveryBackgroundImage.jpg')}
          style={styles.topImage}
          resizeMode="cover"
        />
        <View style={styles.card}>
          <Image
            source={require('../../../assets/Images/user.png')}
            style={styles.avatar}
          />
          <View style={styles.infoCard}>

            <View style={styles.row}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>John Doe</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>john.doe@example.com</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>9876543210</Text>
            </View>

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidWrapper>
  );
};

export default ProfileScreen;
