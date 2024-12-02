import React from "react";
import { View, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { Text } from "@/components/ui/Text";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const forgotPasswordSchema = z.object({
  phoneNumber: z
    .string()
    .min(11, "Phone number must be 11 digits")
    .max(11, "Phone number must be 11 digits")
    .regex(/^[0-9]+$/, "Phone number must only contain numbers"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      phoneNumber: "",
    },
    mode: "onChange",
  });

  const phoneNumber = watch("phoneNumber");

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // Call your API to initiate password reset
      // For now, we'll just navigate to OTP screen
      router.push("/(auth)/forget-password/otp");
    } catch (error) {
      console.error("Password reset error:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="p-6 flex-1">
          <View className="mb-8">
            <Text className="text-2xl font-bold mb-2">Forgot Password</Text>
            <Text className="text-neutral-600">
              Enter your registered phone number to reset your password
            </Text>
          </View>

          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Phone No."
                placeholder="Enter your registered phone number"
                keyboardType="phone-pad"
                onChangeText={onChange}
                value={value}
                error={errors.phoneNumber?.message}
              />
            )}
          />

          <View className="mt-auto mb-6">
            <Button
              size="lg"
              disabled={!isValid || !phoneNumber}
              onPress={handleSubmit(onSubmit)}
            >
              Reset password
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
