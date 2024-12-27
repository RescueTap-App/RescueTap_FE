import React from "react";
import { View, ScrollView, Text, Image, ActivityIndicator } from "react-native";
import { Button } from "@/components/ui/Button";
import {
  Home as HomeIcon,
  User,
  Clock,
  Settings,
  QrCode,
  Bell,
  ChevronRight,
  MessageCircle,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "@/components/ui/Avatar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "expo-router";
import { driverService } from "@/services/driver-service";
import { ActiveRideCard } from "@/components/RideCard";

interface MenuItem {
  icon: any;
  title: string;
  status: "coming" | "active";
}

const menuItems: MenuItem[] = [
  {
    icon: require("@/assets/images/Ambulance.png"),
    title: "Call an Ambulance",
    status: "coming",
  },
  {
    icon: require("@/assets/images/Microscope.png"),
    title: "Lab test",
    status: "coming",
  },
  {
    icon: require("@/assets/images/Stethoscope.png"),
    title: "See A Doctor",
    status: "coming",
  },
];

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();
  const { data: drivers, isLoading: loadingDrivers } =
    driverService.getAllDrivers();

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <View className="flex-row items-center">
          <Avatar
            size={"xl"}
            fallback={user?.firstName ?? user?.lastName}
            source="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <View className="ml-3">
            <Text className="text-base text-neutral-500">Welcome back,</Text>
            <Text className="font-semibold">
              {user?.firstName} {user?.lastName}
            </Text>
          </View>
        </View>
        <Bell size={24} color="#000" />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="pb-12">
        {/* QR Code Scanner */}
        <View className="bg-white p-6 rounded-xl mb-6 flex-row items-center gap-4 shadow-gray-500 shadow-lg border border-gray-50">
          <View className="flex max-w-[70%]">
            <Text className="font-black mb-2 text-2xl text-primary-base">
              Scan QR code
            </Text>
            <Text className="text-xl text-black mb-4">
              Scan to verify the safety of the vehicle you are onboarding.
            </Text>
            <Button
              iconLeft={
                <MaterialCommunityIcons
                  name="line-scan"
                  size={24}
                  color="white"
                />
              }
              size={"lg"}
              onPress={() => router.push("/(app)/(tabs)/qr-code-scanner")}
            >
              Scan Now
            </Button>
          </View>
          <View>
            <Image
              source={require("@/assets/images/qrcode.png")}
              resizeMode="contain"
              className="aspect-square w-full max-h-full flex-1"
            />
          </View>
        </View>

        {/* Coming Soon */}
        <Text className="font-semibold text-lg text-black mb-4">
          Coming soon!
        </Text>
        <View className="flex-row justify-between mb-6 gap-6">
          {menuItems.map((item, index) => (
            <View
              key={index}
              className="items-center justify-between bg-white border-gray-50 shadow-lg shadow-gray-500 rounded-md p-3 flex-1 gap-2"
            >
              <Image
                className="h-14 w-12 mb-2"
                resizeMode="contain"
                source={item.icon}
              />
              <Text className="text-center text-[14px]">{item.title}</Text>
            </View>
          ))}
        </View>

        {/* Active Ride */}
        <View className="flex-row items-center justify-between mb-4 mt-5">
          <Text className="font-semibold text-lg text-black">Active Ride</Text>
          <Text className="font-medium text-neutral-600">Recent Ride</Text>
        </View>

        <View className="mb-6 gap-4">
          {loadingDrivers && <ActivityIndicator />}
          {drivers?.map((driver) => (
            <ActiveRideCard
              status={driver.status}
              key={driver._id}
              cluster={driver.vehicle}
              vehicleName={driver.vehicle}
              vehicleImage={driver.driverName}
              licensePlate={driver.plateNumber}
              driverId={driver._id}
              driverImage=""
              driverName=""
            />
          ))}
        </View>
        {/* <View className="bg-neutral-50 p-4 rounded-xl mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <Image
                  source={{ uri: "/placeholder.svg?height=40&width=40" }}
                  className="w-10 h-10 rounded-lg"
                />
                <View className="flex gap-1">
                  <Text variant={"heading"} className="font-semibold">
                    Toyota get 1993 (A4)
                  </Text>
                  <Text variant={"heading"} className="text-[#005DC2]">
                    AAA546CK
                  </Text>
                  <Text variant={"subhead"} className="text-neutral-600">
                    Lagos License 4
                  </Text>
                </View>
              </View>
              <View className="bg-success/10 px-2 py-1 rounded">
                <Text className="text-success text-xs">Active</Text>
              </View>
            </View>
          </View> */}

        {/* Weekly Updates */}
        <View className="flex-row items-center justify-between mb-4 mt-5">
          <Text className="font-semibold text-lg text-black">
            Health Articles
          </Text>
          <Text className="font-medium text-neutral-600">See All</Text>
        </View>
        <View className="gap-3">
          {Array.from(Array(3)).map((_, idx) => (
            <View className="bg-neutral-50 p-4 rounded-xl" key={idx}>
              <View className="flex-row items-start">
                <Image
                  source={{ uri: "/placeholder.svg?height=80&width=80" }}
                  className="w-20 h-20 rounded-lg"
                />
                <View className="flex-1 ml-3">
                  <Text className="font-semibold mb-1">
                    QR & VIN scanning test
                  </Text>
                  <Text className="text-sm text-neutral-600 mb-2">
                    Lorem ipsum dolor sit amet consectetur. Amet mauris...
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-xs text-neutral-500">2 days ago</Text>
                    <Text className="text-xs text-neutral-500 mx-2">•</Text>
                    <Text className="text-xs text-neutral-500">5 min read</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
