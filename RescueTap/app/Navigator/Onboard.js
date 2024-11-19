import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import COLORS from '../../Reuseables/color';

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? COLORS.primaryColor : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                borderRadius: 12,
                backgroundColor: 'white',
                // marginBottom: 10,
                marginBottom: 10,
            }}
        />
    );
}

const Skip = ({...props}) => (
    
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <View style={{padding: 10, backgroundColor: 'red', paddingLeft: 20,paddingRight: 20}}><Text style={{fontSize:16, color: 'white'}}>Skip</Text></View>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);

const Prev = ({...props}) =>{
    <TouchableOpacity style={{marginHorizontal: 10}}>
        <View>
            <Text style={{fontSize: 16}}>Prev</Text>
        </View>
    </TouchableOpacity>
}

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        // SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        PrevButtonComponent = {Prev}
        DotComponent={Dots}
        bottomBarColor='#fff'

        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.navigate("Login")}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image source={require('@/assets/images/Onboard1.png')} />,
            title: 'Connect to the World',
            subtitle: 'A New Way To Connect With The World',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('@/assets/images/Onboard1.png')} />,
            title: 'Share Your Favorites',
            subtitle: 'Share Your Thoughts With Similar Kind of People',
          },
          {
            backgroundColor: '#fff',
            image: <Image source={require('@/assets/images/Onboard1.png')} />,
            title: 'Become The Star',
            subtitle: "Let The Spot Light Capture You",
          },
        ]}
      />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    height: 200,
    width: `100%`,
  },
});