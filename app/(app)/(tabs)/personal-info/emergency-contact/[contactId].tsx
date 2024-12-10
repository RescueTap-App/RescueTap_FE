import { useLocalSearchParams } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { EmergencyContactForm } from "@/components/EmergencyContactForm";
import { emergencyService } from "@/services/emergency-service";
import { useAuth } from "@/components/AuthContext";
import { number } from "zod";

export default function EditEmergencyContactScreen() {
  const { contactId } = useLocalSearchParams<{ contactId: string }>();
  const { user } = useAuth();
  const { data, error, isLoading } = emergencyService.getEmergencyContact({
    userid: user?._id!,
    contactId: "1",
  });

  console.log("data", data);

  return (
    <KeyboardAvoidingView
      className="h-full"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {isLoading && <ActivityIndicator />}
      <EmergencyContactForm
        mode="edit"
        data={{
          address: data?.emergencyContact.address ?? "",
          name: data?.emergencyContact?.name ?? "",
          notify: data?.emergencyContact.notify ?? false,
          number: data?.emergencyContact.number ?? "",
          relationship: data?.emergencyContact.relationship ?? "",
        }}
      />
    </KeyboardAvoidingView>
  );
}
