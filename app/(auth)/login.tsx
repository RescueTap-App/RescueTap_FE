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
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "expo-router";
import { authService } from "@/services/auth-service";

const loginSchema = z.object({
  phoneNumber: z
    .string()
    .min(11, "Phone number must be 11 digits")
    .max(11, "Phone number must be 11 digits")
    .regex(/^[0-9]+$/, "Phone number must only contain numbers"),
  password: z.string().min(4, "Password must be at least 8 characters"),
  // password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginIndexScreen() {
  const { login, logout } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
      rememberMe: false,
    },
    mode: "onChange",
  });

  let disableSubit =
    !isValid ||
    Boolean(watch("password") === "" || watch("phoneNumber") === "");

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      await login(data.phoneNumber, data.password);
    } catch (error) {
      console.error("Login error:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <View className="mb-8 mt-8">
        <Text className="text-4xl font-black mb-4">Log In</Text>
        <Text className="text-neutral-600">
          Input your login details below.
        </Text>
      </View>

      <View className="flex gap-4">
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

          <Pressable onPress={() => router.replace("/(auth)/forget-password")}>
            <Text className="text-error">Forgot Password?</Text>
          </Pressable>
        </View>
      </View>

      <View className="mt-auto flex gap-4">
        <Button
          size="lg"
          variant={"outline"}
          onPress={async () => {
            try {
              await logout();
            } catch (error) {
              console.log("an error occurred");
            }
          }}
        >
          Test reset
        </Button>
        <Button
          size="lg"
          isLoading={isSubmitting}
          disabled={disableSubit}
          onPress={handleSubmit(onSubmit)}
        >
          Continue
        </Button>
        <Pressable onPress={() => router.replace("/(auth)/signup")}>
          <Text className="text-center">
            Don't have an account?{" "}
            <Text className="text-accent-600">Sign up</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
