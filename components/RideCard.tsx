import { Image, Text, Pressable, View } from "react-native";
import { useRouter, Link } from "expo-router";
import { cn } from "@/lib/cn";

type ActiveRideProps = {
  status: "Active" | "not active";
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
    <Link asChild href={`/(app)/driver-details`}>
      <Pressable
        onPress={() => {
          // router.push({
          //   pathname: "/driver-details",
          //   // params: {
          //   //   name: props.driverName,
          //   //   image: props.driverImage,
          //   //   vehicleImage: props.vehicleImage,
          //   //   licensePlate: props.licensePlate,
          //   //   cluster: props.cluster,
          //   // },
          // });
        }}
        className="flex flex-row bg-white border border-gray-100 shadow shadow-gray-500 p-3 rounded-xl "
      >
        <Image
          resizeMode="contain"
          className="bg-gray-100 aspect-square"
          source={{ uri: props.vehicleImage }}
          height={90}
          alt={props.vehicleName}
        />
        <View className="flex-row items-stretch justify-between flex-1">
          <View className="flex-row items-center">
            <Image
              source={{ uri: "/placeholder.svg?height=40&width=40" }}
              className="w-10 h-10 rounded-lg"
            />
            <View className="flex gap-1">
              <Text className="font-semibold text-primary-600 text-lg capitalize">
                {props.vehicleName}
              </Text>
              <Text className="text-[#005DC2] font-medium text-lg uppercase">
                {props.licensePlate ?? "No license plate"}
              </Text>
              <Text className="text-black font-normal capitalize">
                Lagos License 4 ??
              </Text>
            </View>
          </View>
          <View className="px-2 py-1 rounded items-center gap-1">
            <View
              className={cn(
                "rounded-full h-7 w-7",
                props.status === "Active" ? "bg-success" : "bg-error"
              )}
            />
            <Text>{props.status === "Active" ? "Safe" : "Not Safe"}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
