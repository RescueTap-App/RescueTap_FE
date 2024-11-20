import React from "react";
import { View, Pressable } from "react-native";
import { Text } from "@/components/ui/Text";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SafeAreaView } from "react-native-safe-area-context";

const loginSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must not exceed 15 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginIndexScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    // Handle login logic
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <View className="mb-8">
        <Text className="text-2xl font-bold mb-2">Log In</Text>
        <Text className="text-neutral-600">
          Input your login details below.
        </Text>
      </View>

      <View className="space-y-4">
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

        <View className="flex-row justify-between items-center">
          <Controller
            control={control}
            name="rememberMe"
            render={({ field: { onChange, value } }) => (
              <Checkbox
                checked={value ?? false}
                onPress={() => onChange(!value)}
                label="Remember me"
              />
            )}
          />

          <Pressable onPress={() => console.log("Forgot password")}>
            <Text className="text-error">Forgot Password?</Text>
          </Pressable>
        </View>
      </View>

      <View className="mt-auto">
        <Button onPress={handleSubmit(onSubmit)}>Continue</Button>
      </View>
    </SafeAreaView>
  );
}
