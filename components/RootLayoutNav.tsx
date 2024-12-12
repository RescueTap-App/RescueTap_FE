import { useAuth } from "./AuthContext";
import { Stack, useRouter, useSegments } from "expo-router";
import React from "react";

export function RootLayoutNav() {
  const segments = useSegments();
  const router = useRouter();
  const { hasSeenOnboarding, isLoading, user } = useAuth();

  React.useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inAppGroup = segments[0] === "(app)";

    if (!hasSeenOnboarding && !inAuthGroup) {
      router.replace("/(auth)/onboarding");
    } else if (user && inAuthGroup) {
      router.replace("/(app)/(tabs)");
    } else if (!user && inAppGroup) {
      router.replace("/(auth)/login");
    } else {
      router.replace("/+not-found");
    }
  }, [user, segments, isLoading, hasSeenOnboarding]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/onboarding" options={{ headerShown: false }} />
      <Stack.Screen
        name="(auth)/forget-password/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(auth)/forget-password/otp"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(auth)/forget-password/set-new-password"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(auth)/signup/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="(auth)/signup/otp" options={{ headerShown: false }} />
      <Stack.Screen name="(app)/(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="privacy-policy" options={{ headerShown: false }} />
      <Stack.Screen
        name="terms-and-condition"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
