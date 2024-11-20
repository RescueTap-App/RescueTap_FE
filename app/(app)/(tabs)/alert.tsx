import React from "react";
import { View, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AlertScreen() {
  const [hasPermission, setHasPermission] = React.useState<boolean | null>(
    null
  );

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-center mb-4">
          We need camera permission to scan QR codes
        </Text>
        <Button onPress={() => Camera.requestCameraPermissionsAsync()}>
          Grant Permission
        </Button>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1">
        <View className="p-4">
          <ArrowLeft size={24} color="white" />
        </View>

        <View className="flex-1">
          <Camera
            ratio="16:9"
            style={StyleSheet.absoluteFillObject}
            barCodeScannerSettings={{
              barCodeTypes: ["qr"],
            }}
            onBarCodeScanned={(result) => {
              console.log(result);
              // Handle QR code data
            }}
          >
            <View className="flex-1 justify-center items-center">
              {/* QR Frame Overlay */}
              <View className="w-64 h-64 border-2 border-white rounded-lg">
                <View className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-white" />
                <View className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-white" />
                <View className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-white" />
                <View className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-white" />
              </View>
            </View>
          </Camera>
        </View>

        <View className="p-4">
          <Text className="text-white text-center text-xl font-semibold mb-2">
            Scan your QR Code
          </Text>
          <Button
            variant="default"
            onPress={() => console.log("Manual scan")}
            className="bg-error"
          >
            Scan QR code
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
