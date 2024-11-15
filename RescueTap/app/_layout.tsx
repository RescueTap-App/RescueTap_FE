import { Stack } from "expo-router";
import Login from "@/app/Login";

export default function RootLayout() {
  return (
    <Stack initialRouteName="splash">
      <Stack.Screen name="index" options={{title:'index'}}/>
      <Stack.Screen name="Login" options={{title: 'Login'}}/>
      <Stack.Screen name="Signup" options={{title: 'Signup'}}/>
      <Stack.Screen name="forgetPassword" options={{title: 'forgetPassword'}} />
      <Stack.Screen name="splash" options={{title: 'splash'}}/>
    </Stack>
  );
}
