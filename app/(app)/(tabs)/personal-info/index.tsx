import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/Text";
import { Link } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Avatar } from "@/components/ui/Avatar";
import { View } from "react-native";
import { Button } from "@/components/ui/Button";
import { authService } from "@/services/auth-service";
import { useAuth } from "@/components/AuthContext";
export default function PersonalInfoScreen() {
  const { logout } = useAuth();
  return (
    <SafeAreaView className="flex-1 bg-white p-3 mb-6">
      <View className="p-4">
        <Avatar size={"2xl"} />
        <Text className="text-lg font-semibold p-4 text-center">
          Femi Stephen
        </Text>
      </View>
      <View className="flex-1"></View>
      <Button
        size="lg"
        onPress={async () => {
          try {
            await logout();
          } catch (error) {
            console.error("Error logging out: ", error);
          }
        }}
      >
        Log out
      </Button>
      {/* <Link href="/(app)" asChild>
        <Text className="text-lg font-semibold p-4 flex-row items-center">
          <ChevronLeft size={24} color="#000" />
          Personal Information
        </Text>
      </Link> */}
    </SafeAreaView>
  );
}
