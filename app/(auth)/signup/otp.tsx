import React, { useRef, useState, useEffect } from "react";
import { View, TextInput, Pressable } from "react-native";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/components/AuthContext";
import { useRouter } from "expo-router";
import { authService } from "@/services/auth-service";

const otpSchema = z.object({
  otp: z.string().length(4, "Please enter a valid OTP code"),
});

type OtpFormData = z.infer<typeof otpSchema>;

export default function SignUpOtpVerificationScreen() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<TextInput[]>([]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });
  const { verifyOtp, user } = useAuth();
  const router = useRouter();

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = async (data: OtpFormData) => {
    console.log(data);
    try {
      await verifyOtp({ id: user?._id!, token: "919191" });
      router.replace("/(app)/(tabs)");
    } catch (error) {
      console.error("OTP verification error:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  useEffect(() => {
    // Update the form value when OTP changes
    const otpString = otp.join("");
    setValue("otp", otpString);
  }, [otp, control]);

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <Pressable
        onPress={() => router.replace("/(auth)/login")}
        className="mb-8"
      >
        <ChevronLeft size={24} color="#000" />
      </Pressable>

      <View className="mb-8">
        <Text className="text-4xl font-bold mb-2">Enter OTP</Text>
        <Text className="text-neutral-600">
          Enter the 4-digit code sent to{"\n"}
        </Text>
        <Text className="text-black font-semibold">+234 803 543 ****</Text>
      </View>

      <Controller
        control={control}
        name="otp"
        render={({ field: { onChange, value } }) => (
          <View className="flex-row justify-between mb-8">
            {[0, 1, 2, 3].map((index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref!)}
                className={`w-[72px] h-[72px] border-2 ${
                  errors.otp ? "border-error" : "border-neutral-200"
                } rounded-lg text-center text-2xl`}
                maxLength={1}
                keyboardType="number-pad"
                value={otp[index]}
                onChangeText={(text) => {
                  handleOtpChange(text, index);
                  onChange(otp.join(""));
                }}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>
        )}
      />

      {errors.otp && (
        <Text className="text-error mb-4">{errors.otp.message}</Text>
      )}

      <View>
        <Button
          size="lg"
          isLoading={isSubmitting}
          disabled={isSubmitting || otp.join("").length !== 4}
          onPress={handleSubmit(onSubmit)}
          className="mb-4"
        >
          Verify OTP
        </Button>

        <Pressable
          disabled={!user?._id}
          onPress={async () => {
            try {
              const data = await authService.requestNewOtp(user?._id!);
              console.debug(data);
              // Handle successful OTP resend (e.g., show success message)
            } catch (error) {
              console.error("Error requesting new OTP:", error);
              // Handle error (e.g., show error message to user)
            }
          }}
        >
          <Text className="text-center">
            Didn't receive a code? <Text className="text-error">Resend</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
