import {View, Text, Pressable, StyleSheet, Image, Dimensions} from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';
const {width, height} = Dimensions.get('window')

export default function onboardTemp(){
    
    return(<>
        <View style={{flex: 1, justifyContent: 'flex-start', }}>
        <Onboarding
             containerStyles= {{flex:1, justifyContent: 'flex-start', alignItems: 'center'}}   
             titleStyles={{position: 'relative', bottom: 10, paddingTop: 10}}
             pages={[
                {
                skipLabel: 'Skip',
                backgroundColor: '#ffff',
                image: 
                // (<View>Text Image</View>) ,
                <Image source={require('@/assets/images/Onboard1.png')} style={Styles.ImageStyle}/>,
                title: 'Onboarding',
                subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                    backgroundColor: '#a7f3d0',
                    image: <Image source={require('@/assets/images/Onboard2.png')} />,
                    title: 'Onboarding',
                    subtitle: 'Done with React Native Onboarding Swiper',
                    nextLabel: 'Next'
                },
                {
                    backgroundColor: '#ffff',
                    image: <Image source={require('@/assets/images/Onboard3.png')} />,
                    title: 'Onboarding',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
        ]}
/>
        </View>
    </>)
}

const Styles = StyleSheet.create({
    container: {
        // height: `100%`,
        // padding: 10,
        flex: 1,
        // height: `100%`
        justifyContent: 'flex-start'
        // backgroundColor: 'white',
        // color: 'black',
    },
    ImageStyle :{
        width: width*0.9,
        height: width,
    }
})