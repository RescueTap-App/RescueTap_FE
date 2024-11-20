import { Tabs } from "expo-router";
import React from "react";
import {
  View,
  Pressable,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  StyleSheet,
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
    top: -20,
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
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
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
        name="appointment"
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
          title: "",
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={styles.alertButton}>
              <View style={styles.alertIconContainer}>
                <FontAwesome size={32} name="bell" color="#fff" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="bell-o" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="personal-info/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />

      {/* Hidden routes */}
      <Tabs.Screen
        name="personal-info/emergency-contact"
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
        name="qr-code-scanner"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="vehicle-history"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

type CustomTabBarProps = {
  state: {
    index: number;
    routes: Array<{
      key: string;
      name: string;
    }>;
  };
  descriptors: {
    [key: string]: {
      options: {
        tabBarLabel?: string;
        title?: string;
      };
    };
  };
  navigation: {
    emit: (event: {
      type: string;
      target: string;
      canPreventDefault: boolean;
    }) => void;
    navigate: (name: string) => void;
  };
};
function CustomTabBar({ state, descriptors, navigation }: CustomTabBarProps) {
  return (
    <View style={tabBarStyle}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          // @ts-ignore
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Alert button (big red button)
        if (route.name === "alert") {
          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={alertButtonStyle}
            >
              <View style={alertButtonInnerStyle}>
                <AlertCircle size={32} color="white" />
              </View>
            </Pressable>
          );
        }

        // Regular tab buttons
        return (
          <Pressable key={route.key} onPress={onPress} style={tabItemStyle}>
            {route.name === "index" && (
              <Home size={24} color={isFocused ? "#FF331A" : "#5E5E5E"} />
            )}
            {route.name === "appointment" && (
              <Calendar size={24} color={isFocused ? "#FF331A" : "#5E5E5E"} />
            )}
            {route.name === "personal-info/index" && (
              <User size={24} color={isFocused ? "#FF331A" : "#5E5E5E"} />
            )}
            <Text
              style={[
                tabLabelStyle,
                { color: isFocused ? "#FF331A" : "#5E5E5E" },
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const tabBarStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
  borderTopWidth: 1,
  borderTopColor: "#E5E5E5",
  backgroundColor: "white",
  paddingBottom: 2,
  paddingTop: 2,
  height: 60,
};

const tabItemStyle: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
};

const alertButtonStyle: ViewStyle = {
  position: "absolute",
  top: -30,
  left: "50%",
  marginLeft: -30,
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: "#FF331A",
  justifyContent: "center",
  alignItems: "center",
  elevation: 5,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
};

const alertButtonInnerStyle: ViewStyle = {
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: "#FF331A",
  justifyContent: "center",
  alignItems: "center",
};

const tabLabelStyle: TextStyle = {
  fontSize: 12,
  marginTop: 4,
};
