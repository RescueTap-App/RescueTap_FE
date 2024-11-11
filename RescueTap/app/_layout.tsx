import { Stack } from "expo-router";
import Login from "@/Pages/Login";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title:'index'}}/>
      <Stack.Screen name="Login" options={{title: 'Login'}}/>
      <Stack.Screen name="Signup" options={{title: 'Signup'}}/>

    </Stack>
  );
}
