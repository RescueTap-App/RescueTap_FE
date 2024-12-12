import { Pressable, Text, View } from "react-native";
import { Link, type Href } from "expo-router";
import { Edit } from "lucide-react-native";
import { colors } from "@/constants/colors";

export function ContactCard(props: { href: Href; who: string }) {
  return (
    <View className="flex-row items-center justify-between rounded-[10px] bg-white px-5 py-3 border-gray-100 border shadow-gray-500 shadow-lg">
      <Text className="text-black capitalize text-xl">{props.who}</Text>
      <Link href={props.href} asChild>
        <Pressable className="flex-row gap-2">
          <Edit size={20} color={colors.accent[500]} />
          <Text className="text-accent-500">Edit</Text>
        </Pressable>
      </Link>
    </View>
  );
}

export function AddContactCard() {
  return (
    <Link
      href={"/(app)/(tabs)/personal-info/emergency-contact/add-contact"}
      asChild
    >
      <Pressable className="flex-row items-center justify-between gap-2 rounded-[10px] bg-white px-5 py-3 border-gray-100 border shadow-gray-500 shadow-lg">
        <Text className="text-neutral-400 capitalize text-xl">Input new</Text>
        <View className="flex-row gap-2">
          <Edit size={20} color={colors.neutral[400]} />
          <Text className="text-neutral-400">Edit</Text>
        </View>
      </Pressable>
    </Link>
  );
}
