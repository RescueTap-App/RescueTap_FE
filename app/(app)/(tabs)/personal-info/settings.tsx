import React from "react";
import { View, ScrollView, Switch, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Bell,
  Globe,
  Lock,
  ChevronRight,
} from "lucide-react-native";
import { router } from "expo-router";

interface SettingItem {
  icon: React.ReactNode;
  title: string;
  type: "toggle" | "link";
  value?: boolean;
  onPress?: () => void;
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [theme, setTheme] = React.useState(false);

  const settingItems: SettingItem[] = [
    {
      icon: <Bell size={24} color="#5E5E5E" />,
      title: "Notifications",
      type: "toggle",
      value: notifications,
      onPress: () => setNotifications(!notifications),
    },
    {
      icon: <Globe size={24} color="#5E5E5E" />,
      title: "Language Preferences",
      type: "link",
      onPress: () => console.log("Navigate to Language Preferences"),
    },
    {
      icon: <Lock size={24} color="#5E5E5E" />,
      title: "Privacy Policy",
      type: "link",
      onPress: () => console.log("Navigate to Privacy Policy"),
    },
  ];

  return (
    <SafeAreaView className="flex-1 p-4 bg-white">
      <View className="flex-row items-center mb-12">
        <Pressable
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/(app)/(tabs)")
          }
        >
          <ArrowLeft size={24} color="#000" />
        </Pressable>
        <Text className="text-xl font-semibold ml-4 text-center flex-1">
          Settings
        </Text>
      </View>

      <View className="gap-4">
        {settingItems.map((item, index) => (
          <Pressable
            key={index}
            onPress={item.onPress}
            className="flex-row items-center h-[49px] px-3 justify-between py-2 bg-white border border-neutral-100 shadow rounded-lg"
          >
            <View className="flex-row items-center">
              {item.icon}
              <Text className="ml-3 text-lg">{item.title}</Text>
            </View>
            {item.type === "toggle" ? (
              <Switch
                value={item.value}
                onValueChange={item.onPress}
                trackColor={{ false: "#D1D5DB", true: "#005555" }}
                thumbColor={item.value ? "#FFFFFF" : "#F3F4F6"}
              />
            ) : (
              <ChevronRight size={24} color="#5E5E5E" />
            )}
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}
