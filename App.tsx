import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { useEffect } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import Colors from "./src/utils/Colors/Colors";

export default function App() {
  useEffect(() => {
    StatusBar.setBackgroundColor(Colors.primary);
    StatusBar.setBarStyle('light-content');
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
      <AppNavigator />
    </SafeAreaView>
  );
}