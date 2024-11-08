import {View, Text, Image} from 'react-native'
import { StyleSheet } from 'react-native'
import Form from '@/Screens/Form'
export default function Splash(){
    return (
        <>
            <View>
                <Image source={require('@/assets/images/RescueTapLogo.jpg')}/>
                <Text style={Styles.italics}>Rescue Within Reach</Text>
                <Form></Form>
            </View>
        </>
    )
}

const Styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems : 'center',
    },
    italics :{
      fontStyle: 'italic'
    }
  })