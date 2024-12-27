import { Stack, usePathname, useRouter } from "expo-router";
import React from "react";

export default function Layout() {
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    if (pathname === "/(app)/(tabs)/personal-info") {
      // Redirect to the index page when navigating to the personal-info tab
      router.replace("/(app)/(tabs)/personal-info/index");
    }
  }, [pathname]);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="emergency-contact/index" />
      <Stack.Screen name="emergency-contact/[contactId]" />
      <Stack.Screen name="emergency-contact/add-contact" />
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="vehicle-history" />
    </Stack>
  );
}
