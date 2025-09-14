import { Stack } from "expo-router";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navbar from "../../components/Navbar";

export default function AppLayout() {
  return (
    <GestureHandlerRootView>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </GestureHandlerRootView>
  );
}
