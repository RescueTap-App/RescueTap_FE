import React from "react";
import { View, Image, ActivityIndicator, Modal, Pressable } from "react-native";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft, AlertTriangle, Shield } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { driverService } from "@/services/driver-service";
import { Avatar } from "@/components/ui/Avatar";

interface DriverDetailsProps {
  driver: {
    name: string;
    image: string;
    vehicleImage: string;
    licensePlate: string;
    cluster: string;
  };
}

export default function DriverDetailsScreen({
  driver = {
    name: "Mustapha Ibrahim",
    image: "/placeholder.svg?height=100&width=100",
    vehicleImage: "/placeholder.svg?height=150&width=200",
    licensePlate: "ABC-123DE",
    cluster: "Lugbe Cluster 5",
  },
}: DriverDetailsProps) {
  const {
    data,
    isLoading: loadingDriver,
    error,
  } = driverService.getDriver("asdf");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showRejectionModal, setShowRejectionModal] = React.useState(false);
  const [selectedReason, setSelectedReason] = React.useState<string | null>(
    null
  );

  const handleConfirm = async () => {
    setIsLoading(true);
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/");
    }, 2000);
  };

  const handleReject = async () => {
    if (!selectedReason) {
      setShowRejectionModal(true);
      return;
    }
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    // Handle rejection with reason
    router.back();
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white p-4">
        <View className="p-6">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center"
          >
            <ChevronLeft size={24} color="#000" />
          </Pressable>
        </View>
        <View className="flex-1 items-center justify-center p-6">
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text className="text-center mt-4 text-neutral-600">
            Please hold on a second...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white p-4 gap-8">
      {/* <Text className="text-xl font-semibold mb-6">Driver's Details</Text> */}

      <View className="items-center justify-center mb-8">
        <Avatar source={""} fallback="driver" shape={"circle"} size={"3xl"} />
        <Text className="text-lg font-semibold capitalize text-[20px]">
          {driver.name}
        </Text>
        <Text className="text-accent-600 text-lg">Driver</Text>
        <Text className="text-neutral-500 text-lg">{driver.cluster}</Text>
      </View>

      <View className="items-center mb-8 flex-1 justify-center">
        <Image
          source={{ uri: driver.vehicleImage }}
          className="w-48 h-32 rounded-lg mb-4"
        />
        <View className="bg-neutral-100 px-4 py-2 rounded-lg">
          <Text className="text-2xl font-semibold text-primary-600">
            {driver.licensePlate}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center mb-8 bg-blue-50 p-4 rounded-lg">
        <Shield className="text-blue-500 mr-2" />
        <Text className="text-blue-800 flex-1">
          For your safety, ensure the driver's photo, vehicle model, and plate
          number match the information displayed in the app.
        </Text>
      </View>

      <View className="mt-auto mb-12 gap-6">
        <Button size="lg" onPress={handleConfirm}>
          Confirm and Board
        </Button>
        <Button
          size="lg"
          variant="outline"
          onPress={() => setShowRejectionModal(true)}
          className="border-error"
        >
          <Text className="text-error">Reject Ride</Text>
        </Button>
      </View>

      <Modal
        visible={showRejectionModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowRejectionModal(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6">
            <Text className="text-xl font-semibold mb-6">
              Reasons to reject the ride
            </Text>

            {[
              "Unverified Driver",
              "Mismatched Plate Number",
              "Suspicious Activity",
            ].map((reason) => (
              <Pressable
                key={reason}
                onPress={() => setSelectedReason(reason)}
                className={`flex-row items-center p-4 rounded-lg mb-3 ${
                  selectedReason === reason ? "bg-error/10" : "bg-neutral-50"
                }`}
              >
                <View
                  className={`w-6 h-6 rounded-full mr-3 border-2 items-center justify-center
                      ${
                        selectedReason === reason
                          ? "border-error"
                          : "border-neutral-300"
                      }`}
                >
                  {selectedReason === reason && (
                    <View className="w-3 h-3 rounded-full bg-error" />
                  )}
                </View>
                <Text
                  className={
                    selectedReason === reason
                      ? "text-error"
                      : "text-neutral-700"
                  }
                >
                  {reason}
                </Text>
              </Pressable>
            ))}

            <View className="flex-row space-x-4 mt-4">
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onPress={() => setShowRejectionModal(false)}
              >
                Cancel
              </Button>
              <Button
                size="lg"
                className="flex-1 bg-error hover:bg-error/90"
                disabled={!selectedReason}
                onPress={handleReject}
              >
                Submit
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
