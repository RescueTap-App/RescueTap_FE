import React from "react";
import { View, ScrollView, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  ChevronRight,
  User,
  Shield,
  Phone,
  Settings,
} from "lucide-react-native";
import { Avatar } from "@/components/ui/Avatar";
import { useRouter } from "expo-router";
import { useAuth } from "@/components/AuthContext";

const personalInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

type PersonalInfoData = z.infer<typeof personalInfoSchema>;

export default function PersonalInfoScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: user?.firstName ?? undefined,
      lastName: user?.lastName ?? undefined,
      email: user?.email ?? undefined,
      phoneNumber: user?.phoneNumber ?? undefined,
      address: "123 Main St, Lagos, Nigeria",
    },
  });

  const onSubmit = (data: PersonalInfoData) => {
    console.log(data);
    // Handle form submission
    router.replace("/(app)/(tabs)/personal-info");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="p-4">
          <View className="flex-row items-center mb-6">
            <Pressable onPress={() => router.back()}>
              <ArrowLeft size={24} color="#000" />
            </Pressable>
            <Text className="text-xl font-semibold ml-4">
              Personal Information
            </Text>
          </View>

          <View className="items-center mb-6 gap-4">
            <Avatar
              source=""
              size={"3xl"}
              fallback={user?.firstName ?? user?.lastName}
            />
            <Text className="text-xl font-semibold">
              {user?.firstName} {user?.lastName}
            </Text>
          </View>

          <View className="mb-6 flex gap-4">
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, value } }) => (
                <InputField
                  readOnly
                  label="First Name"
                  value={value}
                  onChangeText={onChange}
                  error={errors.firstName?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, value } }) => (
                <InputField
                  readOnly
                  label="Last Name"
                  value={value}
                  onChangeText={onChange}
                  error={errors.lastName?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <InputField
                  readOnly
                  label="Email Address"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  error={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, value } }) => (
                <InputField
                  readOnly
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
              name="address"
              render={({ field: { onChange, value } }) => (
                <InputField
                  readOnly
                  label="Address"
                  value={value}
                  onChangeText={onChange}
                  error={errors.address?.message}
                />
              )}
            />
          </View>

          {/* <Button size="lg" onPress={handleSubmit(onSubmit)}>
            Save me
          </Button> */}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}

      {/* <View className="flex-row items-center justify-around border-t border-neutral-200 py-2">
        <Pressable className="items-center">
          <User size={24} color="#005555" />
          <Text className="text-xs text-primary-base">Profile</Text>
        </Pressable>
        <Pressable className="items-center">
          <Shield size={24} color="#5E5E5E" />
          <Text className="text-xs text-neutral-600">Vehicle Safety</Text>
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
