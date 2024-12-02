import { Image, Pressable, View } from "react-native";
import { Text } from "./ui/Text";
import { useRouter } from "expo-router";

type ActiveRideProps = {
  status: "active" | "not active";
  driverName: string;
  driverImage: string;
  vehicleImage: string;
  licensePlate: string;
  cluster: string;
  vehicleName: string;
};
export function ActiveRideCard(props: ActiveRideProps) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/driver-details",
          params: {
            name: props.driverName,
            image: props.driverImage,
            vehicleImage: props.vehicleImage,
            licensePlate: props.licensePlate,
            cluster: props.cluster,
          },
        });
      }}
      className="flex flex-row gap-3 bg-neutral-50 p-4 rounded-xl "
    >
      <Image
        resizeMode="contain"
        className="bg-gray-200"
        source={{ uri: props.vehicleImage }}
        alt={props.vehicleName}
      />
      <View className="flex-row items-center justify-between mb-4 flex-1">
        <View className="flex-row items-center">
          <Image
            source={{ uri: "/placeholder.svg?height=40&width=40" }}
            className="w-10 h-10 rounded-lg"
          />
          <View className="flex gap-1">
            <Text variant={"heading"} className="font-semibold">
              Toyota get 1993 (A4)
            </Text>
            <Text variant={"heading"} className="text-[#005DC2]">
              AAA546CK
            </Text>
            <Text variant={"subhead"} className="text-neutral-600">
              Lagos License 4
            </Text>
          </View>
        </View>
        <View className="bg-success/10 px-2 py-1 rounded">
          <Text className="text-success text-xs">Active</Text>
        </View>
      </View>
    </Pressable>
  );
}
