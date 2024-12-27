import React from "react";
import { View, Dimensions, Text, Image } from "react-native";
import { Button } from "@/components/ui/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { MapPin, Navigation } from "lucide-react-native";
// import { Card } from "@/components/ui/Card";

const { width, height } = Dimensions.get("window");

// Example coordinates - replace with actual coordinates from your API
const INITIAL_REGION = {
  latitude: 9.0765,
  longitude: 7.3986,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const ROUTE_COORDINATES = [
  { latitude: 9.0765, longitude: 7.3986 }, // Origin
  { latitude: 9.0815, longitude: 7.4106 }, // Destination
];

export default function TrackingScreen() {
  return (
    <View className="flex-1 bg-white">
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          width,
          height: height * 0.8, // Take up most of the screen
        }}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
      >
        {/* Origin Marker */}
        <Marker coordinate={ROUTE_COORDINATES[0]}>
          <View className="bg-primary rounded-full p-2">
            <MapPin size={24} color="white" />
          </View>
        </Marker>

        {/* Destination Marker */}
        <Marker coordinate={ROUTE_COORDINATES[1]}>
          <View className="bg-error rounded-full p-2">
            <MapPin size={24} color="white" />
          </View>
        </Marker>

        {/* Route Line */}
        <Polyline
          coordinates={ROUTE_COORDINATES}
          strokeColor="#4F46E5"
          strokeWidth={3}
        />
      </MapView>

      {/* Bottom Card */}
      <View className="absolute  bottom-0 left-0 right-0 rounded-t-3xl bg-white p-6 gap-4">
        <View>
          <Text className="text-xl font-semibold mb-4">
            Ambulance arrives in 5 minutes
          </Text>

          <View className="gap-4">
            {/* Origin Location */}
            <View className="flex-row items-center gap-x-3">
              <View className="bg-primary/10 rounded-full p-2">
                <MapPin size={20} className="text-primary" />
              </View>
              <View>
                <Text className="text-sm text-neutral-500">Your location</Text>
                <Text className="font-medium">Shoprite Wuse Zone 5</Text>
              </View>
            </View>

            <View className="h-1 w-full bg-gray-300" />

            {/* Destination Location */}
            <View className="flex-row items-center gap-x-3">
              <View className="bg-error/10 rounded-full p-2">
                <MapPin size={20} className="text-error" />
              </View>
              <View>
                <Text className="text-sm text-neutral-500">Arrival</Text>
                <Text className="font-medium">Wuse general hospital</Text>
              </View>
            </View>
          </View>
        </View>

        <Button
          size="lg"
          className="w-full"
          onPress={() => {
            // Handle get directions
          }}
        >
          <Navigation className="mr-2" size={20} color="white" />
          <Text className="text-white font-medium">Get Direction</Text>
        </Button>
      </View>
    </View>
  );
}
