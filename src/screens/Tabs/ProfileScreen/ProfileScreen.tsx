import React, { useEffect } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchProfile } from "../../../redux/slices/GetProfileSlice";
import KeyboardAvoidWrapper from "../../../components/KeyboardAvoidWrapper";
import CustomButton from "../../../components/CustomButton";
import styles from "./styles";
import { SH, SW } from "../../../utils/Responsiveness/Dimensions";
import { LogOut, Phone } from "lucide-react-native";
import { BASE_URL } from "../../../utils/apis/BASE_URL";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/AppNavigator";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationRef } from "../../../navigation/NavigationService";
import Colors from "../../../utils/Colors/Colors";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "MainTabs"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const ProfileScreen: React.FC<Props> = ({ navigation }) => {

  const dispatch = useDispatch<AppDispatch>();
  const { loading, data } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    console.log("data",data);
    dispatch(fetchProfile());
  }, []);

  if (loading || !data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

 const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("userInfo");
    showMessage({
      message: "Logged out successfully",
      type: "success",
      icon: "success",
    });
    navigationRef.current?.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  } catch (error) {
    console.log("Logout error:", error);
    showMessage({
      message: "Logout failed",
      description: "Something went wrong",
      type: "danger",
      icon: "danger",
    });
  }
};
  return (
    <KeyboardAvoidWrapper
      bottomComponent={
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: SW(5),
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
              onPress={() => navigation.navigate("ContactSupport")}
              Icon={<Phone size={18} color="#fff" />}
            />
          </View>
        </View>
      }
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image
          source={require("../../../assets/Images/DeliveryBackgroundImage.jpg")}
          style={styles.topImage}
          resizeMode="cover"
        />

        <View style={styles.card}>
          <Image
            source={
              data.profilePhoto
                ? { uri: BASE_URL + "/" + data.profilePhoto }
                : require("../../../assets/Images/user.png")
            }
            style={styles.avatar}
          />

          <View style={styles.infoCard}>
            <View style={styles.row}>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{data.name}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{data.email}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{data.contactNo}</Text>
            </View>

            {/* <View style={styles.row}>
              <Text style={styles.label}>City</Text>
              <Text style={styles.value}>{data.address?.city || "-"}</Text>
            </View> */}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidWrapper>
  );
};

export default ProfileScreen;
