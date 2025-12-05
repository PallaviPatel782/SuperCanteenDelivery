import { CommonActions, createNavigationContainerRef } from "@react-navigation/native";
import { RootStackParamList } from "./AppNavigator";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName]
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as any, params as any); 
  }
}

export function resetToAuth() {
  if (!navigationRef.isReady()) return;

  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: "Login" }],
    })
  );
}
