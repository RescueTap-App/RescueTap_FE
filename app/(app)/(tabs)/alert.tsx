import { View, Text, Alert, StyleSheet, Pressable } from "react-native";
import {
  Camera,
  type CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import React from "react";
import { useRouter } from "expo-router";
import { Button } from "@/components/ui/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";

export default function AlertScreen() {
  const router = useRouter();
  const cameraRef = React.useRef<CameraType | null>(null);
  const [scanned, setScanned] = React.useState(false);
  const [hasPermission, setHasPermission] = React.useState<boolean | null>(
    null
  );

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    Alert.alert("QR Code Scanned", `Type: ${type}\nData: ${data}`, [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

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
      <View className="p-4">
        <Pressable
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/(app)/(tabs)")
          }
        >
          <ArrowLeft size={24} color="white" />
        </Pressable>
      </View>

      <View className="flex-1">
        <CameraView
          ratio="16:9"
          style={StyleSheet.absoluteFillObject}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={(result) => {
            // TODO: handle barcode result
            console.log(result);
          }}
          facing="back"
        >
          <View className="flex-1 justify-center items-center">
            <View className="w-64 h-64 border-2 border-white rounded-lg">
              <View className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-white" />
              <View className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-white" />
              <View className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-white" />
              <View className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-white" />
            </View>
          </View>
        </CameraView>
      </View>

      <View className="p-4 pb-12">
        <Text className="text-white text-center text-xl font-semibold mb-2">
          Scan the QR Code
        </Text>
        {/* <Button
          variant="default"
          size="lg"
          onPress={() => console.log("Manual scan")}
          className="bg-error"
        >
          Scan QR code
        </Button> */}
      </View>
    </SafeAreaView>
  );
}
