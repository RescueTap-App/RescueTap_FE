"use client";

import React from "react";
import { View, Pressable, Image } from "react-native";
import { Text } from "@/components/ui/Text";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@/components/AuthContext";

const createAccountSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type CreateAccountFormData = z.infer<typeof createAccountSchema>;

export default function SignUpIndexScreen() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { register } = useAuth();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      acceptTerms: true, // Change to false as defualt
    },
    mode: "all",
  });

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const password = watch("password");
  const email = watch("email");
  const phoneNumber = watch("phoneNumber");

  const onSubmit = async (data: CreateAccountFormData) => {
    //TODO:  check if terms is accepted
    setIsSubmitting(true);
    try {
      await register({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
      });
      router.replace("/(auth)/signup/otp");
    } catch (error) {
      console.error("Register error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <Pressable onPress={() => console.log("Go back")} className="mb-8">
        <AntDesign name="arrowleft" size={24} color="#000" />
      </Pressable>

      <View className="items-center mb-8">
        <Image
          source={require("@/assets/images/rescue-tap-logo.png")}
          className="w-16 h-16 mb-4"
        />
        <Text className="text-2xl font-bold mb-2">Create Account</Text>
        <Text className="text-neutral-600 text-center">
          Welcome! Please enter your details correctly
        </Text>
      </View>

      <View className="flex gap-4">
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="First name"
              placeholder="John"
              onChangeText={onChange}
              value={value}
              error={errors.firstName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Last name"
              placeholder="Doe"
              onChangeText={onChange}
              value={value}
              error={errors.lastName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Phone No."
              placeholder="09035435555"
              keyboardType="phone-pad"
              onChangeText={onChange}
              value={value}
              error={errors.phoneNumber?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Email address"
              placeholder="youremail@address.com"
              onChangeText={onChange}
              value={value}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Password"
              placeholder="••••••••"
              isPassword
              onChangeText={onChange}
              value={value}
              error={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="acceptTerms"
          render={({ field: { onChange, value } }) => (
            <Checkbox
              checked={value}
              onPress={() => onChange(!value)}
              error={!!errors.acceptTerms}
              label={
                <>
                  <Text>
                    I agree that I have read the{" "}
                    <Text className="text-primary-base">
                      Terms and Conditions
                    </Text>
                  </Text>
                </>
              }
            />
          )}
        />
      </View>

      <View className="mt-8">
        <Button
          size="lg"
          isLoading={isSubmitting}
          disabled={
            isSubmitting ||
            !isValid ||
            !firstName ||
            !lastName ||
            !phoneNumber ||
            !email ||
            !password
          }
          onPress={handleSubmit(onSubmit)}
        >
          Create account
        </Button>
        <Pressable onPress={() => router.replace("/(auth)/login")}>
          <Text className="text-center">
            Already have an account? <Text className="text-error">Log in</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
