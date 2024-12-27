import { Tabs, usePathname, useSegments } from "expo-router";
import React from "react";
import {
  View,
  Pressable,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/cn";
import {
  Home,
  Calendar,
  Bell,
  User,
  AlertCircle,
  HomeIcon,
} from "lucide-react-native";
import { FontAwesome } from "@expo/vector-icons";

const styles = StyleSheet.create({
  alertButton: {
    position: "absolute",
    top: -30,
    alignSelf: "center",
  },
  alertIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#ff0000",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
export default function TabLayout() {
  const pathname = usePathname();
  const segments = useSegments();

  const isIndexScreen = pathname === "/";
  console.log(pathname, segments[3]);
  console.log(isIndexScreen);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          // display: segments[2] == "(tabs)" ? "flex" : "none",
          height: 60,
          backgroundColor: "#fff",
        },
        tabBarActiveTintColor: "#ff0000",
        tabBarInactiveTintColor: "#aaa",
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="vehicle-history"
        options={{
          title: "Appointment",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="alert"
        options={{
          tabBarStyle: { display: segments[3] === "alert" ? "flex" : "none" },
          title: "",
          tabBarButton: (props) => (
            // @ts-ignore
            <TouchableOpacity {...props} style={styles.alertButton}>
              <View style={styles.alertIconContainer}>
                <Image
                  source={require("@/assets/images/alert-button.png")}
                  width={60}
                  height={60}
                />
                {/* <FontAwesome size={32} name="bell" color="#fff" /> */}
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="qr-code-scanner"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="bell-o" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="personal-info"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />

      {/* Hidden routes */}
      {/* <Tabs.Screen
        name="personal-info/emergency-contact/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="personal-info/emergency-contact/add-contact"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="personal-info/emergency-contact/[contactId]"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="personal-info/settings"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="personal-info/vehicle-history"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="personal-info/profile"
        options={{
          href: null,
        }}
      /> */}

      {/* <Tabs.Screen
        name="qr-code-scanner"
        options={{
          href: null,
        }}
      /> */}
      {/* <Tabs.Screen
        name="vehicle-history"
        options={{
          href: null,
        }}
      /> */}
    </Tabs>
  );
}
