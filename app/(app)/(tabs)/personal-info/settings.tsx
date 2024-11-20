import React from "react";
import { View, ScrollView, Switch, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/Text";
import {
  ArrowLeft,
  Bell,
  Globe,
  Lock,
  ChevronRight,
} from "lucide-react-native";

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
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="p-4">
          <View className="flex-row items-center mb-6">
            <Pressable onPress={() => console.log("Go back")}>
              <ArrowLeft size={24} color="#000" />
            </Pressable>
            <Text className="text-lg font-semibold ml-4">Settings</Text>
          </View>

          <View className="space-y-4">
            {settingItems.map((item, index) => (
              <Pressable
                key={index}
                onPress={item.onPress}
                className="flex-row items-center justify-between py-2"
              >
                <View className="flex-row items-center">
                  {item.icon}
                  <Text className="ml-3 text-base">{item.title}</Text>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
