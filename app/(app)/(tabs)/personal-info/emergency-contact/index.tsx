import { useRouter } from "expo-router";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, CreditCard } from "lucide-react-native";
import { useAuth } from "@/components/AuthContext";
import { emergencyService } from "@/services/emergency-service";
import { Button } from "@/components/ui/Button";
import { ContactCard, AddContactCard } from "@/components/ContactCard";

export default function EmergencyContactScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { data, error, isLoading, isValidating } =
    emergencyService.getEmergencyContacts(user?._id!);

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <View className="mb-6">
        <Pressable
          className="flex-row items-center"
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/(app)/(tabs)")
          }
        >
          <ArrowLeft size={24} color="#000" />
          <Text className="text-xl font-semibold ml-4">Emergency Contact</Text>
        </Pressable>
      </View>

      <ScrollView>
        {(isLoading || isValidating) && <ActivityIndicator />}

        <View className="flex-1 pb-6 gap-3">
          {data?.emergencyContacts?.map((data, index) => (
            <ContactCard
              key={data._id}
              href={{
                // @ts-ignore
                pathname: `/personal-info/emergency-contact/${data._id}`,
                params: {
                  name: data.name,
                  number: data.number,
                  address: data.address,
                  relationship: data.relationship,
                  notify: data.notify as any,
                  index: index,
                },
              }}
              who={data.relationship}
            />
          ))}
          <AddContactCard />
        </View>
      </ScrollView>
      <View className="mb-8">
        <Button
          size={"lg"}
          onPress={() =>
            router.push(
              "/(app)/(tabs)/personal-info/emergency-contact/add-contact"
            )
          }
          iconLeft={<CreditCard color="white" size={28} />}
        >
          Add Another Contact
        </Button>
      </View>
    </SafeAreaView>
  );
}
