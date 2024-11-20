"use client";

import React from "react";
import { View, ScrollView, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/Text";
import { ArrowLeft, User, Shield, Phone, Settings } from "lucide-react-native";

interface VehicleItem {
  image: string;
  name: string;
  licensePlate: string;
}

const vehicleItems: VehicleItem[] = [
  {
    image: "/placeholder.svg?height=60&width=60",
    name: "Toyota get 1993 (A4)",
    licensePlate: "AAA4545",
  },
  {
    image: "/placeholder.svg?height=60&width=60",
    name: "Toyota get 1993 (A4)",
    licensePlate: "AAA4545",
  },
  {
    image: "/placeholder.svg?height=60&width=60",
    name: "Toyota get 1993 (A4)",
    licensePlate: "AAA4545",
  },
  {
    image: "/placeholder.svg?height=60&width=60",
    name: "Toyota get 1993 (A4)",
    licensePlate: "AAA4545",
  },
];

export default function VehicleSafetyHistory() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="p-4">
          <View className="flex-row items-center mb-6">
            <Pressable onPress={() => console.log("Go back")}>
              <ArrowLeft size={24} color="#000" />
            </Pressable>
            <Text className="text-lg font-semibold ml-4">
              Vehicle Safety History
            </Text>
          </View>

          <View className="space-y-4">
            {vehicleItems.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => console.log(`View details of ${item.name}`)}
                className="flex-row items-center p-4 bg-neutral-50 rounded-lg"
              >
                <Image
                  source={{ uri: item.image }}
                  className="w-15 h-15 rounded-lg mr-4"
                />
                <View>
                  <Text className="font-semibold">{item.name}</Text>
                  <Text className="text-neutral-500">{item.licensePlate}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="flex-row items-center justify-around border-t border-neutral-200 py-2">
        <Pressable className="items-center">
          <User size={24} color="#5E5E5E" />
          <Text className="text-xs text-neutral-600">Profile</Text>
        </Pressable>
        <Pressable className="items-center">
          <Shield size={24} color="#005555" />
          <Text className="text-xs text-primary-base">Vehicle Safety</Text>
        </Pressable>
        <Pressable className="items-center">
          <Phone size={24} color="#5E5E5E" />
          <Text className="text-xs text-neutral-600">Emergency</Text>
        </Pressable>
        <Pressable className="items-center">
          <Settings size={24} color="#5E5E5E" />
          <Text className="text-xs text-neutral-600">Settings</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
