import { Text, View } from "react-native";
import Splash from "@/Pages/splash";
import Login from "@/Pages/Login";
import { StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style={Styles.container}
    >
      {/* <Splash></Splash> */}
      <Login></Login>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: 'auto',
    height: 'auto',
  }
})
//   flex: 1,
// justifyContent: "center",
// alignItems: "center",
// backgroundColor: 'white'