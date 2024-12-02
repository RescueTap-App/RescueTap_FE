import React from "react";
import { View, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { Text } from "@/components/ui/Text";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

export default function SetNewPasswordScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async (data: NewPasswordFormData) => {
    try {
      // Call your API to reset password
      // Then navigate to login
      router.push("/(auth)/login");
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
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center"
          >
            <ChevronLeft size={24} color="#000" />
          </Pressable>

          <View className="mb-8 mt-4">
            <Text className="text-2xl font-bold mb-2">Set a new password</Text>
            <Text className="text-neutral-600">
              Create an new password. Ensure it differs from previous ones for
              security
            </Text>
          </View>

          <View className="flex gap-4">
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <InputField
                  label="Password"
                  placeholder="Enter new password"
                  isPassword
                  onChangeText={onChange}
                  value={value}
                  error={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <InputField
                  label="Confirm Password"
                  placeholder="Re-enter new password"
                  isPassword
                  onChangeText={onChange}
                  value={value}
                  error={errors.confirmPassword?.message}
                />
              )}
            />
          </View>

          <View className="mt-auto mb-6">
            <Button
              size="lg"
              disabled={!isValid || !password || !confirmPassword}
              onPress={handleSubmit(onSubmit)}
            >
              Update password
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
