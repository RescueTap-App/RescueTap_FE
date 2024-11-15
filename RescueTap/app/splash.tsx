import {View, Text, Image, Pressable, Button} from 'react-native'
import { StyleSheet } from 'react-native'


export default function Splash(){
    return (
        <>
            {/* <View>
                <Image source={require('@/assets/images/RescueTapLogo.jpg')}/>
                <Text style={Styles.italics}>Rescue Within Reach</Text>
            </View> */}
            
            
            <View >
                {/* Skip, Image and Description */}
                <View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end', paddingTop: 5, paddingRight: 10 }}>
                        <Pressable><Text style={{fontWeight: 'bold'}}>Skip</Text></Pressable>
                    </View>
                    <View style={{flex:12, alignItems: 'center'}}>
                        <Image source={require('@/assets/images/Onboard1.png')}/>
                    </View>
                    <View style={{marginTop: 10, display: 'flex', alignItems: 'center', padding: 10}}>
                        <Text style={{fontWeight: 500}}>Instant Help at Your Fingertips</Text>
                        <Text style={{textAlign: 'center'}}>
                            Send emergency messages with a single tap to your two trusted contacts. Help is just one button away!
                        </Text>
                    </View>
                </View>
                <View>
                    {/* Navigations and Buttton */}
                    <View></View>
                    <View style={{padding: 10}}>
                        <Button title="Next" color="#EF4136" />
                    </View>
                    <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', marginTop: 5, paddingBottom: 10}}><Text>Already have an account? </Text><Pressable><Text style={{fontWeight: 500}}>Sign in</Text></Pressable></View>
                </View>
               
            </View>


        </>
    )
}

const Styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems : 'center',
        backgroundColor: 'white'
    },
    italics :{
      fontStyle: 'italic'
    },
    OnboardContainer:{
        width: `100%`,
        height: `100%`,
        padding: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

  })