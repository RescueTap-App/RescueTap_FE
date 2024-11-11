import { View, Text, Button, TouchableOpacity, StyleSheet, Pressable} from "react-native"
import {Formik} from 'formik'
import { TextInput } from "react-native-gesture-handler"
import { Link } from "expo-router"


export default function Login(){
    function sub(){

    }
    return (<>
        <View style={Styles.container}>
            <View style={{marginBottom: 30, }}>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>Login</Text>
                <Text style={{color: 'grey'}}>Input your details below</Text>
            </View>
            <View>
                <Formik 
                initialValues={{username:'', password: ''}}
                onSubmit={sub}
                >
                    <View>
                        <Text>Email</Text>
                        <TextInput style={Styles.inputStyle}/>

                        <Text>Password</Text>
                        <TextInput style={{padding:10, borderWidth: 1, borderColor: 'grey', borderRadius: 8}}/>
                        
                        <View style={{flex:1, flexDirection:'row',justifyContent: 'space-between', alignItems: 'flex-end'}}>
                            <View><TextInput /><Text>Remember me?</Text></View>
                            <Text style={{color: 'red'}}>Forget Password ?</Text>
                        </View>
                        
                        {/* <Text></Text> */}
                        <View style={{position: 'relative'}}>
                            {/* <Button title="submit" color="#EF4136" disabled /> */}
                            <Link href="/Signup"style={{padding: 10, color: 'white', backgroundColor: "#EF4136"}}>
                                <Pressable>
                                    <Text>Submit</Text>
                                </Pressable>
                            </Link>
                        </View>
                    </View>
                </Formik>
            </View>
        </View>
    </>)
}

const Styles = StyleSheet.create({
    container: {
        padding: 0,
        marginTop: 20,
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        height: `100%`,
    },
    inputStyle:{
        padding:10, 
        borderWidth: 1, 
        borderColor: 'grey', 
        borderRadius: 8,
        marginBottom: 12,
    }
})