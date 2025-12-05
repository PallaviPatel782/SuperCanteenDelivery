import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { useEffect } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import Colors from "./src/utils/Colors/Colors";
import FlashMessage from "react-native-flash-message";
import store from "./src/redux/store";
import { Provider } from "react-redux";

function MainApp() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

      <AppNavigator />

      <FlashMessage
        position="bottom"
        style={{ marginBottom: insets.bottom }}
        floating
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <MainApp />
      </SafeAreaProvider>
    </Provider>
  );
}
