"use client";

import React from "react";
import { View, ScrollView, Image, Pressable } from "react-native";
import { Text } from "@/components/ui/Text";
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

interface MenuItem {
  icon: React.ReactNode;
  title: string;
  status: "coming" | "active";
}

const menuItems: MenuItem[] = [
  {
    icon: <Bell size={24} color="#5E5E5E" />,
    title: "Notification",
    status: "coming",
  },
  {
    icon: <MessageCircle size={24} color="#5E5E5E" />,
    title: "Live chat",
    status: "coming",
  },
  {
    icon: <Clock size={24} color="#5E5E5E" />,
    title: "Get a history",
    status: "coming",
  },
];

export default function HomePage() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="p-4">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center">
              <Image
                source={{ uri: "/placeholder.svg?height=40&width=40" }}
                className="w-10 h-10 rounded-full"
              />
              <View className="ml-3">
                <Text className="text-sm text-neutral-500">Welcome back,</Text>
                <Text className="font-semibold">Femi Stephen</Text>
              </View>
            </View>
            <Bell size={24} color="#000" />
          </View>

          {/* QR Code Scanner */}
          <View className="bg-neutral-50 p-4 rounded-xl mb-6">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="font-semibold">Scan QR code</Text>
              <QrCode size={24} color="#000" />
            </View>
            <Text className="text-sm text-neutral-600 mb-4">
              Scan to verify the safety of your ride
            </Text>
            <Button onPress={() => console.log("Scan")}>Scan Now</Button>
          </View>

          {/* Coming Soon */}
          <Text className="font-semibold mb-4">Coming soon!</Text>
          <View className="flex-row justify-between mb-6">
            {menuItems.map((item, index) => (
              <View key={index} className="items-center">
                <View className="w-12 h-12 bg-neutral-100 rounded-full items-center justify-center mb-2">
                  {item.icon}
                </View>
                <Text className="text-xs text-neutral-600">{item.title}</Text>
              </View>
            ))}
          </View>

          {/* Active Ride */}
          <Text className="font-semibold mb-4">Active Ride</Text>
          <View className="bg-neutral-50 p-4 rounded-xl mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <Image
                  source={{ uri: "/placeholder.svg?height=40&width=40" }}
                  className="w-10 h-10 rounded-lg"
                />
                <View className="ml-3">
                  <Text className="font-semibold">Toyota get 1993 (A4)</Text>
                  <Text className="text-sm text-neutral-600">
                    Lagos License 4
                  </Text>
                </View>
              </View>
              <View className="bg-success/10 px-2 py-1 rounded">
                <Text className="text-success text-xs">Active</Text>
              </View>
            </View>
          </View>

          {/* Weekly Updates */}
          <Text className="font-semibold mb-4">Weekly updates</Text>
          <View className="bg-neutral-50 p-4 rounded-xl">
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
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      {/* <View className="flex-row items-center justify-around border-t border-neutral-200 py-2">
        <Pressable className="items-center">
          <HomeIcon size={24} color="#005555" />
          <Text className="text-xs text-primary-base">Home</Text>
        </Pressable>
        <Pressable className="items-center">
          <User size={24} color="#5E5E5E" />
          <Text className="text-xs text-neutral-600">Profile</Text>
        </Pressable>
        <Pressable className="items-center">
          <Clock size={24} color="#5E5E5E" />
          <Text className="text-xs text-neutral-600">History</Text>
        </Pressable>
        <Pressable className="items-center">
          <Settings size={24} color="#5E5E5E" />
          <Text className="text-xs text-neutral-600">Settings</Text>
        </Pressable>
      </View> */}
    </SafeAreaView>
  );
}
