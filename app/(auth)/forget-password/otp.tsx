import React, { useState, useRef, useEffect } from "react";
import { View, Pressable, TextInput } from "react-native";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

export default function OTPVerificationScreen() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<TextInput[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      value = value[value.length - 1];
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value !== "" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleVerify = () => {
    // Verify OTP logic here
    router.push("/(auth)/forget-password/set-new-password");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-6 flex-1">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center"
        >
          <ChevronLeft size={24} color="#000" />
        </Pressable>

        <View className="mb-8 mt-4">
          <Text className="text-3xl font-bold mb-2">Enter OTP</Text>
          <Text className="text-neutral-600">
            {/* Please enter the OTP sent to your phone */}
            Enter the 4 digit code sent to{" "}
          </Text>
          <Text className="font-bold text-black">090354****</Text>
        </View>

        <View className="flex-row justify-between mb-8">
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref as TextInput)}
              className={`w-[72px] h-[72px] border-2 ${
                !isOtpComplete ? "border-error" : "border-neutral-200"
              } rounded-lg text-center text-2xl`}
              maxLength={1}
              keyboardType="number-pad"
              value={otp[index]}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>

        <View className="mt-auto mb-6 flex gap-4">
          <Button size="lg" disabled={!isOtpComplete} onPress={handleVerify}>
            Verify OTP
          </Button>
          <Pressable>
            <Text className="text-[14px] text-center">
              Don't receive a code?{" "}
              <Text className="text-accent-700 font-medium">Resend</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
