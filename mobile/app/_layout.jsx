import { HeaderShownContext } from "@react-navigation/elements";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import SafeScreen from "./components/SafeScreen";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function RootLayout() {
  const insets = useSafeAreaInsets();
  return (
    <SafeScreen>
      <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
        <Stack screenOptions={{ headerShown: true }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </View>
      <StatusBar style="dark"/>
    </SafeScreen>

  );
}
