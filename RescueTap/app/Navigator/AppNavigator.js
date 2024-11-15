import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Login from "./Login";
import Login from '../Login' 
import Onboard from "./Onboard";


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    // <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboard">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Onboard" component={Onboard} options={{headerShown: false}}/>
        
      </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default AppNavigator;