import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import {
  Settings,
  ChevronRight,
  User,
  Snowflake,
  IdCard,
} from "lucide-react-native";
import { Avatar } from "@/components/ui/Avatar";
import { View, Text, Pressable } from "react-native";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/components/AuthContext";
import { colors } from "@/constants/Colors";
export default function PersonalInfoScreen() {
  const { logout, user } = useAuth();
  return (
    <SafeAreaView className="flex-1 bg-white p-3">
      <View className="p-4 items-center justify-center mt-12">
        <Avatar
          size={"3xl"}
          fallback={user?.firstName}
          source={
            "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
        <Text className="text-3xl font-semibold p-4 text-center capitalize">
          {user?.firstName} {user?.lastName}
        </Text>
      </View>

      <View className="flex-1 gap-2 px-4">
        <Link href={"/(app)/(tabs)/personal-info/profile"} asChild>
          <Pressable className="flex items-center flex-row gap-4 border-b border-b-neutral-400 py-4 text-black">
            <User size={24} color={"gray"} />
            <Text className="text-[18px] flex-1">Personal Info</Text>
            <ChevronRight size={24} color={colors.error} />
          </Pressable>
        </Link>

        <Link href={"/(app)/(tabs)/personal-info/emergency-contact"} asChild>
          <Pressable className="flex items-center flex-row gap-4 border-b border-b-neutral-400 py-4 text-black">
            <Snowflake size={24} color={"gray"} />
            <Text className="text-[18px] flex-1">Emergency Contacts</Text>
            <ChevronRight size={24} color={colors.error} />
          </Pressable>
        </Link>

        <Link href={"/(app)/(tabs)/personal-info/vehicle-history"} asChild>
          <Pressable className="flex items-center flex-row gap-4 border-b border-b-neutral-400 py-4 text-black">
            <IdCard size={24} color={"gray"} />
            <Text className="text-[18px] flex-1">Vehicle Safety Hisory</Text>
            <ChevronRight size={24} color={colors.error} />
          </Pressable>
        </Link>

        <Link href={"/(app)/(tabs)/personal-info/settings"} asChild>
          <Pressable className="flex items-center flex-row gap-4 border-b border-b-neutral-400 py-4 text-black">
            <Settings size={24} color={"gray"} />
            <Text className="text-[18px] flex-1">Settings</Text>
            <ChevronRight size={24} color={colors.error} />
          </Pressable>
        </Link>
      </View>

      <View className="items-start mb-8">
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
      </View>
    </SafeAreaView>
  );
}
