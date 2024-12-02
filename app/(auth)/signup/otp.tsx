import React, { useRef, useState } from "react";
import { View, TextInput, Pressable } from "react-native";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { AntDesign } from "@expo/vector-icons";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const otpSchema = z.object({
  otp: z.string().length(4, "Please enter a valid OTP code"),
});

type OtpFormData = z.infer<typeof otpSchema>;

export default function SignUpOtpVerificationScreen() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<TextInput[]>([]);
  const { handleSubmit, setError, clearErrors } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Clear any previous errors
    clearErrors("otp");
  };

  const handleKeyPress = (e: any, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = () => {
    const otpString = otp.join("");
    if (otpString.length !== 4) {
      setError("otp", { message: "Please enter a valid OTP code" });
      return;
    }
    console.log("OTP:", otpString);
    // Handle OTP verification
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <Pressable onPress={() => console.log("Go back")} className="mb-8">
        <ChevronLeft size={24} color="#000" />
      </Pressable>

      <View className="mb-8">
        <Text className="text-4xl font-bold mb-2">Enter OTP</Text>
        <Text className="text-neutral-600">
          Enter the 4-digit code sent to{"\n"}
        </Text>
        <Text className="text-black font-semibold">+234 803 543 ****</Text>
      </View>

      <View className="flex-row justify-between mb-8 flex-1">
        {[0, 1, 2, 3].map((index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref!)}
            className="w-[72px] h-[72px] border-2 border-neutral-200 rounded-lg text-center text-2xl"
            maxLength={1}
            keyboardType="number-pad"
            value={otp[index]}
            onChangeText={(text) => handleOtpChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>

      <View>
        <Button size="lg" onPress={handleSubmit(onSubmit)} className="mb-4">
          Verify OTP
        </Button>

        <Pressable onPress={() => console.log("Resend code")}>
          <Text className="text-center">
            Didn't receive a code? <Text className="text-error">Resend</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
