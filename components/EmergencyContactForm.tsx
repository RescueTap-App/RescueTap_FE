import { useRouter } from "expo-router";
import { useAuth } from "./AuthContext";
import { mutate } from "swr";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  View,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Text } from "./ui/Text";
import { emergencyService } from "@/services/emergency-service";
import { Checkbox } from "./ui/Checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputField } from "./ui/InputField";
import { ArrowLeft } from "lucide-react-native";
import { Button } from "./ui/Button";

const emergencyContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  number: z.string().min(10, "Phone number must be at least 10 digits"),
  relationship: z.string().min(2, "Relationship must be at least 2 characters"),
  address: z.string().min(5, "A address must be at least 5 characters"),
  notify: z.boolean().default(true),
});

type EmergencyContactData = z.infer<typeof emergencyContactSchema>;

type Props = {
  mode?: "create" | "edit";
  index?: number;
  data?: Required<EmergencyContactData>;
};
export function EmergencyContactForm({ mode = "create", data, index }: Props) {
  const router = useRouter();
  const { user } = useAuth();

  const { control, handleSubmit, formState, reset } =
    useForm<EmergencyContactData>({
      resolver: zodResolver(emergencyContactSchema),
      defaultValues: {
        name: data?.name ?? "",
        number: data?.number ?? "",
        relationship: data?.relationship ?? "",
        address: data?.address ?? "",
        notify: data?.notify ?? true,
      },
    });

  const onSubmit = async (payload: EmergencyContactData) => {
    try {
      if (mode === "edit") {
        await emergencyService.updateEmergencyContact({
          body: payload,
          index: index!,
          userid: user?._id!,
        });
      } else {
        await emergencyService.addEmergencyContact(user?._id!, payload);
      }
      reset();
      router.replace("/(app)/(tabs)/personal-info/emergency-contact");
      mutate(`/users/${user?._id!}/emergency-contacts`);
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "Failed to add emergency contact. Please try again."
      );
    }
  };

  return (
    <SafeAreaView className="h-screen p-4 bg-white">
      <View className="flex-row items-center mb-12">
        <Pressable onPress={() => router.back()}>
          <ArrowLeft size={24} color="#000" />
        </Pressable>
        <Text className="text-lg font-semibold ml-4">Emergency Contacts</Text>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1 gap-8 mb-6">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Name"
                placeholder="Enter name"
                value={value}
                onChangeText={onChange}
                error={formState.errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="number"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Number"
                value={value}
                placeholder="Enter number"
                onChangeText={onChange}
                keyboardType="phone-pad"
                error={formState.errors.number?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, value } }) => (
              <InputField
                label="Address"
                placeholder="Enter address"
                value={value}
                onChangeText={onChange}
                error={formState.errors.address?.message}
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
                placeholder="What is your relationship with this contact"
                onChangeText={onChange}
                error={formState.errors.relationship?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="notify"
            render={({ field: { onChange, value } }) => (
              <Checkbox
                rounded
                checked={value ?? false}
                onPress={() => onChange(!value)}
                label="Should we notify this contact if you are in any Accident/Emergency?"
              />
            )}
          />
        </View>
      </TouchableWithoutFeedback>

      <View className="mb-12">
        <Button
          isLoading={formState.isSubmitting}
          disabled={formState.isSubmitting || !formState.isValid}
          size="lg"
          onPress={handleSubmit(onSubmit)}
        >
          {mode == "edit" ? "Edit" : "Save"}
        </Button>
      </View>
    </SafeAreaView>
  );
}
