"use client";

import React from "react";
import { View, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/ui/Text";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  User,
  Shield,
  Phone,
  Settings,
  Plus,
} from "lucide-react-native";

const emergencyContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  relationship: z.string().min(2, "Relationship must be at least 2 characters"),
});

type EmergencyContactData = z.infer<typeof emergencyContactSchema>;

export default function EmergencyContactScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmergencyContactData>({
    resolver: zodResolver(emergencyContactSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      relationship: "",
    },
  });

  const onSubmit = (data: EmergencyContactData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="p-4">
          <View className="flex-row items-center mb-6">
            <Pressable onPress={() => console.log("Go back")}>
              <ArrowLeft size={24} color="#000" />
            </Pressable>
            <Text className="text-lg font-semibold ml-4">
              Emergency Contact
            </Text>
          </View>

          <View className="space-y-4 mb-6">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <InputField
                  label="Name"
                  value={value}
                  onChangeText={onChange}
                  error={errors.name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, value } }) => (
                <InputField
                  label="Phone Number"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                  error={errors.phoneNumber?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="relationship"
              render={({ field: { onChange, value } }) => (
                <InputField
                  label="Relationship"
                  value={value}
                  onChangeText={onChange}
                  error={errors.relationship?.message}
                />
              )}
            />
          </View>

          <Button onPress={handleSubmit(onSubmit)}>Save</Button>

          <Pressable
            onPress={() => console.log("Add another contact")}
            className="flex-row items-center justify-center mt-4"
          >
            <Plus size={20} color="#005555" />
            <Text className="text-primary-base ml-2">Add Another Contact</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      {/* <View className="flex-row items-center justify-around border-t border-neutral-200 py-2">
        <Pressable className="items-center">
          <User size={24} color="#5E5E5E" />
          <Text className="text-xs text-neutral-600">Profile</Text>
        </Pressable>
        <Pressable className="items-center">
          <Shield size={24} color="#5E5E5E" />
          <Text className="text-xs text-neutral-600">Vehicle Safety</Text>
        </Pressable>
        <Pressable className="items-center">
          <Phone size={24} color="#005555" />
          <Text className="text-xs text-primary-base">Emergency</Text>
        </Pressable>
        <Pressable className="items-center">
          <Settings size={24} color="#5E5E5E" />
          <Text className="text-xs text-neutral-600">Settings</Text>
        </Pressable>
      </View> */}
    </SafeAreaView>
  );
}
