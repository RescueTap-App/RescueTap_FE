import { View, Text, Image,TextInput, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
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
                    <View>
                        <Text>Email</Text>
                        <TextInput style={Styles.inputStyle}/>

                        <Text>Password</Text>
                        <TextInput style={{padding:10, borderWidth: 1, borderColor: 'grey', borderRadius: 8}}/>
                        
                        <View style={{flex:1, flexDirection:'row',justifyContent: 'space-between', alignItems: 'flex-end'}}>
                            <View><TextInput /><Text>Remember me?</Text></View>
                            <Link href='/forgetPassword'><Pressable ><Text style={{color: 'red'}}>Forget Password ?</Text></Pressable></Link>
                            
                        </View>
                        <View></View>
                        {/* <Text></Text> */}
                        <View style={{position: 'relative'}}>
                            {/* <Button title="submit" color="#EF4136" disabled /> */}
                            <Link href="/Signup"style={{padding: 10, position: 'absolute', top: 10, width: `100%`, paddingStart: 25}}>
                                <Pressable style={{width: `90%`, backgroundColor: "#EF4136", padding: 10,borderRadius: 10  }}>
                                    <Text style={{color: 'white', textAlign: 'center'}}>Submit</Text>
                                </Pressable>
                            </Link>
                        </View>
                    </View>
                    </View>
                </Formik>
                <View></View>
            
        </View>
    </>)
}

const Styles = StyleSheet.create({
    inputStyle:{
        padding:10, 
        borderWidth: 1, 
        borderColor: 'grey', 
        borderRadius: 8,
        marginBottom: 12,
    }
})