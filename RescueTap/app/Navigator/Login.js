import { StyleSheet, Text, View } from "react-native";
import COLORS from '../../Reuseables/color';
import { useNavigation } from "@react-navigation/native";


const Login = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.navigate('Onboard')}>Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    color: COLORS.primary,
    backgroundColor: COLORS.white,
  },
});

export default Login;