import { Text, View } from "react-native";
// import Splash from "@/app/splash";
// import OnBoard from "@/Pages/Onboarding";
// import Login from "@/app/Login";
import AppNavigator from '@/app/Navigator/AppNavigator'
import { StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style={Styles.container}
    >
      <AppNavigator />
      {/* <Splash></Splash> */}
      {/* <OnBoard></OnBoard> */}
      {/* <Login></Login> */}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    flex:1,
    justifyContent: "flex-start",
    width: 'auto',
    height: 'auto',
  }
})
//   flex: 1,
// justifyContent: "center",
// alignItems: "center",
// backgroundColor: 'white'