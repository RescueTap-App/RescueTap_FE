import { Button } from "@/components/ui/Button";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  return (
    <SafeAreaView className="bg-white flex h-full">
      <Text className="text-3xl text-red-600">page</Text>
      <Button variant={"default"}>Some things here</Button>
    </SafeAreaView>
  );
}
