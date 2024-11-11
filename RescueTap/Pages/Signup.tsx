import { View, Text, Image } from "react-native-reanimated/lib/typescript/Animated";
import {Formik} from "formik";

export default function Signup(){
   function submit(){}
   
   return (<>
        <View>
                <Formik
                initialValues={{username:'', password: ''}}
                onSubmit={submit}>
                    <Image source={require('@/assets/images/RescueTapLogo.jpg')}/>
                    <View>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>Create Account</Text>
                        <Text style={{color: 'grey'}}>Welcome! Please enter your details correctly.</Text>
                    </View>
                    <View>

                    </View>
                </Formik>
                <View></View>
            
        </View>
    </>)
}