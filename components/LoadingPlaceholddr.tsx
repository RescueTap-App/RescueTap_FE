import { SafeAreaView } from "react-native-safe-area-context";
import { View, Pressable, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

interface Props {
  onPress: () => void;
}
export function LoadingPlaceholder(props: Props) {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-6">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center"
        >
          <ChevronLeft size={24} color="#000" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
