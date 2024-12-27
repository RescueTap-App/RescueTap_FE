"use client";

import React from "react";
import {
  View,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/Text";
import { ArrowLeft, User, Shield, Phone, Settings } from "lucide-react-native";
import { useRouter } from "expo-router";
import { driverService } from "@/services/driver-service";
import { ActiveRideCard } from "@/components/RideCard";

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
  const router = useRouter();
  const { data, error, isLoading } = driverService.getAllDrivers();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="p-4">
          <View className="flex-row items-center mb-6">
            <Pressable
              onPress={() =>
                router.canGoBack()
                  ? router.back()
                  : router.push("/(app)/(tabs)")
              }
            >
              <ArrowLeft size={24} color="#000" />
            </Pressable>
            <Text className="text-lg font-semibold ml-4">
              Vehicle Safety History
            </Text>
          </View>

          <View className="flex gap-4 mb-6">
            {isLoading && <ActivityIndicator size={32} />}
            {!isLoading && data!.length > 0 && (
              <>
                {data?.map((driver) => (
                  <ActiveRideCard
                    status={driver.status}
                    key={driver._id}
                    cluster={driver.vehicle}
                    vehicleName={driver.vehicle}
                    vehicleImage={driver.driverName}
                    licensePlate={driver.plateNumber}
                    driverId={driver._id}
                    driverImage={driver.image}
                    driverName={driver.driverName}
                  />
                ))}
              </>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      {/* <View className="flex-row items-center justify-around border-t border-neutral-200 py-2">
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
      </View> */}
    </SafeAreaView>
  );
}
