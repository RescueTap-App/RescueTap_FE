import { Text, View } from "react-native";
import Splash from "@/Pages/splash";
import { StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white'
      }}
    >
      <Splash></Splash>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  }
})
