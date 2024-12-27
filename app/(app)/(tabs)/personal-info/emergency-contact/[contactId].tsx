import { useLocalSearchParams } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";
import { EmergencyContactForm } from "@/components/EmergencyContactForm";

export default function EditEmergencyContactScreen() {
  const data = useLocalSearchParams<{
    name: string;
    address: string;
    contactId: string;
    notify: string;
    number: string;
    relationship: string;
    index: string;
  }>();

  return (
    <KeyboardAvoidingView
      className="h-full"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <EmergencyContactForm
        mode="edit"
        data={{
          address: data!.address! ?? "",
          name: data!.name ?? "",
          notify: Boolean(data.notify) ?? false,
          number: data?.number ?? "",
          relationship: data?.relationship ?? "",
        }}
        index={parseInt(data.index)}
      />
    </KeyboardAvoidingView>
  );
}
