import "../global.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";
import { AuthProvider } from "@/components/AuthContext";
import { SWRConfig } from "swr";
import { RootLayoutNav } from "@/components/RootLayoutNav";
import { fetcher } from "@/lib/fetcher";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <SWRConfig
        value={{
          fetcher,
          provider: () => new Map(),
          isOnline() {
            return true;
          },
          isVisible() {
            return true;
          },
          initFocus(callback) {
            // Implement focus detection
          },
          initReconnect(callback) {
            // Implement reconnect detection
          },
          onError: (error) => {
            console.error("SWR Error:", error);
          },
        }}
      >
        <RootLayoutNav />
        <StatusBar style="auto" />
      </SWRConfig>
    </AuthProvider>
  );
}
