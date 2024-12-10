"use client";

import { KeyboardAvoidingView, Platform } from "react-native";
import { EmergencyContactForm } from "@/components/EmergencyContactForm";

export default function EmergencyContactScreen() {
  return (
    <KeyboardAvoidingView
      className="h-full"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <EmergencyContactForm />
    </KeyboardAvoidingView>
  );
}
